import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorDetails, TimesheetRequest,
  LoginRequest, DraftRequest, ApproveExpenseRequest,
  DeclineExpenseRequest, ApproveTimesheetRequest,
  RevertTimesheetRequest, DeclineTimesheetRequest } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseurl: string;
  timeoutInSeconds: number;
  customHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.baseurl = AppConfig.settings.apiServer.baseUrl;
    this.timeoutInSeconds = AppConfig.settings.apiServer.timeoutInSeconds;
    this.customHeaders = new HttpHeaders({
      ClientId: AppConfig.settings.ad.clientId,
      ClientSecret: AppConfig.settings.ad.clientSecret
    });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    const errorDetails = error.error as ErrorDetails;
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = 'Error: ${error.error.message}';
    } else if (error instanceof TimeoutError) { // Timeout Error
      errorMessage = error.message;
    } else if (error.status === 403) {
      errorMessage = 'You Do Not Have Sufficient Rights To Perform This Action';
    } else if (error.status === 404) {
      errorMessage = 'Service unavailable, please contact administrator.';
    } else if (error.status === 401) {
      setTimeout(() => this.router.navigate(['login'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } }));
      errorMessage = errorDetails[0].message;
    } else if (error.status === 400) {
      // Server-side errors
      errorMessage = errorDetails[0].message;
    } else if (error.status === 500) {
      errorMessage = 'We are unable to process your request at this time. Please try again later.';
    } else if (errorDetails !== null) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.status + ' ' + error.statusText;
    }
    return throwError(errorMessage);
  }
  sendValidateUserRequest(loginData: LoginRequest): Observable<any> {
    return this.http.post(this.baseurl + '/tokenauth/validatelogin', loginData)
      .pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getAllDepartments() {
    return this.http.get(this.baseurl + `/department/all`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getAllRecruiters() {
    return this.http.get(this.baseurl + `/recruiter/all`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getAllClients() {
    return this.http.get(this.baseurl + `/client/all`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getSubmittedTimesheetWeekEnding() {
    return this.http.get(this.baseurl + `/weekending/all/timesheet`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getSubmittedExpenseWeekEnding() {
    return this.http.get(this.baseurl + `/weekending/all/expense`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getAllTimesheetsByWeekending(weekEnding: string) {
    return this.http.get(this.baseurl + `/timesheet/all/weekending/${weekEnding}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getMyTimesheetRecords(contractorId: number) {
    return this.http.get(this.baseurl + `/timesheet/contractor/${contractorId}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getMyDraftRecords(contractorId: number) {
    return this.http.get(this.baseurl + `/timesheetdraft/contractor/${contractorId}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getTimesheetDraftById(id: number) {
    return this.http.get(this.baseurl + `/timesheetdraft/${id}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getTimesheetById(id: number) {
    return this.http.get(this.baseurl + `/timesheet/${id}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getUnprocessedTimesheetById(id: number) {
    return this.http.get(this.baseurl + `/timesheet/unprocessed/${id}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  createTimesheet(data: TimesheetRequest) {
    return this.http.post(this.baseurl + `/timesheet/`, data).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  updateTimesheet(data: TimesheetRequest) {
    return this.http.put(this.baseurl + `/timesheet`, data).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  revertTimesheet(request: RevertTimesheetRequest) {
    return this.http.put(this.baseurl + `/timesheet/revert`, request).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  deleteTimesheet(id: number) {
    return this.http.delete(this.baseurl + `/timesheet/${id}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getAllTimesheetDraftsByWeekending(weekEnding: string) {
    return this.http.get(this.baseurl + `/timesheetdraft/all/weekending/${weekEnding}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  createTimesheetDraft(data: DraftRequest) {
    return this.http.post(this.baseurl + `/timesheetdraft`, data).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  updateTimesheetDraft(data: DraftRequest) {
    return this.http.put(this.baseurl + `/timesheetdraft`, data).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getTimesheetTitleInfo(contractorId: number) {
    return this.http.get(this.baseurl + `/assignment/contractor/${contractorId}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  timesheetExists(assignmentId: number, weekEnding: string) {
    return this.http.get(this.baseurl + `/timesheet/assignment/${assignmentId}/weekending/${weekEnding}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  releaseTimesheet(data: TimesheetRequest) {
    return this.http.put(this.baseurl + `/timesheet/release`, data).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getMyExpenseRecords(contractorId: number) {
    return this.http.get(this.baseurl + `/expense/contractor/${contractorId}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getMyExpenseDraftRecords(contractorId: number) {
    return this.http.get(this.baseurl + `/expensedraft/contractor/${contractorId}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getAllExpensesByWeekending(weekEnding: string) {
    return this.http.get(this.baseurl + `/expense/all/weekending/${weekEnding}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getExpenseById(id: number) {
    return this.http.get(this.baseurl + `/expense/${id}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  createExpense(data: FormData) {
    return this.http.post(this.baseurl + `/expense/`, data).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  updateExpense(data: FormData) {
    return this.http.put(this.baseurl + `/expense`, data).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  deleteExpense(id: number) {
    return this.http.delete(this.baseurl + `/expense/${id}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getAllExpenseDraftsByWeekending(weekEnding: string) {
    return this.http.get(this.baseurl + `/expensedraft/all/weekending/${weekEnding}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  getExpenseDraftById(id: number) {
    return this.http.get(this.baseurl + `/expensedraft/${id}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  createExpenseDraft(data: FormData) {
    return this.http.post(this.baseurl + `/expensedraft`, data).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  updateExpenseDraft(data: FormData) {
    return this.http.put(this.baseurl + `/expensedraft`, data).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  expenseExists(assignmentId: number, weekEnding: string) {
    return this.http.get(this.baseurl + `/expense/assignment/${assignmentId}/weekending/${weekEnding}`).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  processExpenseById(id: number) {
    return this.http.get(this.baseurl + `/process-expense/${id}`, { headers: this.customHeaders }).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  declineExpense(data: DeclineExpenseRequest) {
    return this.http.post(this.baseurl + `/process-expense/decline`, data, { headers: this.customHeaders }).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  approveExpense(data: ApproveExpenseRequest) {
    return this.http.post(this.baseurl + `/process-expense/approve`, data, { headers: this.customHeaders }).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  editApproveExpense(data: FormData) {
    return this.http.put(this.baseurl + `/process-expense/editapprove`, data, { headers: this.customHeaders }).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  processTimesheetById(id: number) {
    return this.http.get(this.baseurl + `/process-timesheet/${id}`, { headers: this.customHeaders }).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  declineTimesheet(data: DeclineTimesheetRequest) {
    return this.http.post(this.baseurl + `/process-timesheet/decline`, data, { headers: this.customHeaders }).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  approveTimesheet(data: ApproveTimesheetRequest) {
    return this.http.post(this.baseurl + `/process-timesheet/approve`, data, { headers: this.customHeaders }).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
  editApproveTimesheet(data: TimesheetRequest) {
    return this.http.put(this.baseurl + `/process-timesheet/editapprove`, data, { headers: this.customHeaders }).pipe(timeout(this.timeoutInSeconds), catchError(this.handleError));
  }
}
