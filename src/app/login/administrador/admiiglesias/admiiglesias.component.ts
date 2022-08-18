import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { IglesiaService } from '../../../services/iglesia.service';
import { IglesiaModel } from '../../../models/iglesia.model';
import { PastorService } from '../../../services/pastor.service';




@Component({
  selector: 'app-admiiglesias',
  templateUrl: './admiiglesias.component.html',
  styleUrls: ['./admiiglesias.component.css']
})
export class AdmiiglesiasComponent implements OnInit {

  displayedColumns: string[] = [ 'Nro', 'nombre', 'pastor', 'fundación', 'zona', 'more'];

  public dataSource = new MatTableDataSource<IglesiaModel>();

  constructor( private service_iglesia: IglesiaService, private service_pastor: PastorService ) { }

  ngOnInit(): void {
    this.getIglesias();
  }



  public getIglesias = () => {
    this.service_iglesia.getAll()
    .subscribe( (res: any) => {
      console.log(res);
      this.dataSource.data = res as IglesiaModel[];
      console.log(this.dataSource.data);

      // this.dataSource.data.forEach(  (element: any) => {
      //   console.log(element);
      //   element.idPastor =  this.getNamePastor(element.idPastor);
      // });
    })
  }

  getNamePastor(id: any){
    this.service_pastor.get(id).subscribe( res => {
      console.log(res);

      return  res['name'];
    })
    // return '';
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getName(idpastor: any){
    var nombrepastor: string = '';
    this.service_pastor.get(idpastor).subscribe( res => {
      console.log( res );
      nombrepastor = res.name;
    })

    return nombrepastor;
  }

}

