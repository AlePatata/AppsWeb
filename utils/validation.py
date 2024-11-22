import re
from werkzeug.datastructures import FileStorage
import filetype
from werkzeug.utils import secure_filename

def validate_nombre(nombre):
    if not nombre:
        return False
    regex = r"^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00C0-\u017F\s'-]+$"
    return bool(re.match(regex,nombre)) and (3 <= len(nombre) <= 80)

def validate_email(email):
    if not email:
        return False
    length_valid = len(email) < 31
    format_valid = re.match(r'^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$', email)
    return length_valid and format_valid

def validate_celular_number(celular_number):
    if celular_number:
        length_valid = len(celular_number) >= 8
        format_valid = re.match(r'^[0-9]+$', celular_number)
        return length_valid and format_valid
    return True

def validate_region(region):
    if not region:
        return False
    return True

def validate_comuna(comuna):
    if not comuna:
        return False
    return True

# DISPOSITIVOS
def validate_device_nombre(dispositivos):
    if not dispositivos:
        return False
    for dnombre in dispositivos:
        if not dnombre or not (3 <= len(dnombre.strip()) <= 80):
            return False
    return True
    
def validate_descripcion(dispositivos):
    if dispositivos:
        for descripcion in dispositivos:
            if descripcion and not (3 <= len(descripcion.strip()) <= 200):
                return False
    return True

def validate_tipo(dispositivos):
    if not dispositivos:
        return False
    for tipo in dispositivos:
        if not tipo:
            return False
        if tipo not in ["pantalla", "notebook", "tablet", "celular", "consola", "mouse", "teclado", "impresora", "parlante", "audífonos", "otro"]:
            return False
    return True

def validate_anos_uso(anos_uso):
    if not anos_uso:
        return False
    for years_of_use in anos_uso:
        if not years_of_use:
            return False
        years = int(years_of_use)
        if not (1 <= years <= 99):
            return False
    return True

def validate_estado(dispositivos):
    if not dispositivos:
        return False
    for estado in dispositivos:
        if not estado:
            return False
        if estado not in ["funciona perfecto", "funciona a medias", "no funciona"]:
            return False
    return True

def validate_files(files):
    if not files:
        return False
    for file in files:
        ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
        ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}
        
        if not file:
            return False
        if file.name == "":
            return False
        ftype_guess = filetype.guess(file)
        if ftype_guess.extension not in ALLOWED_EXTENSIONS:
            return False
        if ftype_guess.mime not in ALLOWED_MIMETYPES:
            return False
    return True

'''
def validate_img(imagen):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}
    if imagen is None:
        return False
    
    if imagen.filename == "":
        return False
    ftype_guess = filetype.guess(imagen)
    if ftype_guess.extension not in ALLOWED_EXTENSIONS:
        return False
    
    if ftype_guess.mime not in ALLOWED_MIMETYPES:
        return False
    return True
'''

def validation(nombre, email, celular, region, comuna, dnombres, descripciones, tipo, anos_uso, estados, files):
    # CONTACTO
    if not validate_nombre(nombre):
        print("Nombre invalido")
        return False
    if not validate_email(email):
        print("Email invalido")
        return False
    if celular:
        if not validate_celular_number(celular):
            print("Número de celular invalido")
            return False
    if not validate_region(region):
        print("Región invalida")
        return False
    if not validate_comuna(comuna):
        return False
    
    # DISPOSITIVOS
    
    if not validate_device_nombre(dnombres):
        return False
    if descripciones:
        if not validate_descripcion(descripciones):
            print("Descripción de dispositivo invalida")
            return False
    if not validate_tipo(tipo):
        print("Tipo de dispositivo invalido")
        return False
    if not validate_anos_uso(anos_uso):
        print("Años de uso invalido")
        return False
    if not validate_estado(estados):
        print("Estado de dispositivo invalido")
        return False
    for i in range(len(files)):
        if not validate_files(files[i]):
            print("Archivos invalidos")
            return False
    return True