import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AsignaturaModel } from '../../../../models/asignatura.model';
import { MatTableDataSource } from '@angular/material/table';
import { AsignaturaService } from '../../../../services/asignatura.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  @Input() idPas: number | undefined;


  displayedColumns: string[] = ['numero', 'nombremateria', 'nota', 'estado'];
  // dataSource = ELEMENT_DATA;


  // displayedColumns: string[] = ['numero', 'nombre', 'nota', 'estado'];
  listaMaterias: AsignaturaModel[] = [];
  public dataSource = new MatTableDataSource<AsignaturaModel>();
  //////////////////////

  panelOpenState = false;
  ///////////////////////

  formrecord: FormGroup;
  ASIGNATURAS = this.arrayAsignaturas();



  constructor( private fb: FormBuilder,
               private service_asignatura: AsignaturaService,
               private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getAsignaturas();
    this.createFormRecord();
  }


  public getAsignaturas = () => {

    // this.dataSource.data = [
    //   { id: 1, nombremateria: 'TEOLOGIA_SISTEMATICA_I', nota: '65', estado: false, idFKPastor: '1'},
    //   { id: 2, nombremateria: 'TEOLOGIA_SISTEMATICA_II', nota: '43', estado: true, idFKPastor: '1'},
    // ]
    this.service_asignatura.getByIdPastor(this.idPas)
    .subscribe(res => {
      this.dataSource.data = res as AsignaturaModel[];
    })
  }


  promedio(){
    let sumanotas = 0;
    this.dataSource.data.forEach(element => {
      if( element.estado ){
        sumanotas = sumanotas + Number(element.nota);
      }
    });
    return sumanotas/this.materiasAprobadas();
  }


  materiasAprobadas(){
    let cont = 0;
    this.dataSource.data.forEach(element => {
      cont = element.estado? cont+1: cont;
    });
    return cont;
  }

  createFormRecord(){
    this.formrecord = this.fb.group({
      TEOLOGIA_SISTEMATICA_I: false,
      TEOLOGIA_SISTEMATICA_II: false,
      TEOLOGIA_SISTEMATICA_III: false,
      TEOLOGIA_SISTEMATICA_IV: false,
      TEOLOGIA_DE_SANTIDAD_I: false,
      TEOLOGIA_DE_SANTIDAD_II: false,
      NUEVO_TESTAMENTO_I: false,
      NUEVO_TESTAMENTO_II: false,
      ANTIGUO_TESTAMENTO_I: false,
      ANTIGUO_TESTAMENTO_II: false,
      HISTORIA_ECLESIASTICA_I: false,
      HISTORIA_ECLESIASTICA_II: false,
      HOMILETICA_I: false,
      FORMACION_Y_LIDERAZGO_CRISTIANO: false,
      EDUCACION_CRISTIANA: false,
      HISTORIA_E_IDENTIDAD_IGLESIA_DEL_NAZARENO: false,
      BASES_BIBLICAS_Y_TEOLOGICAS_DE_LA_FAMILIA: false,
      HERMENEUTICA_BIBLICA : false,
      BASES_BIBLICAS_Y_TEOLOGICAS_DEL_MINISTERIO: false,
      METODOS_EXEGETICOS: false,
      INTRODUCCION_A_LA_SOCIOLOGIA: false,
      ETICA_CRISTIANA: false,
      EPISTOLAS_PASTORALES : false,
      MOVIMIENTOS_Y_CORRIENTES_TEOLOGICAS_CONTEMPORANEAS: false,
      ADMINTRACION_Y_GESTION_DE_LOS_RECURSOS_ECLESIASTICOS: false,
      CUIDADO_Y_ASESORAMIENTO_PASTORAL: false,
      BASES_BIBLICAS_Y_WESLEYANAS_DE_LA_ADORACION: false,
      EVANGELISMO_Y_DESARROLLO_INTEGRAL: false,
      LA_IGLESIA_EN_MISION: false,
      ORGANIZACION_Y_POLITICA_IGLESIA_DEL_NAZA: false,
    })
  }

  arrayAsignaturas(){
    var asignaturas: any = [];
      asignaturas.push({materia: 'TEOLOGIA_SISTEMATICA_I', estado: false});
      asignaturas.push({materia: 'TEOLOGIA_SISTEMATICA_II', estado: false});
      asignaturas.push({materia: 'TEOLOGIA_SISTEMATICA_III', estado: false});
      asignaturas.push({materia: 'TEOLOGIA_SISTEMATICA_IV', estado: false});
      asignaturas.push({materia: 'TEOLOGIA_DE_SANTIDAD_I', estado: false});
      asignaturas.push({materia: 'TEOLOGIA_DE_SANTIDAD_II', estado: false});
      asignaturas.push({materia: 'NUEVO_TESTAMENTO_I', estado: false});
      asignaturas.push({materia: 'NUEVO_TESTAMENTO_II', estado: false});
      asignaturas.push({materia: 'ANTIGUO_TESTAMENTO_I', estado: false});
      asignaturas.push({materia: 'ANTIGUO_TESTAMENTO_II', estado: false});
      asignaturas.push({materia: 'HISTORIA_ECLESIASTICA_I', estado: false});
      asignaturas.push({materia: 'HISTORIA_ECLESIASTICA_II', estado: false});
      asignaturas.push({materia: 'HOMILETICA_I', estado: false});
      asignaturas.push({materia: 'FORMACION_Y_LIDERAZGO_CRISTIANO', estado: false});
      asignaturas.push({materia: 'EDUCACION_CRISTIANA', estado: false});
      asignaturas.push({materia: 'HISTORIA_E_IDENTIDAD_IGLESIA_DEL_NAZARENO', estado: false});
      asignaturas.push({materia: 'BASES_BIBLICAS_Y_TEOLOGICAS_DE_LA_FAMILIA', estado: false});
      asignaturas.push({materia: 'HERMENEUTICA_BIBLICA', estado: false});
      asignaturas.push({materia: 'BASES_BIBLICAS_Y_TEOLOGICAS_DEL_MINISTERIO', estado: false});
      asignaturas.push({materia: 'METODOS_EXEGETICOS', estado: false});
      asignaturas.push({materia: 'INTRODUCCION_A_LA_SOCIOLOGIA', estado: false});
      asignaturas.push({materia: 'ETICA_CRISTIANA', estado: false});
      asignaturas.push({materia: 'EPISTOLAS_PASTORALES', estado: false});
      asignaturas.push({materia: 'MOVIMIENTOS_Y_CORRIENTES_TEOLOGICAS_CONTEMPORANEAS', estado: false});
      asignaturas.push({materia: 'ADMINTRACION_Y_GESTION_DE_LOS_RECURSOS_ECLESIASTICOS', estado: false});
      asignaturas.push({materia: 'CUIDADO_Y_ASESORAMIENTO_PASTORAL', estado: false});
      asignaturas.push({materia: 'BASES_BIBLICAS_Y_WESLEYANAS_DE_LA_ADORACION', estado: false});
      asignaturas.push({materia: 'EVANGELISMO_Y_DESARROLLO_INTEGRAL', estado: false});
      asignaturas.push({materia: 'LA_IGLESIA_EN_MISION', estado: false});
      asignaturas.push({materia: 'ORGANIZACION_Y_POLITICA_IGLESIA_DEL_NAZA', estado: false});

    console.log(asignaturas);
    return asignaturas;
  }

}
