from extensions import db
 
class Dormitory(db.Model):
    __tablename__ = 'dormitory'
    id = db.Column(db.Integer, primary_key=True)
    temperature = db.Column(db.Float, nullable=True)
    humidity = db.Column(db.Float, nullable=True)
    detectedAt = db.Column(db.DateTime, nullable=True)

class Camera(db.Model):
    __tablename__ = 'cam'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False) 