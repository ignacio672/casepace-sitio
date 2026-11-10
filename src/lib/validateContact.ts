export type ContactInput = { name: string; email: string; organization: string };
export type ContactErrors = Partial<Record<"name" | "email", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Revisa el formulario de descarga. Devuelve un objeto vacío si está bien. */
export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (!input.name.trim()) errors.name = "Enter your name.";
  const email = input.email.trim();
  if (!email) errors.email = "Enter your work email.";
  else if (!EMAIL.test(email)) errors.email = "That email address looks incomplete.";
  return errors;
}
