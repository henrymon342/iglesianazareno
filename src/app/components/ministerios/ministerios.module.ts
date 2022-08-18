import { NgModule } from '@angular/core';

import { MinisteriosRoutingModule } from './ministerios-routing.module';
import { JniComponent } from './jni/jni.component';
import { MniComponent } from './mni/mni.component';
import { MieddComponent } from './miedd/miedd.component';


@NgModule({
  declarations: [
    JniComponent,
    MniComponent,
    MieddComponent,
  ],
  imports: [
    MinisteriosRoutingModule,

  ]
})
export class MinisteriosModule { }
