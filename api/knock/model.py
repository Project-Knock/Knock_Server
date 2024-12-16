from extensions import db

class Knock(db.Model):
    __tablename__ = 'knock'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    dormitory = db.Column(db.Integer, nullable=False)
    detectedAt = db.Column(db.DateTime, nullable=False) 