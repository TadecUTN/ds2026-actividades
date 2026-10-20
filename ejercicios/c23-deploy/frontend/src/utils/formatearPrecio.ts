export const formatearPrecio = (precio: number) => {
  return `$ ${new Intl.NumberFormat('es-AR').format(precio)}`;
};
