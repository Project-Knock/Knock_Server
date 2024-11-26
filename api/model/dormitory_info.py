from flask import jsonify
import pymysql
from dotenv import load_dotenv
import os
class DormDB:
    def __init__(self):
        print("connect ok")
    def getTempHumi(self, room):
        self.db = pymysql.connect(host=os.environ.get('DB_HOST'), user=os.environ.get('DB_USER'), password=os.environ.get('DB_PASSWORD'), db=os.environ.get('DB_NAME'))
        self.cur = self.db.cursor()
        if self.cur.execute("select temperature, humidity, detectedAt from dormitory where number={0}".format(room)) == None:
            return False
        info = self.cur.fetchall()[0]
        data = {'temperature':info[0],'humidity':info[1], "detectedAt":info[2]}
        self.cur.close()
        self.db.close()
        return jsonify(data)
    def getCamUrl(self, room):
        self.db = pymysql.connect(host=os.environ.get('DB_HOST'), user=os.environ.get('DB_USER'), password=os.environ.get('DB_PASSWORD'), db=os.environ.get('DB_NAME'))
        self.cur = self.db.cursor()
        if self.cur.execute("select url from cam where number={0}".format(room)) == None:
            return False
        info = self.cur.fetchall()[0]
        data = {'url':info[0]}
        self.cur.close()
        self.db.close()
        return jsonify(data)
    def ifExists(self, room):
        self.db = pymysql.connect(host=os.environ.get('DB_HOST'), user=os.environ.get('DB_USER'), password=os.environ.get('DB_PASSWORD'), db=os.environ.get('DB_NAME'))
        self.cur = self.db.cursor()
        if self.cur.execute(f"select * from dormitory where number={room}"):
            self.cur.close()
            self.db.close()
            return True
        else:
            self.cur.close()
            self.db.close()
            return False
    def create(self, room):
        self.db = pymysql.connect(host=os.environ.get('DB_HOST'), user=os.environ.get('DB_USER'), password=os.environ.get('DB_PASSWORD'), db=os.environ.get('DB_NAME'))
        self.cur = self.db.cursor()
        self.cur.execute("insert into dormitory values('{0}', NULL, NULL, NULL)".format(room))
        self.db.commit()
        self.cur.close()
        self.db.close()
    def updateTehu(self, room, temperature, humidity):
        self.db = pymysql.connect(host=os.environ.get('DB_HOST'), user=os.environ.get('DB_USER'), password=os.environ.get('DB_PASSWORD'), db=os.environ.get('DB_NAME'))
        self.cur = self.db.cursor()
        self.cur.execute("update dormitory set temperature={0}, humidity={1} where number={2}".format(float(temperature),float(humidity),int(room)))
        self.db.commit()
        self.cur.close()
        self.db.close()
    def updateCam(self, room, url):
        self.db = pymysql.connect(host=os.environ.get('DB_HOST'), user=os.environ.get('DB_USER'), password=os.environ.get('DB_PASSWORD'), db=os.environ.get('DB_NAME'))
        self.cur = self.db.cursor()
        self.cur.execute("update cam set url='{0}' where number={1}".format(str(url),int(room)))
        self.db.commit()
        self.cur.close()
        self.db.close()

