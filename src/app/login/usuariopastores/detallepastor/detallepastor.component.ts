import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PastorModel } from '../../../models/pastor.model';
import { PastorService } from '../../../services/pastor.service';
import Swal from 'sweetalert2';
import { AsignaturaService } from '../../../services/asignatura.service';
import { AsignaturaModel } from '../../../models/asignatura.model';
import { ImagenService } from '../../../services/imagen.service';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-detallepastor',
  templateUrl: './detallepastor.component.html',
  styleUrls: ['./detallepastor.component.scss']
})
export class DetallepastorComponent implements OnInit {

  @ViewChild("content1", {static: false}) contenido!: ElementRef;
  @ViewChild("content2", {static: false}) contenido2!: ElementRef;

  seeRecord: boolean = false;

  hasMaterias: boolean = false;
  id: any;
  public pastor: PastorModel = new PastorModel();
  ASIGNATURAS = this.arrayAsignaturas();

  isEdit: boolean = false;

  materiasAprobadas: number;
  materiasRestantes: number;
  TOTALMATERIAS = 30;

  listaAsignaturas: AsignaturaModel[] = [];
  imagen: any;

  listaTitulos: any[] =[];

  constructor( private service_pastor: PastorService,
               private service_asignatura: AsignaturaService,
               private route: ActivatedRoute,
               private router: Router,
               private service_imagen: ImagenService ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params;
    console.log(this.id);
    this.getPastorByID(this.id.id);
    this.getAsignaturas(this.id.id);
    this.getImagenPastor(this.id.id);
  }


  getImagenPastor(id: number) {
    this.service_imagen.get(id).subscribe( res => {
      console.log(res);
      this.imagen = res;
    })
  }

  getPastorByID(id: number) {
    this.service_pastor.get(id).subscribe(async data =>{
      this.pastor = await data
      console.log(data);
      if( this.pastor.category == 'Presbitero' ){
        this.crearArrayTitulos(this.pastor.titulos);
      }
    })
  }

  crearArrayTitulos(titus?: string){
    console.log(titus);
    var listaaux = JSON.parse(titus+'');
    for (let variable in listaaux) {
      if (listaaux[variable] === true) {
        console.log(variable);
        this.listaTitulos.push({nombre: variable, valor: true});
      }else{
        this.listaTitulos.push({nombre: variable, valor: false});

      }
   }
    console.log(this.listaTitulos);

  }


  getAsignaturas(id: number){
    this.service_asignatura.getByIdPastor(id).subscribe( res => {
      console.log(res);
      if( res[0] == undefined ){
      console.log('no EXISTE');
      this.hasMaterias = false;
      }else{
        console.log('EXISTE');
        this.hasMaterias = true;
      }
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

  eliminarPastor(){
    const id = this.id.id;
    this.service_pastor.delete(id).subscribe(async (respas: any) => {
      const resimag = await this.service_imagen.delete(id).subscribe( response => {
        return response;
      })
      // console.log(respas);
      this.router.navigateByUrl('/login/usuariopastores')
    })
  }

  alertaEliminar(){
    Swal.fire({
      title: 'Esta seguro de eliminar el pastor?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminarPastor();
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  convertToPDF(){
  html2canvas(this.contenido.nativeElement).then(canvas => {
    // Few necessary setting options





    var imgData = canvas.toDataURL('image/png');
    var imgWidth = 210 ;
    var pageHeight = 295 ;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    // 'p', 'mm',
    var doc = new jsPDF('p', 'mm');


    var position = 0;

    doc.addImage(imgData, 'PNG', 3, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 3, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    doc.save( 'file.pdf');

    // const contentDataURL = canvas.toDataURL('image/png')
    // let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    // var width = pdf.internal.pageSize.getWidth();
    // var height = canvas.height * width / canvas.width;
    // pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);

    // pdf.addPage();

    // pdf.save('output.pdf'); // Generated PDF
    }
    );
  }



  generaPDF(){
    var element = document.getElementById('content1');
    var opt = {
      margin:       .3,
      filename:     'boleta.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  }

  // descargarBoleta(){
  //   let pdf = new jsPDF('p', 'mm', 'a4');
  //   pdf.html(this.contenido.nativeElement, {
  //     callback: (pdf) => {
  //       pdf.save('demo.pdf');
  //     }
  //   })
  // }

}
