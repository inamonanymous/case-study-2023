from flask import Blueprint, request, jsonify

user_bp = Blueprint('user', __name__)

@user_bp.route('/user/samplejson', methods=['POST', 'GET'])
def sampleJson():
    myDict = {"name": ["basketball", "badminton"],
            "isAvailable": ["False", "True"],
            "isPending": ["True", "False"]
            }
    return myDict

@user_bp.route('/user/receivejson', methods=['POST', 'GET'])
def receiveJson():
    json = request.get_json()
    return jsonify(json)
