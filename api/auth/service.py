from flask import Blueprint, request, session, abort
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from auth.model import User
from extensions import db
from base_api_response import base_api_response

def login(username, password):
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        session['user'] = username
        return base_api_response(201, "Success")
    return base_api_response(400, "Invalid credentials")
 
@login_required
def logout():
    logout_user()
    session.clear()
    return base_api_response(200, 'Successfully logged out')

def signup(username, password, role, dormitory):
    if User.query.filter_by(username=username).first():
        return base_api_response(400, "Username already exists")
    if User.query.filter_by(dormitory=dormitory).first():
        return base_api_response(400, "Dormitory has already been signed up")
    new_user = User(id=None, username=username, password=password, role=role, dormitory=dormitory)
    db.session.add(new_user)
    db.session.commit()
    return base_api_response(201, "Successfully signed up")