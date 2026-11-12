"""Prepara las imágenes del sitio a partir de material/imagenes/.

Uso: python3 scripts/preparar_imagenes.py   (o: npm run imagenes)

Lee los originales y escribe versiones livianas en src/assets/. Los originales
no se tocan. Si cambian las fotos de los fundadores, ajustar los recortes de
FUNDADORES para que las dos caras queden del mismo tamaño y a la misma altura.
"""
import os
import shutil

from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIGEN = os.path.join(RAIZ, "material", "imagenes")
DESTINO = os.path.join(RAIZ, "src", "assets")

DOCUMENTOS = {
    "pasaporte": "pasaporte",
    "acta_de_matrimonio": "matrimonio",
    "partida_santiago": "nac_santiago",
    "partida_valentina": "nac_valentina",
    "i94": "i94",
}

# (izquierda, arriba, derecha, abajo) sobre el original de 1080 x 1080.
# Los dos recortes dejan la cara centrada y del mismo tamaño relativo.
FUNDADORES = {
    "ignacio": (125, 130, 885, 1080),
    "francisco": (151, 116, 829, 964),
}


def guardar(img, ruta, calidad=82):
    os.makedirs(os.path.dirname(ruta), exist_ok=True)
    img.save(ruta, "WEBP", quality=calidad, method=6)
    print(f"{os.path.relpath(ruta, RAIZ):48s} {img.size[0]}x{img.size[1]}  {os.path.getsize(ruta) // 1024} KB")


def documentos():
    for archivo, ident in DOCUMENTOS.items():
        foto = Image.open(os.path.join(ORIGEN, "documentos", f"{archivo}.jpg")).convert("RGB")
        guardar(foto.resize((1040, 780), Image.LANCZOS), os.path.join(DESTINO, "documentos", f"{ident}.webp"), 80)
        guardar(foto.resize((192, 144), Image.LANCZOS), os.path.join(DESTINO, "documentos", f"{ident}-mini.webp"), 78)


def paginas():
    for n in range(1, 8):
        pagina = Image.open(os.path.join(ORIGEN, "i589", f"i589_pagina_{n}.png")).convert("RGB")
        guardar(pagina.resize((612, 792), Image.LANCZOS), os.path.join(DESTINO, "i589", f"pagina-{n}.webp"), 84)


def fundadores():
    for nombre, caja in FUNDADORES.items():
        foto = Image.open(os.path.join(ORIGEN, "fundadores", f"{nombre}.png")).convert("RGB")
        guardar(foto.crop(caja).resize((720, 900), Image.LANCZOS), os.path.join(DESTINO, "fundadores", f"{nombre}.webp"), 84)


def portada():
    """Sin uso hoy: el inicio no lleva foto. Queda por si vuelve.

    La foto del I-589, recortada con su máscara para que apoye sobre el negro de la marca."""
    from PIL import ImageChops

    foto = Image.open(os.path.join(ORIGEN, "portada", "i589_foto.png")).convert("RGBA")
    mascara = Image.open(os.path.join(ORIGEN, "portada", "i589_mascara.png")).convert("L")
    foto.putalpha(ImageChops.multiply(mascara, foto.getchannel("A")))
    foto = foto.crop(foto.getchannel("A").getbbox())
    alto = round(foto.height * 2400 / foto.width)
    guardar(foto.resize((2400, alto), Image.LANCZOS), os.path.join(DESTINO, "portada", "i589.webp"), 82)
    guardar(foto.resize((1200, alto // 2), Image.LANCZOS), os.path.join(DESTINO, "portada", "i589-chica.webp"), 80)


def logo():
    os.makedirs(DESTINO, exist_ok=True)
    shutil.copyfile(os.path.join(ORIGEN, "casepace_blanco.png"), os.path.join(DESTINO, "casepace-blanco.png"))
    print("src/assets/casepace-blanco.png")


def pdf():
    destino = os.path.join(RAIZ, "public", "caso_muestra_i589_en.pdf")
    shutil.copyfile(os.path.join(RAIZ, "material", "caso_muestra_i589_en.pdf"), destino)
    print("public/caso_muestra_i589_en.pdf")


if __name__ == "__main__":
    documentos()
    paginas()
    fundadores()
    logo()
    pdf()
