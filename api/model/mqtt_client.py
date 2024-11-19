import paho.mqtt.client as mqtt
class MqttClient:
    def __init__(self,on_message):
        self.client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
        self.client.on_message = on_message
        self.client.connect("localhost", 1883)
        self.client.subscribe("room/+/info/#")
        self.client.loop_start()
    def Mqtt_Publish(self,room,request,message):
        self.client.publish("room/"+room+"/control/"+request,message)
        