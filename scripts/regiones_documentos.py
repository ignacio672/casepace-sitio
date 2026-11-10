"""Calcula en qué parte de cada foto está cada dato del caso de muestra.

Uso: python3 scripts/regiones_documentos.py [carpeta_de_control]

Repite la geometría de material/documentos_muestra.py (el dibujo plano, la
escala, el giro y el centrado sobre la mesa) para saber dónde quedó cada valor
en la foto de 1600 x 1200. Escribe src/content/regionesDocumentos.json con
cajas en porcentaje de la foto. Con una carpeta de control, guarda además las
fotos con las cajas dibujadas para revisarlas a ojo.

Necesita las mismas fuentes de macOS que el script original.
"""
import json
import math
import os
import sys

from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SUP = "/System/Library/Fonts/Supplemental/"
FUENTES = {
    "sans": SUP + "Arial.ttf", "sans-b": SUP + "Arial Bold.ttf",
    "serif": SUP + "Times New Roman.ttf", "serif-b": SUP + "Times New Roman Bold.ttf",
}
_lienzo = ImageDraw.Draw(Image.new("RGB", (10, 10)))


def letra(nombre, tamano):
    return ImageFont.truetype(FUENTES[nombre], tamano)


def ancho(texto, fuente):
    return _lienzo.textlength(texto, font=fuente)


def lineas(texto, ancho_max, fuente):
    n, linea = 1, ""
    for palabra in texto.split():
        prueba = (linea + " " + palabra).strip()
        if ancho(prueba, fuente) > ancho_max:
            n += 1
            linea = palabra
        else:
            linea = prueba
    return n


def parte(texto, desde, hasta, x, y, fuente, alto):
    """Caja de las palabras [desde:hasta] dentro de un valor que empieza en x."""
    palabras = texto.split(" ")
    antes = " ".join(palabras[:desde])
    x0 = x + (ancho(antes + " ", fuente) if antes else 0)
    tramo = " ".join(palabras[desde:hasta])
    return (x0, y, x0 + ancho(tramo, fuente), y + alto)


def a_foto(caja, tam_doc, angulo):
    """Lleva una caja del documento plano a la foto de 1600 x 1200, en %."""
    W, H = tam_doc
    e = min(1300 / W, 1000 / H)
    w, h = int(W * e), int(H * e)
    t = math.radians(angulo)
    rw = abs(w * math.cos(t)) + abs(h * math.sin(t))
    rh = abs(w * math.sin(t)) + abs(h * math.cos(t))
    x0, y0 = (1600 - rw) / 2, (1200 - rh) / 2
    xs, ys = [], []
    for px, py in ((caja[0], caja[1]), (caja[2], caja[1]), (caja[0], caja[3]), (caja[2], caja[3])):
        dx, dy = px * e - w / 2, py * e - h / 2
        xs.append(dx * math.cos(t) + dy * math.sin(t) + rw / 2 + x0)
        ys.append(-dx * math.sin(t) + dy * math.cos(t) + rh / 2 + y0)
    m = 7
    izq, arr, der, aba = min(xs) - m, min(ys) - m, max(xs) + m, max(ys) + m
    return {
        "x": round(izq / 16, 2), "y": round(arr / 12, 2),
        "w": round((der - izq) / 16, 2), "h": round((aba - arr) / 12, 2),
    }


def pasaporte():
    f, alto = letra("sans-b", 31), 34
    x, y, paso = 430, 140, 74
    v = lambda fila, dx=0: (x + dx, y + paso * fila + 25)
    nombres = "MARIA ALEJANDRA"
    cajas = {
        "4": parte("RIVAS MONTERO", 0, 2, *v(1), f, alto),
        "5": parte(nombres, 0, 1, *v(2), f, alto),
        "6": parte(nombres, 1, 2, *v(2), f, alto),
        "23": parte("18 ABR / APR 1991", 0, 5, *v(4), f, alto),
        "25": parte("VENEZOLANA", 0, 1, *v(3), f, alto),
        "36.1": parte("148392756", 0, 1, *v(0, 420), f, alto),
    }
    return (1500, 1056), -2.5, cajas


def filas_de_registro(parrafo):
    return 390 + 44 * lineas(parrafo, 860, letra("serif", 30))


def matrimonio():
    f, alto = letra("serif-b", 30), 34
    y = filas_de_registro(
        "En la ciudad de Maracaibo, a los veintidós días del mes de agosto de dos mil trece, "
        "comparecieron ante este Registro Civil, para contraer matrimonio civil:"
    )
    esposo = "CARLOS EDUARDO FERNÁNDEZ SOTO"
    titulo = letra("serif-b", 58)
    mitad = ancho("ACTA DE MATRIMONIO", titulo) / 2
    cajas = {
        "22": (550 - mitad, 224, 550 + mitad, 284),
        "46": parte(esposo, 2, 4, 420, y + 6, f, alto),
        "47": parte(esposo, 0, 1, 420, y + 6, f, alto),
        "48": parte(esposo, 1, 2, 420, y + 6, f, alto),
        "50": parte("22 de agosto de 2013", 0, 5, 420, y + 6 + 58 * 4, f, alto),
    }
    return (1100, 1420), 1.8, cajas


def nacimiento(nombre, fecha, angulo, sufijo):
    f, alto = letra("serif-b", 30), 34
    y = filas_de_registro(
        "Quien suscribe, Registrador Civil del Municipio Maracaibo, certifica que en los libros "
        "de nacimientos de este Registro consta el asiento siguiente:"
    )
    cajas = {
        f"71.{sufijo}": parte(nombre, 1, 3, 420, y + 6, f, alto),
        f"72.{sufijo}": parte(nombre, 0, 1, 420, y + 6, f, alto),
        f"74.{sufijo}": parte(fecha, 0, 5, 420, y + 6 + 58, f, alto),
        f"75.{sufijo}": parte("Maracaibo, estado Zulia", 0, 3, 420, y + 6 + 58 * 2, f, alto),
    }
    return (1100, 1420), angulo, cajas


def i94():
    f, alto = letra("sans-b", 30), 34
    cajas = {
        "32.1.1": parte("2026 March 15", 0, 3, 560, 280 + 64, f, alto),
        "32.1.2": parte("Eagle Pass, Texas", 0, 3, 560, 280 + 64 * 4, f, alto),
        "32.1.3": parte("DT", 0, 1, 560, 280 + 64 * 2, f, alto),
    }
    return (1100, 1420), -1.0, cajas


DOCUMENTOS = {
    "pasaporte": ("pasaporte", pasaporte()),
    "matrimonio": ("acta_de_matrimonio", matrimonio()),
    "nac_santiago": ("partida_santiago", nacimiento("SANTIAGO FERNÁNDEZ RIVAS", "9 de junio de 2015", -1.4, 1)),
    "nac_valentina": ("partida_valentina", nacimiento("VALENTINA FERNÁNDEZ RIVAS", "23 de enero de 2019", 2.2, 2)),
    "i94": ("i94", i94()),
}

if __name__ == "__main__":
    control = sys.argv[1] if len(sys.argv) > 1 else None
    salida = {}
    for ident, (archivo, (tam, angulo, cajas)) in DOCUMENTOS.items():
        salida[ident] = {campo: a_foto(caja, tam, angulo) for campo, caja in cajas.items()}
        if control:
            os.makedirs(control, exist_ok=True)
            foto = Image.open(os.path.join(RAIZ, "material", "imagenes", "documentos", f"{archivo}.jpg")).convert("RGB")
            d = ImageDraw.Draw(foto)
            for r in salida[ident].values():
                d.rectangle([r["x"] * 16, r["y"] * 12, (r["x"] + r["w"]) * 16, (r["y"] + r["h"]) * 12], outline=(120, 140, 0), width=3)
            foto.resize((800, 600)).save(os.path.join(control, f"{ident}.jpg"), quality=80)
    destino = os.path.join(RAIZ, "src", "content", "regionesDocumentos.json")
    with open(destino, "w") as f:
        json.dump(salida, f, indent=2)
        f.write("\n")
    print("escrito", os.path.relpath(destino, RAIZ))
