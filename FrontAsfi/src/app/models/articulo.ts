export interface getArticulo
{
  id?:string,
  identificador: number,
  fecha_proceso: string,
  fecha_proceso_hasta: string,
  indicador:string,
  secuencia: number,
  id_seccion: number,
  articulo: number,
  cantidad_articulo:number,
  fecha_alta: string,
  usuario: number,
  fecha_mod: string,
  usuario_mod: number,
}
export interface IdArticuloModel{
  id?:string,
  identificador:number,
}
export interface createArticulo{
  id?:string,
  articulo:number,
}
export interface getCantidadArticulos{
  id?:string,
  identificador:number,
  cantidad_articulo:number,
  id_seccion:number,
  articulo:number
}
export interface modCantidadArticulos{
  id?:string,
  cantidad_articulo:number
}