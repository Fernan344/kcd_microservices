/*Tablas*/

CREATE TABLE usuario(
    identificador INTEGER NOT NULL PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    pass VARCHAR(100) NOT NULL,
    tipo CHAR(1)
);

CREATE TABLE mensaje(
    identificador INTEGER NOT NULL PRIMARY KEY,
    mensaje VARCHAR(1500) NOT NULL,
    idEmisor INTEGER NOT NULL,
    idReceptor INTEGER NOT NULL,
    fecha TIMESTAMP NOT NULL,
    CONSTRAINT fk_id_user_transmitter FOREIGN KEY (idEmisor) REFERENCES usuario(identificador),
    CONSTRAINT fk_id_user_receiver FOREIGN KEY (idReceptor) REFERENCES usuario(identificador)
);

/*Secuenses*/

DROP SEQUENCE id_user;
CREATE SEQUENCE id_user
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

DROP SEQUENCE id_message;
CREATE SEQUENCE id_message
INCREMENT BY 1
START WITH 1
NOMINVALUE
NOMAXVALUE;

/*Procedures*/

CREATE OR REPLACE PROCEDURE INSERT_USER(newUsuario VARCHAR, newPass VARCHAR, newTipo CHAR) IS
BEGIN 
    INSERT INTO usuario (identificador, usuario, pass, tipo) VALUES (id_user.nextval, newUsuario, newPass, newTipo);
    COMMIT;
END;

CREATE OR REPLACE PROCEDURE INSERT_MESSAGE(newMensaje VARCHAR, newEmisor INTEGER, newReceptor INTEGER, newFecha TIMESTAMP) IS
BEGIN 
    INSERT INTO mensaje (identificador, mensaje, idEmisor, idReceptor, fecha) VALUES (id_message.nextval, newMensaje, newEmisor, newReceptor, newFecha);
    COMMIT;
END;

/*Objects*/

CREATE OR REPLACE TYPE mensaje_row AS OBJECT (
    mensaje VARCHAR(1500),
    idEmisor INTEGER,
    idReceptor INTEGER,
    fecha TIMESTAMP
);

CREATE OR REPLACE TYPE user_row AS OBJECT (
    identificador INTEGER,
    usuario VARCHAR(100)
);

CREATE OR REPLACE TYPE all_messages_row AS OBJECT (
    identificador INTEGER,
    mensaje VARCHAR(1500),
    idEmisor INTEGER,
    emisor VARCHAR(100),
    idReceptor INTEGER,
    receptor VARCHAR(100),
    fecha TIMESTAMP
);

/*Object Tables*/

CREATE OR REPLACE TYPE mensajes_tabla AS TABLE OF mensaje_row;

CREATE OR REPLACE TYPE users_tabla AS TABLE OF user_row;

CREATE OR REPLACE TYPE all_messages_tabla AS TABLE OF all_messages_row;

/*Functions*/

CREATE OR REPLACE FUNCTION LOGIN(usuario_login VARCHAR, pass_login VARCHAR) RETURN VARCHAR IS
    tipo_usuario CHAR;
    id_usuario INTEGER;
BEGIN
    SELECT us.tipo, us.identificador INTO tipo_usuario, id_usuario FROM usuario us WHERE us.usuario = usuario_login AND us.pass = pass_login;
    RETURN '{'||'"tipo": "'|| tipo_usuario || '", "id": ' || id_usuario || ' }';
END;

CREATE OR REPLACE FUNCTION GET_MESSAGES(idUsuario VARCHAR, idChat VARCHAR) RETURN mensajes_tabla AS

    v_ret mensajes_tabla;
    cursor mensajes_cursor IS SELECT m.mensaje, m.idEmisor, m.idReceptor, m.fecha 
                                FROM MENSAJE m 
                                WHERE (m.idEmisor=idUsuario AND m.idReceptor=idChat) OR (m.idEmisor=idChat AND m.idReceptor=idUsuario)
                                ORDER BY fecha DESC;
    
BEGIN
    v_ret := mensajes_tabla();
    FOR data_record IN mensajes_cursor LOOP
        v_ret.extend;
        v_ret(v_ret.count) := mensaje_row(data_record.mensaje, data_record.idEmisor, data_record.idReceptor, data_record.fecha);
    END LOOP;
    RETURN v_ret;
END;

CREATE OR REPLACE FUNCTION GET_USERS RETURN users_tabla AS

    v_ret users_tabla;
    cursor users_cursor IS SELECT u.identificador, u.usuario
                                FROM Usuario u;
    
BEGIN
    v_ret := users_tabla();
    FOR data_record IN users_cursor LOOP
        v_ret.extend;
        v_ret(v_ret.count) := user_row(data_record.identificador, data_record.usuario);
    END LOOP;
    RETURN v_ret;
END;

CREATE OR REPLACE FUNCTION GET_USER(usuario_ VARCHAR) RETURN INTEGER AS
    identificador_ INTEGER;    
BEGIN
    SELECT u.identificador INTO identificador_ FROM usuario u WHERE u.usuario=usuario_;
    RETURN identificador_;
END;

CREATE OR REPLACE FUNCTION GET_ALL_MESSAGES RETURN all_messages_tabla AS

    v_ret all_messages_tabla;
    cursor messages_cursor IS SELECT m.identificador, m.mensaje, m.idEmisor, us.usuario as emisor, m.idReceptor, u.usuario as receptor, m.fecha FROM mensaje m
                                    INNER JOIN usuario us
                                        ON m.idEmisor = us.identificador
                                    INNER JOIN usuario u
                                        ON m.idReceptor = u.identificador
                                ORDER BY m.fecha DESC;
    
BEGIN
    v_ret := all_messages_tabla();
    FOR data_record IN messages_cursor LOOP
        v_ret.extend;
        v_ret(v_ret.count) := all_messages_row(data_record.identificador, data_record.mensaje, data_record.idemisor, data_record.emisor, data_record.idreceptor, data_record.receptor, data_record.fecha);
    END LOOP;
    RETURN v_ret;
END;

commit;
rollback;

/*examples*/

SELECT * FROM usuario;
SELECT * FROM mensaje;
SELECT * FROM TABLE(get_messages(1, 10));
SELECT * FROM TABLE(get_all_messages());
EXECUTE INSERT_USER('ADMINISTRADOR', 'administrador2017', 'A');
EXECUTE INSERT_MESSAGE('newMEssage', 22, 23, TIMESTAMP '1997-01-31 09:26:50');
SELECT * FROM TABLE(get_users());
SELECT GET_USER('newUsuario222') FROM dual;
SELECT LOGIN('newUsuario222', 'newPass') FROM dual;





