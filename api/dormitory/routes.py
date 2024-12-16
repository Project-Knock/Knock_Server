from flask import Blueprint, session, jsonify
from dormitory.service import get_tehu, get_camera_url
from base_api_response import base_api_response
from app import app, client

from . import routes

@dorm_bp.route("/info/tehu")
def get_temperature_humidity():
    if 'user' in session:
        dormitory_id = session.get('room')
        data = get_tehu(dormitory_id)
        if data: 
            return base_api_response(200, "Success", data)
        return base_api_response(404, "Dormitory not found")
    return base_api_response(401, "Unauthorized")

@dorm_bp.route("/info/cam")
def get_camera():
    if 'user' in session:
        dormitory_id = session.get('room')
        url = get_camera_url(dormitory_id)
        if url:
            return base_api_response(200, "Success", url);
        return base_api_response(404, "Dormitory not found")
    return base_api_response(401, "Unauthorized")


@app.route("/door/open")
def door():
    if 'room' not in session:
        return base_api_response(400, "Room not found in session")
    
    room = session['room']
    client.Mqtt_Publish(room, "door", "open")
    return base_api_response(201, "Successfully opened")

@app.route("/aircon/<control>")
def aircon(control):
    if 'room' not in session:
        return base_api_response(400, "Room not found in session")
    
    room = session['room']
    if control not in ["on", "off"]:
        return base_api_response(400, "Invalid control command")
    client.Mqtt_Publish(room, "aircon", control)
    return base_api_response(201, "Successfully turn on/off")