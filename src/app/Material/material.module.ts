import { NgModule } from "@angular/core";

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';


const modulosMaterial = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatButtonModule,
  MatTabsModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatDialogModule,
  MatBottomSheetModule,
  MatDividerModule,
  MatStepperModule,
  MatDatepickerModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTooltipModule

]


@NgModule({
    // imports: modulosMaterial,
    exports: modulosMaterial
})

export class MaterialModule {}
