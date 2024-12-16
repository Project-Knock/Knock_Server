from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask import Blueprint

dormitory_bp = Blueprint('dormitory', __name__)

from . import routes  # routes.py에서 라우트를 정의 