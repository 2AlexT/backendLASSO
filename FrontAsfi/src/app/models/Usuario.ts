export interface UsuarioAutenticado {
    nombre: string;
}


export interface UsuarioResponse {
    status: string;
    data: UsuarioLogueado;
}

export interface UsuarioLogueado {
//    correo?: string;
    cargo?: string;
    status:string
    nombre: string;
    identificador: number;
    accessToken: string | null;
    refreshToken:string;
}