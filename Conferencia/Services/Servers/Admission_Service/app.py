from flask import Flask, json, jsonify, request
from flask_cors import CORS
from src.services.oracle_connection import Connection

app = Flask(__name__)
CORS(app)
connection = Connection()

@app.route('/ping')
def ping():
    return jsonify({"message": "pong!!"})

@app.route('/signup', methods=['POST'])
def signup():    
    user = request.json['user']
    password = request.json['password']
    return connection.signUp(user, password)

@app.route('/login', methods=['POST'])
def login():    

    user = request.json['user']
    password = request.json['password']
    cursor = connection.login(user, password)[0]
    
    if(cursor==None):
        return jsonify({"auth": False})    
    else:
        response = json.loads(cursor)
        return jsonify({"auth": True, "tipo": response["tipo"], "id": response["id"]})       

if __name__ == '__main__':
    app.run(debug=True, port=4500)