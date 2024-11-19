from flask import jsonify
import pymysql
from dotenv import load_dotenv
import os

class DormDB:
    def __init__(self):
        self.db = pymysql.connect(host=os.environ.get('DB_HOST'), user=os.environ.get('DB_USER'), password=os.environ.get('DB_PASSWORD'), db=os.environ.get('DB_NAME'))
        self.cur = self.db.cursor()
        print("connect ok")
    def getTempHumi(self, room):
        if self.cur.execute("select temperature, humidity from dormitory where number={0}".format(room)) == None:
            return False
        info = self.cur.fetchall()[0]
        data = {'temperature':info[0],'humidity':info[1]}
        return jsonify(data)
    def ifExists(self, room):
        if self.cur.execute(f"select * from dormitory where number={room}"):
            return True
        else:
            return False
    def create(self, room):
        self.cur.execute("insert into dormitory values('{0}', NULL, NULL, NULL)".format(room))
        self.db.commit()
    def updateTehu(self, room, temperature, humidity):
        self.cur.execute("update dormitory set temperature={0}, humidity={1} where number={2}".format(float(temperature),float(humidity),int(room)))
        self.db.commit()
    def updateCam(self, room, url):
        self.cur.execute("update cam set url='{0}' where number={1}".format(str(url),int(room)))
        self.db.commit()

