import { Routes, RouterModule } from '@angular/router';
import { ViewMyTimesheetComponent } from './view-my-timesheet/view-my-timesheet.component';
import { ViewMyDraftComponent } from './view-my-draft/view-my-draft.component';
import { AddMyDraftComponent } from './add-my-draft/add-my-draft.component';
import { AddMyTimesheetComponent } from './add-my-timesheet/add-my-timesheet.component';

const childRoutes: Routes = [
  { path: 'view-my-timesheet', component: ViewMyTimesheetComponent },
  { path: 'view-my-draft', component: ViewMyDraftComponent },
  { path: 'add-my-timesheet', component: AddMyTimesheetComponent },
  { path: 'add-my-draft', component: AddMyDraftComponent }
];

export const routing = RouterModule.forChild(childRoutes);
