import cx_Oracle
from flask import json
from flask.json import jsonify

class Connection:             
        
        cx_Oracle.init_oracle_client(lib_dir=r"C:\\Oracle\\instantclient_21_3")
        connection = cx_Oracle.connect('Fernando', '201731087', 'localhost/orcl18')

        def __init__ (self):
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