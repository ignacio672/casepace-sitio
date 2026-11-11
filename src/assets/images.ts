/** Las imágenes del sitio. Salen de `npm run imagenes`. */
import pasaporte from "./documentos/pasaporte.webp";
import pasaporteMini from "./documentos/pasaporte-mini.webp";
import matrimonio from "./documentos/matrimonio.webp";
import matrimonioMini from "./documentos/matrimonio-mini.webp";
import nacSantiago from "./documentos/nac_santiago.webp";
import nacSantiagoMini from "./documentos/nac_santiago-mini.webp";
import nacValentina from "./documentos/nac_valentina.webp";
import nacValentinaMini from "./documentos/nac_valentina-mini.webp";
import i94 from "./documentos/i94.webp";
import i94Mini from "./documentos/i94-mini.webp";
import pagina1 from "./i589/pagina-1.webp";
import pagina2 from "./i589/pagina-2.webp";
import pagina3 from "./i589/pagina-3.webp";
import pagina4 from "./i589/pagina-4.webp";
import pagina5 from "./i589/pagina-5.webp";
import pagina6 from "./i589/pagina-6.webp";
import pagina7 from "./i589/pagina-7.webp";
import portada from "./portada/i589.webp";
import portadaChica from "./portada/i589-chica.webp";
import ignacio from "./fundadores/ignacio.webp";
import francisco from "./fundadores/francisco.webp";

export const documentPhotos: Record<string, { photo: string; mini: string }> = {
  pasaporte: { photo: pasaporte, mini: pasaporteMini },
  matrimonio: { photo: matrimonio, mini: matrimonioMini },
  nac_santiago: { photo: nacSantiago, mini: nacSantiagoMini },
  nac_valentina: { photo: nacValentina, mini: nacValentinaMini },
  i94: { photo: i94, mini: i94Mini },
};

export const formPages = [pagina1, pagina2, pagina3, pagina4, pagina5, pagina6, pagina7];

export const founderPhotos: Record<string, string> = { ignacio, francisco };

/** La foto del I-589 del inicio, con transparencia. */
export const coverPhoto = { large: portada, small: portadaChica, width: 2400, height: 1540 };
