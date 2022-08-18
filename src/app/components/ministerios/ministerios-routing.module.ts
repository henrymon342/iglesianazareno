import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JniComponent } from './jni/jni.component';
import { MniComponent } from './mni/mni.component';
import { MieddComponent } from './miedd/miedd.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'jni', component: JniComponent },
      { path: 'mni', component: MniComponent },
      { path: 'miedd', component: MieddComponent },

      { path: '**', redirectTo: 'jni' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MinisteriosRoutingModule { }
