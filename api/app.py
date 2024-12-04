from flask import Flask, session, render_template, redirect, url_for, request, flash, jsonify, Response, abort
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from model.dormitory_info import DormDB # 기숙사 정보 모듈
from model.mqtt_client import MqttClient # Mqtt 연결 모듈
from werkzeug.security import generate_password_hash, check_password_hash
import pymysql
from base_api_response import base_api_response
from flask_session import Session
from datetime import timedelta
from functools import wraps
from dotenv import load_dotenv
import os
load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config['SESSION_TYPE'] = os.environ.get('SESSION_TYPE')  # 세션 저장 방식 설정
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)  # 세션 만료 시간 30분으로 설정

Session(app)
db = SQLAlchemy(app)

login_manager = LoginManager(app)
login_manager.login_view = 'login'
def set_dorm_id(cur):
    cur.execute("select dormitory from user where username = '{0}'".format(session['user']))
    session['room'] = cur.fetchall()[0][0]
def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.is_authenticated or not current_user.has_role(role):
                abort(403)
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def connect_mysql():
    return pymysql.connect(host=os.environ.get('DB_HOST'), user=os.environ.get('DB_USER'), password=os.environ.get('DB_PASSWORD'), db=os.environ.get('DB_NAME'))

def on_message(client, userdata, message):
    mtopic = message.topic.split("/")
    if mtopic[2]=="info" and mtopic[3]=="temphumi":
        data = message.payload.decode()
        temp_humi = data.split(", ")
        dorm_db.updateTehu(mtopic[1],temp_humi[0].split(": ")[1] , temp_humi[1].split(": ")[1])
    elif mtopic[2]=="info" and mtopic[3]=="aircon":
        print("")
    elif mtopic[2]=="info" and mtopic[3]=="cam":
        url = message.payload.decode()
        dorm_db.updateCam(mtopic[1],url)
        print("") 
client = MqttClient(on_message)
dorm_db = DormDB()
class User(db.Model, UserMixin):
    id = db.Column(db.String(150), primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(50), default='user')  # 역할 필드, 기본값은 'user'
    dormitory = db.Column(db.Integer)
    def has_role(self, role):
        return self.role == role
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)
@app.route('/login', methods=['POST'])
def login():
    user = request.json
    username = user['username']
    password = user['password']
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        std = connect_mysql()
        cur = std.cursor()
        login_user(user)
        session.permanent = True
        session['user'] = username
        set_dorm_id(cur)
        cur.close()
        std.close()
        return base_api_response(201, "susses")
    else:
        return base_api_response(400, "Username and password differ")
@app.route('/logout')
@login_required
def logout():
    logout_user()
    session.pop('user', None)
    session.pop('room', None)
    return base_api_response(200, 'Successfully loged out')
@app.route('/admin', methods=['POST'])
@login_required
@role_required('admin')
def admin():
    data = request.json
    mysql = connect_mysql()
    cur = mysql.cursor()
    cur.execute(f"insert into {data['table']} values({str(data['items'])[1:-1]})")
    cur.execute(f"select * from {data['table']}")
    cur.close()
    mysql.close()
    return base_api_response(200, cur.fetchall())
@app.route("/signup", methods=['POST'])
def signup():
    user = request.json
    id = user['id'] # 카드키 아이디
    username = user['username']
    password = user['password']
    # if not cur.execute(f"select * from student where id={id}"):
    #     return base_api_response(404, "Dormitory is not detected")
    if User.query.filter_by(id=id).first():
        return base_api_response(401, "This card key id has been signed up already")
    if User.query.filter_by(username=username).first():
        return base_api_response(402, "This username has been signed up already")
    hashed_password = generate_password_hash(password, method=os.environ.get('HASH'))
    std = connect_mysql()
    cur = std.cursor()
    cur.execute(f"select dormitory from student where id = {id}")
    row = cur.fetchall()
    new_user = User(id = id, username = username, password = hashed_password, role='user')
    db.session.add(new_user)
    db.session.get
    db.session.commit()
    cur.close()
    std.close()
    return base_api_response(201, "Successfully signed up")
@app.route('/is_logged_in')
def is_logged_in():
    if 'user' in session:
        return jsonify({"logged_in": True})
    else:
        return jsonify({"logged_in": False})
image_data = None
@app.route("/myroom/info/tehu")
def info():
    if 'user' in session:
        TempHumi = dorm_db.getTempHumi(session['room'])
        return TempHumi
    else:
        return "false"
@app.route("/myroom/info/cam")
def cam():
    if 'user' in session:
        url = dorm_db.getCamUrl(session['room'])
        return url
    else:
        return "false"
@app.route("/myroom/door/open")
def door():
    client.Mqtt_Publish(session['room'],"door","open")
    return base_api_response(201, "Successfully signed up")

@app.route("/myroom/aircon/<control>")
def aircon(control):
    client.Mqtt_Publish(session['room'],"aircon",control)
    return base_api_response(201, "Successfully signed up")

@app.route('/')
def index():
    return render_template('index.html')
if __name__ == '__main__':
    from waitress import serve
    serve(app,host='0.0.0.0', port=5000)

