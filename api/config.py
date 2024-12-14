import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    SESSION_TYPE = os.environ.get('SESSION_TYPE')  # 세션 저장 방식 설정
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=30)  # 세션 만료 시간 30분으로 설정
    SQLALCHEMY_TRACK_MODIFICATIONS = False
 