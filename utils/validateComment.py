import re


def validate_comment(nombre, texto):
    print(nombre, texto)
    return validate_nombre(nombre) and validate_texto(texto)

def validate_nombre(nombre):
    return nombre and (3 <= len(nombre) <= 80)


def validate_texto(texto):
    return texto and (5 <= len(texto.strip()) <= 200)