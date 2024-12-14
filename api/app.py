from flask import Flask, render_template
from dormitory.mqtt_client import MqttClient # Mqtt 연결 모듈
from dotenv import load_dotenv
from extensions import db

load_dotenv()
app = Flask(__name__)
app.config.from_object('config.Config')
db.init_app(app)

def on_message(client, userdata, message):
    from dormitory.service import update_tehu, update_camera_url

    mtopic = message.topic.split("/")
    data = message.payload.decode()

    if mtopic[2] == "info" and mtopic[3] == "temphumi":
        temp_humi = data.split(", ")
        temperature = temp_humi[0].split(": ")[1]
        humidity = temp_humi[1].split(": ")[1]
        update_tehu(mtopic[1], temperature, humidity)

    elif mtopic[2] == "info" and mtopic[3] == "cam":
        update_camera_url(mtopic[1], data)
        
# client = MqttClient(on_message)
image_data = None
from auth import auth_bp
# from dormitory import dormitory

app.register_blueprint(auth_bp, url_prefix='/auth')
# app.register_blueprint(dormitory, url_prefix='/dormitory')

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/hello")
def hello():
    print("Hello")
    return "HELLO"

if __name__ == '__main__':
    from waitress import serve
    serve(app, host='0.0.0.0', port=5000)
    print("Server Starts") 