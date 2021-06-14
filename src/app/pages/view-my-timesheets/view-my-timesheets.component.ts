import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { forkJoin } from 'rxjs';

import { DataService, AlertService, AuthenticationService } from 'app/_services';
import { TimesheetRecordsResponse } from 'app/_models';

@Component({
  selector: 'app-view-my-timesheets',
  templateUrl: './view-my-timesheets.component.html',
  styleUrls: ['./view-my-timesheets.component.scss']
})
export class ViewMyTimesheetsComponent implements OnInit {
  contractorId: number;
  @Input()selectedIndex: number | 0;
  @ViewChild('table1', {read: MatSort, static: false }) set content1(sort: MatSort) {
    this.myDrafts.sort = sort;
  }
  @ViewChild('table2', {read: MatSort, static: false }) set content2(sort: MatSort) {
    this.myTimesheets.sort = sort;
  }
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableTwoPaginator', {static: true}) tableTwoPaginator: MatPaginator;
  public displayedColumns = ['weekEnding', 'client', 'location', 'projectName', 'mondayHours', 'tuesdayHours',
'wednesdayHours', 'thursdayHours', 'fridayHours', 'saturdayHours', 'sundayHours', 'weeklyHours', 'status'];

  public displayedDraftColumns = ['weekEnding', 'client', 'location', 'projectName', 'mondayHours', 'tuesdayHours',
'wednesdayHours', 'thursdayHours', 'fridayHours', 'saturdayHours', 'sundayHours', 'weeklyHours'];
  public myTimesheets = new MatTableDataSource<TimesheetRecordsResponse>();
  public myDrafts = new MatTableDataSource<TimesheetRecordsResponse>();
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
      if (params.get('type') === 'timesheet') {
        this.selectedIndex = 1;
      } else {
        this.selectedIndex = 0;
      }
      return forkJoin([this.dataService.getMyTimesheetRecords(this.contractorId),
        this.dataService.getMyDraftRecords(this.contractorId)])
        .subscribe(([tsInfo, draftInfo]) => {
          this.myTimesheets.data = tsInfo as TimesheetRecordsResponse[];
          this.myTimesheets.paginator = this.tableTwoPaginator;
          this.myDrafts.data = draftInfo as TimesheetRecordsResponse[];
          this.myDrafts.paginator = this.tableOnePaginator;
          window.scrollTo(0, 0);
          this.spinner.hide();
        },
          error => {
            this.alertService.error(error);
            this.spinner.hide();
          });
    });
  }

  onTimesheetTabChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    this.spinner.show();
    if (tab === 'Timesheet Drafts') {
      this.dataService.getMyDraftRecords(this.contractorId)
        .subscribe(draftInfo => {
          this.myDrafts.data = draftInfo as TimesheetRecordsResponse[];
          this.myDrafts.paginator = this.tableOnePaginator;
          window.scrollTo(0, 0);
          this.spinner.hide();
        },
          error => {
            this.alertService.error(error);
            this.spinner.hide();
          });
    } else if (tab === 'Submitted Timesheets') {
      this.dataService.getMyTimesheetRecords(this.contractorId)
      .subscribe(tsInfo => {
        this.myTimesheets.data = tsInfo as TimesheetRecordsResponse[];
        this.myTimesheets.paginator = this.tableTwoPaginator;
        window.scrollTo(0, 0);
        this.spinner.hide();
      },
        error => {
          this.alertService.error(error);
          this.spinner.hide();
        });
    }
  }

  navigateToTimesheetDetail(timesheet: TimesheetRecordsResponse) {
    this.router.navigate(['/view-my-timesheet'],
      { queryParams: { timesheetid: timesheet.timesheetId, timesheetstatus: timesheet.timesheetStatus }, skipLocationChange: false });
  }

  navigateToDraftDetail(draft: TimesheetRecordsResponse) {
    this.router.navigate(['/view-my-draft'],
    { queryParams: { timesheetid: draft.timesheetId }, skipLocationChange: false });
  }

  applyFilterOne(filterValue: string) {
    this.myDrafts.filter = filterValue.trim().toLowerCase();
  }
}
