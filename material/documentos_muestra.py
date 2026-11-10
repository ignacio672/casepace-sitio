"""Fotos de muestra de los documentos de María Rivas para el demo.

Datos inventados, marca SAMPLE, sin escudos reales y una silueta en lugar de
una cara. Cada documento se dibuja plano y despues se apoya sobre una mesa,
girado y con sombra, como una foto de celular.
"""
import math
import os
import random
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

SALIDA = sys.argv[1]
SUP = "/System/Library/Fonts/Supplemental/"


def letra(nombre, tamano):
    rutas = {
        "sans": SUP + "Arial.ttf", "sans-b": SUP + "Arial Bold.ttf",
        "serif": SUP + "Times New Roman.ttf", "serif-b": SUP + "Times New Roman Bold.ttf",
        "serif-i": SUP + "Times New Roman Italic.ttf", "mono-b": SUP + "Courier New Bold.ttf",
    }
    return ImageFont.truetype(rutas[nombre], tamano)


def digito(texto):
    valores = {c: i for i, c in enumerate("0123456789")}
    valores.update({c: i + 10 for i, c in enumerate("ABCDEFGHIJKLMNOPQRSTUVWXYZ")})
    valores["<"] = 0
    return str(sum(valores[c] * (7, 3, 1)[i % 3] for i, c in enumerate(texto)) % 10)


def mrz():
    l1 = ("P<VENRIVAS<MONTERO<<MARIA<ALEJANDRA" + "<" * 44)[:44]
    numero, nac, venc = "148392756", "910418", "290930"
    parte = numero + digito(numero) + "VEN" + nac + digito(nac) + "F" + venc + digito(venc)
    personal = "<" * 14
    l2 = parte + personal + digito(personal)
    l2 += digito(numero + digito(numero) + nac + digito(nac) + venc + digito(venc) + personal + digito(personal))
    return l1, l2


def marca_sample(img, tamano=120, opacidad=70):
    capa = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(capa)
    texto = "SAMPLE"
    f = letra("sans-b", tamano)
    ancho = d.textlength(texto, font=f)
    sello = Image.new("RGBA", (int(ancho) + 40, tamano + 40), (0, 0, 0, 0))
    ImageDraw.Draw(sello).text((20, 10), texto, font=f, fill=(190, 30, 30, opacidad))
    sello = sello.rotate(24, expand=True)
    capa.alpha_composite(sello, ((img.width - sello.width) // 2, (img.height - sello.height) // 2))
    img.alpha_composite(capa)


def guilloche(d, ancho, alto, color, paso=14, amplitud=10, fase=0.0):
    for y in range(-20, alto + 20, paso):
        puntos = [(x, y + amplitud * math.sin(x / 38 + y / 50 + fase)) for x in range(0, ancho + 8, 8)]
        d.line(puntos, fill=color, width=1)


def silueta(d, x0, y0, x1, y1):
    d.rectangle([x0, y0, x1, y1], fill=(214, 222, 230))
    cx, ancho = (x0 + x1) / 2, x1 - x0
    d.ellipse([cx - ancho * 0.22, y0 + (y1 - y0) * 0.16, cx + ancho * 0.22, y0 + (y1 - y0) * 0.52], fill=(150, 160, 172))
    d.pieslice([x0 + ancho * 0.08, y0 + (y1 - y0) * 0.58, x1 - ancho * 0.08, y1 + (y1 - y0) * 0.45], 180, 360,
               fill=(150, 160, 172))


def rotulo(d, x, y, r, v, tr=19, tv=31):
    d.text((x, y), r, font=letra("sans", tr), fill=(70, 85, 110))
    d.text((x, y + tr + 6), v, font=letra("sans-b", tv), fill=(20, 24, 32))


def pasaporte():
    img = Image.new("RGBA", (1500, 1056), (238, 243, 238, 255))
    d = ImageDraw.Draw(img)
    guilloche(d, 1500, 1056, (212, 226, 218), paso=12)
    guilloche(d, 1500, 1056, (226, 214, 222), paso=26, amplitud=16, fase=1.7)
    d.text((44, 30), "REPÚBLICA BOLIVARIANA DE VENEZUELA", font=letra("sans-b", 30), fill=(28, 44, 96))
    d.text((44, 72), "PASAPORTE / PASSPORT", font=letra("sans", 26), fill=(28, 44, 96))
    silueta(d, 54, 150, 384, 590)
    x, y, paso = 430, 140, 74
    rotulo(d, x, y, "Tipo / Type", "P")
    rotulo(d, x + 170, y, "Código / Code", "VEN")
    rotulo(d, x + 420, y, "Pasaporte N.º / Passport No.", "148392756")
    for r, v in [
        ("Apellidos / Surname", "RIVAS MONTERO"),
        ("Nombres / Given names", "MARIA ALEJANDRA"),
        ("Nacionalidad / Nationality", "VENEZOLANA"),
    ]:
        y += paso
        rotulo(d, x, y, r, v)
    y += paso
    rotulo(d, x, y, "Fecha de nacimiento / Date of birth", "18 ABR / APR 1991")
    rotulo(d, x + 600, y, "Sexo / Sex", "F")
    y += paso
    rotulo(d, x, y, "Lugar de nacimiento / Place of birth", "MARACAIBO")
    y += paso
    rotulo(d, x, y, "Fecha de expedición / Date of issue", "30 SEP / SEP 2019")
    rotulo(d, x + 600, y, "Fecha de vencimiento / Date of expiry", "30 SEP / SEP 2029")
    d.rectangle([0, 790, 1500, 1056], fill=(247, 247, 244, 255))
    l1, l2 = mrz()
    f = letra("mono-b", 52)
    d.text((44, 840), l1, font=f, fill=(15, 15, 15))
    d.text((44, 930), l2, font=f, fill=(15, 15, 15))
    marca_sample(img, 150)
    return img


def papel_de_registro(titulo, numero):
    img = Image.new("RGBA", (1100, 1420), (250, 247, 238, 255))
    d = ImageDraw.Draw(img)
    guilloche(d, 1100, 1420, (240, 234, 220), paso=18, amplitud=6)
    for margen, ancho in ((36, 5), (52, 2)):
        d.rectangle([margen, margen, 1100 - margen, 1420 - margen], outline=(120, 92, 52), width=ancho)
    for cx, cy in ((52, 52), (1048, 52), (52, 1368), (1048, 1368)):
        d.ellipse([cx - 14, cy - 14, cx + 14, cy + 14], outline=(120, 92, 52), width=3)
    centro = lambda y, t, f, c=(40, 32, 22): d.text((550, y), t, font=f, fill=c, anchor="ma")
    centro(100, "REPÚBLICA BOLIVARIANA DE VENEZUELA", letra("serif-b", 30))
    centro(142, "REGISTRO CIVIL · MUNICIPIO MARACAIBO · ESTADO ZULIA", letra("serif", 24))
    centro(220, titulo, letra("serif-b", 58), (90, 40, 30))
    centro(300, f"Acta N.º {numero}", letra("serif-i", 28))
    d.line([(160, 350), (940, 350)], fill=(120, 92, 52), width=2)
    return img, d


def parrafo(d, texto, y, ancho=860, x=120, f=None, inter=44):
    f = f or letra("serif", 30)
    linea = ""
    for palabra in texto.split():
        prueba = (linea + " " + palabra).strip()
        if d.textlength(prueba, font=f) > ancho:
            d.text((x, y), linea, font=f, fill=(35, 30, 26))
            y += inter
            linea = palabra
        else:
            linea = prueba
    d.text((x, y), linea, font=f, fill=(35, 30, 26))
    return y + inter


def sello_y_firma(img, d, y):
    cx, cy, r = 300, y + 110, 95
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(60, 80, 150), width=5)
    d.ellipse([cx - r + 16, cy - r + 16, cx + r - 16, cy + r - 16], outline=(60, 80, 150), width=2)
    d.text((cx, cy), "REGISTRO\nCIVIL", font=letra("serif-b", 26), fill=(60, 80, 150), anchor="mm", align="center")
    rng = random.Random(7)
    puntos, x = [], 640
    for i in range(60):
        x += 6
        puntos.append((x, y + 120 + 26 * math.sin(i / 3.2) + rng.uniform(-6, 6)))
    d.line(puntos, fill=(30, 40, 90), width=4)
    d.line([(600, y + 170), (1000, y + 170)], fill=(60, 50, 40), width=2)
    d.text((800, y + 182), "Registrador Civil", font=letra("serif-i", 24), fill=(60, 50, 40), anchor="ma")


def matrimonio():
    img, d = papel_de_registro("ACTA DE MATRIMONIO", "1.284")
    y = parrafo(d, (
        "En la ciudad de Maracaibo, a los veintidós días del mes de agosto de dos mil trece, "
        "comparecieron ante este Registro Civil, para contraer matrimonio civil:"
    ), 390)
    for r, v in [
        ("Contrayente", "CARLOS EDUARDO FERNÁNDEZ SOTO"),
        ("Nacido el", "2 de noviembre de 1988, Maracaibo"),
        ("Contrayente", "MARÍA ALEJANDRA RIVAS MONTERO"),
        ("Nacida el", "18 de abril de 1991, Maracaibo"),
        ("Fecha del matrimonio", "22 de agosto de 2013"),
        ("Lugar", "Maracaibo, estado Zulia"),
    ]:
        d.text((120, y + 10), r + ":", font=letra("serif-i", 26), fill=(90, 70, 50))
        d.text((420, y + 6), v, font=letra("serif-b", 30), fill=(30, 26, 22))
        y += 58
    y = parrafo(d, "Leída la presente acta, firman los contrayentes y los testigos en señal de conformidad.", y + 24)
    sello_y_firma(img, d, y + 10)
    marca_sample(img, 170)
    return img


def nacimiento(nombre, fecha, numero):
    img, d = papel_de_registro("ACTA DE NACIMIENTO", numero)
    y = parrafo(d, (
        "Quien suscribe, Registrador Civil del Municipio Maracaibo, certifica que en los libros "
        "de nacimientos de este Registro consta el asiento siguiente:"
    ), 390)
    for r, v in [
        ("Nombre", nombre),
        ("Fecha de nacimiento", fecha),
        ("Lugar de nacimiento", "Maracaibo, estado Zulia"),
        ("Padre", "CARLOS EDUARDO FERNÁNDEZ SOTO"),
        ("Madre", "MARÍA ALEJANDRA RIVAS MONTERO"),
    ]:
        d.text((120, y + 10), r + ":", font=letra("serif-i", 26), fill=(90, 70, 50))
        d.text((420, y + 6), v, font=letra("serif-b", 30), fill=(30, 26, 22))
        y += 58
    y = parrafo(d, "Se expide la presente a solicitud de parte interesada.", y + 24)
    sello_y_firma(img, d, y + 10)
    marca_sample(img, 170)
    return img


def i94():
    img = Image.new("RGBA", (1100, 1420), (255, 255, 255, 255))
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 1100, 120], fill=(22, 46, 84))
    d.text((60, 36), "I-94 Arrival/Departure Record", font=letra("sans-b", 40), fill=(255, 255, 255))
    d.text((60, 170), "Most Recent I-94", font=letra("sans-b", 44), fill=(22, 46, 84))
    d.line([(60, 240), (1040, 240)], fill=(200, 205, 212), width=2)
    y = 280
    for r, v in [
        ("Admission I-94 Record Number", "912845307A3"),
        ("Most Recent Date of Entry", "2026 March 15"),
        ("Class of Admission", "DT"),
        ("Admit Until Date", "03/14/2028"),
        ("Port of Entry", "Eagle Pass, Texas"),
    ]:
        d.text((60, y), r + ":", font=letra("sans", 30), fill=(70, 78, 90))
        d.text((560, y), v, font=letra("sans-b", 30), fill=(20, 24, 32))
        y += 64
    d.text((60, y + 30), "Details provided on the I-94 Information form:", font=letra("sans-b", 30), fill=(22, 46, 84))
    y += 100
    for r, v in [
        ("Last/Surname", "RIVAS MONTERO"),
        ("First (Given) Name", "MARIA ALEJANDRA"),
        ("Birth Date", "1991 April 18"),
        ("Document Number", "148392756"),
        ("Country of Citizenship", "Venezuela"),
    ]:
        d.text((60, y), r + ":", font=letra("sans", 30), fill=(70, 78, 90))
        d.text((560, y), v, font=letra("sans-b", 30), fill=(20, 24, 32))
        y += 64
    d.line([(60, y + 40), (1040, y + 40)], fill=(200, 205, 212), width=2)
    marca_sample(img, 170)
    return img


def como_foto(doc, semilla, angulo):
    rng = random.Random(semilla)
    lienzo = Image.new("RGB", (1600, 1200), (0, 0, 0))
    # Mesa: gris cálido, más clara hacia arriba a la izquierda, con grano fino.
    luz_mesa = Image.radial_gradient("L").resize((3200, 3200)).crop((900, 900, 2500, 2100))
    base = Image.new("RGB", (1600, 1200), (226, 221, 212))
    oscura = Image.new("RGB", (1600, 1200), (184, 178, 168))
    lienzo = Image.composite(oscura, base, luz_mesa)
    grano = Image.effect_noise((1600, 1200), 10).convert("RGB")
    lienzo = Image.blend(lienzo, grano, 0.04)
    escala = min(1300 / doc.width, 1000 / doc.height)
    doc = doc.resize((int(doc.width * escala), int(doc.height * escala)), Image.LANCZOS)
    girado = doc.rotate(angulo, expand=True, resample=Image.BICUBIC)
    sombra = Image.new("RGBA", girado.size, (0, 0, 0, 0))
    margen = 60
    sombra = Image.new("RGBA", (girado.width + 2 * margen, girado.height + 2 * margen), (0, 0, 0, 0))
    alfa = Image.new("L", sombra.size, 0)
    alfa.paste(girado.getchannel("A").point(lambda a: 85 if a else 0), (margen, margen))
    sombra.putalpha(alfa.filter(ImageFilter.GaussianBlur(28)))
    x, y = (1600 - girado.width) // 2, (1200 - girado.height) // 2
    lienzo = lienzo.convert("RGBA")
    lienzo.alpha_composite(sombra, (x - margen + 10, y - margen + 18))
    lienzo.alpha_composite(girado, (x, y))
    return lienzo.convert("RGB")


os.makedirs(SALIDA, exist_ok=True)
for nombre, doc, angulo in [
    ("pasaporte", pasaporte(), -2.5),
    ("acta_de_matrimonio", matrimonio(), 1.8),
    ("partida_santiago", nacimiento("SANTIAGO FERNÁNDEZ RIVAS", "9 de junio de 2015", "3.517"), -1.4),
    ("partida_valentina", nacimiento("VALENTINA FERNÁNDEZ RIVAS", "23 de enero de 2019", "6.042"), 2.2),
    ("i94", i94(), -1.0),
]:
    foto = como_foto(doc, nombre, angulo)
    foto.save(os.path.join(SALIDA, f"{nombre}.jpg"), quality=86)
    print(nombre, foto.size, os.path.getsize(os.path.join(SALIDA, f"{nombre}.jpg")) // 1024, "KB")
