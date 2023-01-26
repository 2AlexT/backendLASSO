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
  nombre_archivo: string,
  ruta_archivo:string,
  descripcion: string,
  origen: string,
}
export interface getCantidadDoc{
  id?:string,
  identificador?:number,
  valor?:number,
  articulo?:number
  
}
export interface getDocumentoId{
  id?:string
}
export interface modificarDocumento{
  id?:string,
  documento:string,
  descripcion:string
}
export interface descargarDocumento{
  id?:string,
  filename:string
}
export interface documentoCantidad{
  id?:string,
  cantidad:number
}