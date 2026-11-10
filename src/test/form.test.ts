import { describe, expect, it } from "vitest";
import { guardarContacto } from "@/lib/guardarContacto";
import { validateContact } from "@/lib/validateContact";

describe("formulario de descarga", () => {
  it("pide nombre y correo; la organización es opcional", () => {
    expect(validateContact({ name: "", email: "", organization: "" })).toEqual({
      name: "Enter your name.",
      email: "Enter your work email.",
    });
    expect(validateContact({ name: "Ana Ruiz", email: "ana@firm.com", organization: "" })).toEqual({});
  });

  it("rechaza un correo incompleto", () => {
    for (const email of ["ana", "ana@", "ana@firm", "ana @firm.com", "@firm.com"]) {
      expect(validateContact({ name: "Ana", email, organization: "" }).email).toBeTruthy();
    }
  });

  it("no cuenta los espacios como contenido", () => {
    expect(validateContact({ name: "   ", email: "  ana@firm.com  ", organization: "" })).toEqual({
      name: "Enter your name.",
    });
  });

  it("guardarContacto todavía no hace nada y no falla", async () => {
    await expect(
      guardarContacto({ nombre: "Ana Ruiz", correo: "ana@firm.com", organizacion: "", origen: "firms" }),
    ).resolves.toBeUndefined();
  });
});
