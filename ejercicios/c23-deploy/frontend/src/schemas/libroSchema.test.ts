import { describe, it, expect } from 'vitest';
import { libroSchema } from './libroSchema';

const libroValido = {
  titulo: 'Rayuela',
  autor: 'Julio Cortázar',
  categorias: ['Ficción'],
  precio: 7000,
  disponible: true,
  imagen: 'https://img.test/portada.jpg',
};

describe('libroSchema del frontend (unitario puro)', () => {
  it('precio: "7000" (string del <input>) → 7000 (número)', () => {
    const res = libroSchema.safeParse({
      ...libroValido,
      precio: '7000',
    });

    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.precio).toBe(7000);
      expect(typeof res.data.precio).toBe('number');
    }
  });

  it('rechaza precio menor a 1', () => {
    const res = libroSchema.safeParse({
      ...libroValido,
      precio: 0,
    });

    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.issues.map((i) => i.path[0])).toContain('precio');
    }
  });

  it('valida exitosamente un libro con campos válidos', () => {
    const res = libroSchema.safeParse(libroValido);
    expect(res.success).toBe(true);
  });
});
