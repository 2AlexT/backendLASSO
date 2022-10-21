export interface PostGetUsuarios{
    id?:string,
    fecha_alta:string,
    fecha_mod:string,
    fecha_proceso:string,
    fecha_proceso_hasta:string,
    identificador:number,
    indicador:string,
    nombre:string,
    usuario:number
}
export interface PostLogin{
    nombre?:string,
}