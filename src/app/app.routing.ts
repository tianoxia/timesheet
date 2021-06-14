import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './_helpers';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ViewMyTimesheetsComponent } from './pages/view-my-timesheets/view-my-timesheets.component';
import { ViewMyExpensesComponent } from './pages/view-my-expenses/view-my-expenses.component';
import { ProcessExpenseComponent } from './pages/process-expense/process-expense.component';
import { ProcessTimesheetComponent } from './pages/process-timesheet/process-timesheet.component';
import { AdminTimesheetsExpensesComponent } from './pages/admin-timesheets-expenses/admin-timesheets-expenses.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pages/home'
  },
  {
      path: 'login',
      redirectTo: 'pages/login',
      pathMatch: 'full'
  },
  {
      path: 'register',
      redirectTo: 'pages/register',
      pathMatch: 'full'
  },
  {
      path: 'forgot-password',
      redirectTo: 'pages/forgot-password',
      pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'view-my-timesheets', component: ViewMyTimesheetsComponent, canActivate: [AuthGuard] },
  { path: 'view-my-expenses', component: ViewMyExpensesComponent, canActivate: [AuthGuard] },
  { path: 'process-expense', component: ProcessExpenseComponent },
  { path: 'process-timesheet', component: ProcessTimesheetComponent },
  { path: 'admin-timesheets-expenses', component: AdminTimesheetsExpensesComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(appRoutes);
