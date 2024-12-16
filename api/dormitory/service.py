from extensions import db
from dormitory.model import Dormitory

def update_tehu(dormitory_id, temperature, humidity):
    dorm = Dormitory.query.get(dormitory_id)
    if dorm:
        dorm.temperature = temperature
        dorm.humidity = humidity
        db.session.commit()

def update_camera_url(dormitory_id, url):
    dorm = Dormitory.query.get(dormitory_id)
    if dorm:
        dorm.camera_url = url
        db.session.commit() 

def get_tehu(dormitory_id):
    dorm = Dormitory.query.get(dormitory_id)
    if dorm:
        return {"temperature": dorm.temperature, "humidity": dorm.humidity}
    return None

def get_camera_url(dormitory_id):
    dorm = Dormitory.query.get(dormitory_id)
    if dorm:
        return dorm.camera_url
    return None

def isExists(dormitory_id):
    return bool(Dormitory.query.get(dormitory_id))

def create(dormitory_id):
    dorm = Dormitory(id=dormitory_id)
    db.session.add(dorm)
    db.session.commit()