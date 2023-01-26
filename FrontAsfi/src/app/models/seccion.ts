export interface getSeccion{
    id?:string,
    identificador: number,
    fecha_proceso:string,
    fecha_proceso_hasta:string,
    indicador: string,
    secuencia: number,
    id_gestion: number,
    seccion: number,
    fecha_alta: string,
    usuario: number,

    active?:boolean
}
export interface Menu{
  active: boolean,
}
export interface createSeccion{
  id?:string,
  seccion:number,
}
