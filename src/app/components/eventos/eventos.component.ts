// CALENDAR

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#023047',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#023047',
  },
  blue: {
    primary: '#59a5d8',
    secondary: '#84d2f6',
  },
  orange: {
    primary: '#ff9500',
    secondary: '#ffdd00',
  },
  green: {
    primary: '#2dc653',
    secondary: '#6ede8a',
  },
  gray: {
    primary: '#6c757d',
    secondary: '#e9ecef',
  },
};



import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { EventosService } from '../../services/evento.service';
import * as moment from 'moment';
import { EventoModel } from '../../models/evento.model';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogEventDetalle } from './dialogDetalleEvento/dialogDetalleEvento';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public allEvents:EventoModel[] = [];
  public monthEvents:EventoModel[] = [];


  viewDate1: Date = new Date();
  view1: CalendarView = CalendarView.Month;

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];
  getEvents(){

    var modelEvent:any[] = [];

    var mes = moment(this.viewDate).month();
    console.log('FECHA_ACTUAL', this.viewDate);
    console.log('NUMERO DE MES', mes);


    this.service_evento.getAll().subscribe(async (res:any) =>{
      console.log(res);
      this.allEvents = await res;

      this.allEvents.forEach((element: EventoModel) => {
        console.log(element);

        //COLORES
        var colorToEvent = '';
        if( element.ministerio == 'JNI' ){
          colorToEvent = colors.orange;
        }
        if( element.ministerio == 'MNI' ){
          colorToEvent = colors.green;
        }
        if( element.ministerio == 'DNI' ){
          colorToEvent = colors.blue;
        }
        if( element.ministerio == 'externo' ){
          colorToEvent = colors.red;
        }
        if( moment().isAfter(element.fecha) && element.tipofecha != 'Varios días' ){
          colorToEvent = colors.gray;
        }
        if( moment(element.fechaini).isBefore(moment()) && moment(element.fechafin).isBefore(moment()) && element.tipofecha == 'Varios días' ){
          colorToEvent = colors.gray;
        }


        if( element.tipofecha == 'Varios días' ){
          // FECHAS
          var localTime1 = moment(element.fechaini).add(1, 'days').format('YYYY-MM-DD');
          var localTime2 = moment(element.fechafin).add(1, 'days').format('YYYY-MM-DD');
          const fecha_nueva1 = localTime1 + "T04:00:00.000Z";
          const fecha_nueva2 = localTime2 + "T04:00:00.000Z";

          var nueva_fecha1 = new Date(fecha_nueva1);
          var nueva_fecha2 = new Date(fecha_nueva2);





          modelEvent.push({
            id: element.id,
            start: subDays(startOfDay(nueva_fecha1), 1),
            end: endOfDay(nueva_fecha2),
            title: element.titulo,
            color: colorToEvent,
            allDay: true,
            meta: element.id
          })
        }else{
          var localTime = moment(element.fecha).add(1, 'days').format('YYYY-MM-DD');
          const fecha_nueva = localTime + "T04:00:00.000Z";
          var nueva_fecha = new Date(fecha_nueva);

          modelEvent.push({
            id: element.id,
            start: nueva_fecha,
            title: element.titulo,
            color: colorToEvent,
            allDay: true,
            meta: element.id
          })
        }
      });

    })





    return modelEvent;
    // const fecha_new = 'Thu Jun 02 2022 18:07:40 GMT-0400 (hora de Bolivia)'
    var localTime = moment('2022-06-06T04:00:00.000Z').add(1, 'days').format('YYYY-MM-DD');
    const fecha_new = localTime + "T04:00:00.000Z";

    var localTime2 = moment('2022-06-09T04:00:00.000Z').add(1, 'days').format('YYYY-MM-DD');
    const fecha_new_2 = localTime2 + "T04:00:00.000Z";

    var nueva_fecha = new Date(fecha_new);

    console.log(nueva_fecha);
    return [{
      id: 1234,
      start: subDays(startOfDay(nueva_fecha), 1),
      title: 'TITULO DE PRUEBA',
      color: colors.orange,
      allDay: true
    },
    {
      id: 12312314,
      start: subDays(startOfDay(nueva_fecha), 1),
      end: endOfDay(new Date(fecha_new_2)),
      title: 'PRUEBA ACTIVIDA JNI',
      color: colors.orange,
      allDay: true
    },
    {
      id: 124514,
      start: subDays(startOfDay(nueva_fecha), 1),
      title: 'PRUEBA ACTIVIDA MNI',
      color: colors.green,
      allDay: true
    },
    {
      id: 354634,
      start: subDays(startOfDay(nueva_fecha), 1),
      title: 'PRUEBA ACTIVIDA DNI',
      color: colors.blue,
      allDay: true
    },  ];
  }

  events: CalendarEvent[] = this.getEvents();

  constructor( private service_evento: EventosService, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.mesInteractivo(new Date());
  }





  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        console.log(event);
        console.log(newStart);
        console.log(newEnd);

        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('action', action);
    console.log('event', event);
    this.openDialog('3000ms', '1500ms', event)
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    console.log(view);

    this.view = view;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, event: any): void {

    const parametros = {width: '90vw',
    enterAnimationDuration,
    exitAnimationDuration,
    data: event
    };

    this.dialog.open(DialogEventDetalle, parametros );
  }

  mesInteractivo(viewDate: any){
    let nromes = moment(viewDate).month();
    console.log( nromes );
    console.log( viewDate );
    this.service_evento.findByMonth({nromes}).subscribe( async res =>{
      this.monthEvents = await res;
      console.log(res);
    })
  }


  cambioMinisterio(min: string){
    console.log(this.viewDate1);

    let nromes = moment(this.viewDate1).month();
    console.log( nromes );
    this.service_evento.findByMonth({nromes}).subscribe( async res =>{
      this.monthEvents = await res;

      this.monthEvents = this.monthEvents.filter( evento =>  evento.ministerio == min)
    })


    // const minis = {ministerio: min}
    // this.service_evento.findByMinisterio( minis ).subscribe( res =>{
    //   this.monthEvents = res;
    //   console.log(res);
    // })
  }
}

