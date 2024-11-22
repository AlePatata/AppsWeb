import pymysql
import json
from datetime import datetime

DB_NAME = 'tarea2'
DB_USERNAME = 'cc5002'
DB_PASSWORD = 'programacionweb'
DB_HOST = 'localhost'
DB_PORT = 3306
DB_CHARSET = 'utf8'

with open('database/querys.json', 'r') as querys:
	QUERY_DICT = json.load(querys)

def getConnection():
    conn = pymysql.connect(
        db=DB_NAME,
        user=DB_USERNAME,
        passwd=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        charset=DB_CHARSET
    )
    return conn

def get_regiones():
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_regiones"])
    regiones = cursor.fetchall()
    cursor.close()
    conn.close()
    return regiones

def get_comunas():
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_comunas"])
    comunas = cursor.fetchall()
    cursor.close()
    conn.close()
    return comunas

def get_dispositivos(i=1):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_dispositivos"])
    dispositivos = cursor.fetchmany(5*i)
    cursor.close()
    conn.close()
    return dispositivos

def get_comuna_by_contacto(contacto_id):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_comuna_by_contacto"], (contacto_id,))
    comuna = cursor.fetchone()
    cursor.close()
    conn.close()
    return comuna

def get_tipo(dispositivo_id):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_tipo"], (dispositivo_id,))
    tipo = cursor.fetchone()
    cursor.close()
    conn.close()
    return tipo

def get_tipos():
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_tipos"])
    rows = cursor.fetchall()
    result = [{"name": row[0], "y": row[1]} for row in rows]
    
    cursor.close()
    conn.close()
    return result


def get_nombre_dispositivo(dispositivo_id):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_nombre_dispositivo"], (dispositivo_id,))
    nombre = cursor.fetchone()
    cursor.close()
    conn.close()
    return nombre

def get_estado(dispositivo_id):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_estado"], (dispositivo_id,))
    estado = cursor.fetchone()
    cursor.close()
    conn.close()
    return estado

def get_comuna_dispositivo(dispositivo_id):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_comuna_dispositivo"], (dispositivo_id,))
    comuna = cursor.fetchone()
    cursor.close()
    conn.close()
    return comuna

def get_last_dispositivo_id():
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_last_dispositivo_id"])
    dispositivo_id = cursor.fetchone()
    cursor.close()
    conn.close()
    return dispositivo_id

def get_archivos(dispositivo_id):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_archivos"], (dispositivo_id,))
    archivos = cursor.fetchone()
    cursor.close()
    conn.close()
    return archivos

def get_comentarios(dispositivo_id):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_comentarios"], (dispositivo_id,))
    comentarios = cursor.fetchmany(5)
    cursor.close()
    conn.close()
    print(comentarios)
    return comentarios

#-- CONTACTO
#-- agregar
def insert_contacto(nombre, email, celular, comuna_id):
    fecha = datetime.now()
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["insert_contacto"],(nombre, email, celular, comuna_id, fecha))
    conn.commit()
    cursor.close()
    conn.close()
    
#-- DISPOSITIVO
#-- agregar
def insert_dispositivo(contacto_id, nombre, descripcion, tipo, anos_uso, estado):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["insert_dispositivo"],(contacto_id, nombre, descripcion, tipo, anos_uso, estado))
    conn.commit()
    cursor.close()
    conn.close()

#-- ARCHIVO
#-- agregar
def insert_archivo(filepath, filename, dispositivo_id):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["insert_archivo"],(filepath, filename, dispositivo_id))
    conn.commit()
    cursor.close()
    conn.close()

#-- COMENTARIO
#-- agregar
def insert_comentario(nombre, texto, dispositivo_id):
    fecha = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    conn = getConnection()
    cursor = conn.cursor()
    print("preexecute")
    cursor.execute(QUERY_DICT["insert_comentario"], (nombre, texto, fecha, dispositivo_id))
    print("postexecute")
    conn.commit()
    cursor.close()
    conn.close()

# GETTERS
def get_contacto_comuna():
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_contacto_comuna"])
    contacto_comuna = cursor.fetchall()
    data = []
    for row in contacto_comuna:
        data.append({"name": row[0], "y": row[1]})
    return data

def get_comuna_id(comuna):
    conn = getConnection()
    cursor = conn.cursor()
    try:
        cursor.execute(QUERY_DICT["get_comuna_id"], (comuna,))
        comuna_id = cursor.fetchone()
    finally:    
        conn.close()
        return comuna_id

def get_contacto_id(nombre):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_contacto_id"], (nombre,))
    contacto_id = cursor.fetchone()
    cursor.close()
    conn.close()
    return contacto_id

def get_dispositivo_id(nombre):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_dispositivo_id"], (nombre,))
    dispositivo_id = cursor.fetchone()
    cursor.close()
    conn.close()
    return dispositivo_id

def get_nombre_dispositivo(dispositivo_id):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_nombre_dispositivo"], (dispositivo_id,))
    nombre = cursor.fetchone()
    cursor.close()
    conn.close()
    return nombre   

def get_dispositivo(dispositivo_id):
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_dispositivo_by_id"], (dispositivo_id,))
    dispositivo = cursor.fetchone()
    cursor.close()
    conn.close()
    return dispositivo  