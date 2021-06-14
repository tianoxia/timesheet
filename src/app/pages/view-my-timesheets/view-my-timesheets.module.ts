import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './view-my-timesheets.routing';
import { SharedModule } from '../../shared/shared.module';
import { ViewMyTimesheetComponent } from './view-my-timesheet/view-my-timesheet.component';
import { ViewMyDraftComponent } from './view-my-draft/view-my-draft.component';
import { AddMyDraftComponent } from './add-my-draft/add-my-draft.component';
import { AddMyTimesheetComponent } from './add-my-timesheet/add-my-timesheet.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    ViewMyTimesheetComponent,
    ViewMyDraftComponent,
    AddMyDraftComponent,
    AddMyTimesheetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    routing
  ],
  providers: [
    DatePipe
  ]
})
export class ViewMyTimesheetsModule { }
