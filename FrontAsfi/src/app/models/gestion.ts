export interface getGestion{
    active: boolean;
    id?:string,
    identificador: number,
    fecha_proceso: string,
    fecha_proceso_hasta: string,
    indicador:string,
    secuenia: number,
    id_empresa: number,
    gestion: number,
    fecha_alta: string,
    usuario: number,
    usuario_mod: number,
}
export interface Menu{
  active: boolean,
}
