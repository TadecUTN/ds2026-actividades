import { z } from 'zod';

export const libroSchema = z.object({
    titulo: z.string().trim()
        .min(1, 'El libro debe tener un titulo')
        .max(50, 'El titulo es demasiado largo'),
    autor: z.string().trim()
        .min(1, 'El libro debe tener autor')
        .max(40, 'El nombre del autor es demasiado largo'),
    categorias: z.array(z.string().trim())
        .min(1, 'Debes seleccionar al menos una categoría'),
    precio: z.coerce.number()
        .gte(1, 'El producto debe tener un precio positivo'),
    disponible: z.boolean(),
    imagen: z.string().trim().url('Debe ser una URL válida').or(z.literal('')).optional(),
    sinopsis: z.string().trim()
        .max(2000, 'La sinopsis no puede superar los 2000 caracteres')
        .optional()
        .or(z.literal('')),
});

export type LibroValidado = z.infer<typeof libroSchema>;