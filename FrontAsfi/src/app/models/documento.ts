export interface getDocumento
{
  id?:string,
  nombre_archivo:string
}
export interface getAllDocumentos
{
  id?:string,
  identificador: number,
  id_articulo: number,
  usuario: number,
  nombre_documento: string,
  ruta_documento:string,
  descripcion_documento: string,
  origen: string,
}
export interface getCantidadDoc{
  id?:string,
  identificador?:number,
  data:number
}
export interface getDocumentoId{
  id?:string
}
