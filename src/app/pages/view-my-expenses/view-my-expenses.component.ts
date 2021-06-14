import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { forkJoin } from 'rxjs';

import { DataService, AlertService, AuthenticationService } from 'app/_services';
import { ExpenseRecordsResponse } from 'app/_models';

@Component({
  selector: 'app-view-my-expenses',
  templateUrl: './view-my-expenses.component.html',
  styleUrls: ['./view-my-expenses.component.scss']
})
export class ViewMyExpensesComponent implements OnInit {
  contractorId: number;
  mileageRate: number;
  @Input()selectedIndex: number | 0;
  @ViewChild('table1', {read: MatSort, static: false }) set content1(sort: MatSort) {
    this.myDrafts.sort = sort;
  }
  @ViewChild('table2', {read: MatSort, static: false }) set content2(sort: MatSort) {
    this.myExpenses.sort = sort;
  }
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableTwoPaginator', {static: true}) tableTwoPaginator: MatPaginator;
  public displayedColumns = ['weekEnding', 'client', 'location', 'projectName', 'mondayExpenses', 'tuesdayExpenses',
'wednesdayExpenses', 'thursdayExpenses', 'fridayExpenses', 'saturdayExpenses', 'sundayExpenses', 'weeklyExpense', 'status'];

  public displayedDraftColumns = ['weekEnding', 'client', 'location', 'projectName', 'mondayExpenses', 'tuesdayExpenses',
'wednesdayExpenses', 'thursdayExpenses', 'fridayExpenses', 'saturdayExpenses', 'sundayExpenses', 'weeklyExpense'];
  public myExpenses = new MatTableDataSource<ExpenseRecordsResponse>();
  public myDrafts = new MatTableDataSource<ExpenseRecordsResponse>();
  constructor(
    public alertService: AlertService,
    private dataService: DataService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService) {
      this.contractorId = this.authService.currentUserValue.contractorId;
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.spinner.show();
      if (params.get('type') === 'expense') {
        this.selectedIndex = 1;
      } else {
        this.selectedIndex = 0;
      }
      return forkJoin([this.dataService.getMyExpenseRecords(this.contractorId),
        this.dataService.getMyExpenseDraftRecords(this.contractorId)])
        .subscribe(([tsInfo, draftInfo]) => {
          this.myExpenses.data = tsInfo as ExpenseRecordsResponse[];
          this.myDrafts.data = draftInfo as ExpenseRecordsResponse[];
          if (this.myExpenses.data.length > 0) { 
            this.mileageRate = this.myExpenses.data[0].mileageRate;
            this.myExpenses.paginator = this.tableTwoPaginator;
          }
          if (this.myDrafts.data.length > 0) {
            this.mileageRate = this.myDrafts.data[0].mileageRate;
            this.myDrafts.paginator = this.tableOnePaginator;
          }
          window.scrollTo(0, 0);
          this.spinner.hide();
        },
          error => {
            this.alertService.error(error);
            this.spinner.hide();
          });
    });
  }

  onExpenseTabChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    this.spinner.show();
    if (tab === 'Expense Drafts') {
      this.dataService.getMyDraftRecords(this.contractorId)
        .subscribe(draftInfo => {
          this.myDrafts.data = draftInfo as ExpenseRecordsResponse[];
          this.myDrafts.paginator = this.tableOnePaginator;
          window.scrollTo(0, 0);
          this.spinner.hide();
        },
          error => {
            this.alertService.error(error);
            this.spinner.hide();
          });
    } else if (tab === 'Submitted Expenses') {
      this.dataService.getMyExpenseRecords(this.contractorId)
      .subscribe(tsInfo => {
        this.myExpenses.data = tsInfo as ExpenseRecordsResponse[];
        this.myExpenses.paginator = this.tableTwoPaginator;
        window.scrollTo(0, 0);
        this.spinner.hide();
      },
        error => {
          this.alertService.error(error);
          this.spinner.hide();
        });
    }
  }

  navigateToExpenseDetail(expense: ExpenseRecordsResponse) {
    this.router.navigate(['/view-my-expense'],
      { queryParams: { expenseid: expense.expenseId, expensestatus: expense.expenseStatus, mileagerate: expense.mileageRate }, skipLocationChange: false });
  }

  navigateToDraftDetail(draft: ExpenseRecordsResponse) {
    this.router.navigate(['/view-my-expense-draft'],
    { queryParams: { expenseid: draft.expenseId, mileagerate: draft.mileageRate }, skipLocationChange: false });
  }
  applyFilterOne(filterValue: string) {
    this.myDrafts.filter = filterValue.trim().toLowerCase();
  }
}
