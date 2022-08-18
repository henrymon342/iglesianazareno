export class EventoModel {
  id?: number;
  titulo: string;
  ministerio: string;
  fecha: string;
  hora: string;
  horaini: string;
  horafin: string;
  modalidad : string;
  lugar : string;
  encargado : string;
  descripcion : string;

  presencial?: string;
  virtual?: string;
  estado : string;

  tipofecha?: string;

  fecha_single?: string;
  fechaini?: string;
  fechafin?: string;

}

