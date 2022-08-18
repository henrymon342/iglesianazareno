export class AdmiUsuarioModel {
  id?: number;
  name: string;
  lastname: string;
  cargo: string;
  username: string;
  password: string;
  type: string;
  token?: string;
  AdmiEvento?: {
  id?: number;
  ministerio?: string;
  AdministradorId?: number
  }

  // constructor( name:string, lastname:string, cargo:string, username:string, password:string, type:string ){

  // }
}
