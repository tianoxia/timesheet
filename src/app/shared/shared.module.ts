import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule} from '@angular/material/tabs';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertComponent } from './components/alert/alert.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmEqualValidatorDirective } from './directives/confirm-equal-validator.directive';
import { PasswordStrengthComponent } from './components/password-strength/password-strength.component';
import { FormatPhonePipe } from './pipes/format-phone.pipe';
import { UsPhoneFormatDirective } from './directives/us-phone-format.directive';
import { FormatZipCodePipe } from './pipes/format-zip-code.pipe';
import { StripParamFromUrlPipe } from './pipes/strip-param-from-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatNativeDateModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(),
    NgxMaterialTimepickerModule,
    FileUploadModule,
    BrowserAnimationsModule,
    MatListModule,
    MatMenuModule,
    MatSlideToggleModule
  ],
  declarations: [
    AlertComponent,
    LoadingComponent,
    ConfirmEqualValidatorDirective,
    PasswordStrengthComponent,
    FormatPhonePipe,
    UsPhoneFormatDirective,
    FormatZipCodePipe,
    StripParamFromUrlPipe
  ],
  exports: [
    FlexLayoutModule,
    ConfirmEqualValidatorDirective,
    AlertComponent,
    LoadingComponent,
    PasswordStrengthComponent,
    FormatPhonePipe,
    UsPhoneFormatDirective,
    FormatZipCodePipe,
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatNativeDateModule,
    MatDividerModule,
    MatTooltipModule,
    NgxMaskModule,
    NgxMaterialTimepickerModule,
    FileUploadModule,
    BrowserAnimationsModule,
    MatListModule,
    MatMenuModule,
    MatSlideToggleModule
  ],
  providers: [
    FormatPhonePipe,
    FormatZipCodePipe,
    StripParamFromUrlPipe
  ]
})
export class SharedModule { }
