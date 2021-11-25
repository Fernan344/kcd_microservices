import cx_Oracle
from flask import json
from flask.json import jsonify
import os

class Connection:             
        connection = None        

        def __init__ (self):
                cx_Oracle.init_oracle_client(lib_dir=r"/opt/oracle/instantclient_19_3")
                self.connection = cx_Oracle.connect(os.environ['oracle_user'], os.environ['oracle_pass'], os.environ['oracle_dsn'])
                print('Conexion Iniciada!!!')      

        def login(self, user, password):
                cursor = self.connection.cursor()
                cursor.execute("""
                        SELECT LOGIN(:0, :1)
                        FROM dual""", [user, password])
                                
                for fname in cursor:
                   return fname

        def signUp(self, user, password):
                try:
                        cursor = self.connection.cursor()
                        cursor.callproc('INSERT_USER', [user, password, 'U'])
                        return jsonify({"auth": True})
                except cx_Oracle.Error as e:
                        print(e)
                        return jsonify({"auth": False})


        def getConnection(self):                
                return self.connection