/**
 * Guarda los datos de quien pide el PDF del caso de muestra.
 *
 * Por ahora no hace nada: este proyecto no tiene backend. Al mergear a Lovable
 * se conecta acá a Supabase, y es el único lugar que hay que tocar. Si lanza un
 * error, el formulario igual abre el PDF: no se castiga al visitante por una
 * falla nuestra.
 */
export type Contacto = {
  nombre: string;
  correo: string;
  /** Opcional. */
  organizacion: string;
  /** Desde qué landing llegó. */
  origen: "firms" | "organizations";
};

export async function guardarContacto(_contacto: Contacto): Promise<void> {
  // Sin efecto hasta conectar Supabase.
}
