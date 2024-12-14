from flask import Blueprint, request, session, abort
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from auth.model import User
from extensions import db
from base_api_response import base_api_response
from auth.service import *

from . import auth_bp

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username'] 
    password = data['password']
    return login(username, password) 

@auth_bp.route('/logout')
@login_required
def logout():
    return logout()

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    password = generate_password_hash(data['password'])
    role=data['role']
    dormitory = data['dormitory']
    return signup(username, password, role, dormitory)