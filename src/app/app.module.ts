import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';

import { LayoutModule } from './shared/layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { AppConfig } from './app.config';
import { AuthGuard, JwtInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { LoginComponent, LoginHelpDialogComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ViewMyTimesheetsComponent } from './pages/view-my-timesheets/view-my-timesheets.component';
import { ViewMyTimesheetsModule } from './pages/view-my-timesheets/view-my-timesheets.module';
import { ViewMyExpensesComponent } from './pages/view-my-expenses/view-my-expenses.component';
import { ViewMyExpensesModule } from './pages/view-my-expenses/view-my-expenses.module';
import { ProcessExpenseComponent } from './pages/process-expense/process-expense.component';
import { ProcessTimesheetComponent } from './pages/process-timesheet/process-timesheet.component';
import { AdminTimesheetsExpensesComponent } from './pages/admin-timesheets-expenses/admin-timesheets-expenses.component';
import { AdminTimesheetsExpensesModule } from './pages/admin-timesheets-expenses/admin-timesheets-expenses.module';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    CommonModule,
    LayoutModule,
    SharedModule,
    FormsModule,
    NgxSpinnerModule,
    ViewMyTimesheetsModule,
    ViewMyExpensesModule,
    NgbModule,
    AdminTimesheetsExpensesModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    LoginHelpDialogComponent,
    HomeComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ViewMyTimesheetsComponent,
    ViewMyExpensesComponent,
    ProcessExpenseComponent,
    ProcessTimesheetComponent,
    AdminTimesheetsExpensesComponent,
    UnauthorizedComponent
  ],
  providers: [
    AppConfig, AuthGuard,
    { provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
 ],
  bootstrap: [AppComponent],
  entryComponents: [LoginHelpDialogComponent]
})
export class AppModule { }
