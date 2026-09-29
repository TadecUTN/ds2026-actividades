export type Rol = 'ADMIN' | 'CLIENTE';

export type Usuario = {
    id: number;
    email: string;
    nombre: string;
    rol: Rol;
};

export type UsuarioSesion = Usuario;

export type Sesion = {
    token: string;
    usuario: Usuario;
};

export type Credenciales = {
    email: string;
    password: string;
};
