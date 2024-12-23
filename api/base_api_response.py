from flask import jsonify
def base_api_response(status, message, data=[]):
    response = {
        "status":status,
        "message":message,
        "data":data
    }
    return jsonify(response)