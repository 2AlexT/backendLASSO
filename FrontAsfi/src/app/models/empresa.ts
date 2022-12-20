export interface getEmpresa{
    id?:string,
    identificador: number,
    fecha_proceso: string,
    fecha_proceso_hasta: string,
    indicador:string,
    secuencia: number,
    nombre: string,
    fecha_alta: string,
    usuario: number,
    usuario_mod: number,
    active?:boolean
    icon?: string,


}