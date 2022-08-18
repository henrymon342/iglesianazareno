import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditarpastorComponent } from '../editarpastor/editarpastor.component';
import Swal from 'sweetalert2';
import { PastorService } from '../../../services/pastor.service';
import { PastorModel } from '../../../models/pastor.model';
import * as html2pdf from 'html2pdf.js';



@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {

  @ViewChild("page_pdf_pastor", {static: false}) contenido!: ElementRef;

  displayedColumns: string[] = ['numero', 'nombre', 'categoria', 'area', 'año de ordenación', 'mas'];
  displayedColumns1: string[] = ['numero', 'nombre', 'categoria', 'gestion_ordenacion', 'area', 'asiste a'];

  listAdministradores: PastorModel[] = [];
  public dataSource = new MatTableDataSource<PastorModel>();

  constructor( public dialog: MatDialog, private servicepastor: PastorService ) { }

  ngOnInit(): void {
    this.getPastoresLocales();
  }

  openDialog() {
    this.dialog.open(EditarpastorComponent);
  }



  public getPastoresLocales = () => {
    const category = { category: 'Local' }
    this.servicepastor.getByCategory(category)
    .subscribe(res => {
      this.dataSource.data = res as PastorModel[];
    })
  }


  alertaEliminar(){
    Swal.fire({
      title: 'Esta seguro de eliminar el administrador?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  generaPDF2(){
    var element = document.getElementById('page_pdf_pastor');
    var opt = {
      margin:       .5,
      filename:     'output.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  }

}
