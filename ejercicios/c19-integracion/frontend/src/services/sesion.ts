export const obtenerToken = (): string | null => localStorage.getItem('token');
export const guardarToken = (token: string): void => localStorage.setItem('token', token);
export const borrarToken = (): void => localStorage.removeItem('token');
