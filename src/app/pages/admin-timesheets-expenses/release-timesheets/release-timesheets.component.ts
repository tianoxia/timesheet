import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource, MatDialog, MatSelectChange } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService, AlertService } from 'app/_services';
import { TimesheetRecordsResponse, IApiResponse,
  RevertTimesheetRequest, Contractor, TimesheetResponse } from 'app/_models';

@Component({
  selector: 'app-release-timesheets',
  templateUrl: './release-timesheets.component.html',
  styleUrls: ['./release-timesheets.component.scss']
})
export class ReleaseTimesheetsComponent implements OnInit {
  @Input()timesheetsForm: FormGroup;
  @Input()timesheetDraftsForm: FormGroup;
  @Input()selectedIndex: number | 0;
  @ViewChild('table1', {read: MatSort, static: false }) set content1(sort: MatSort) {
    this.allTimesheetDrafts.sort = sort;
  }
  @ViewChild('table2', {read: MatSort, static: false }) set content2(sort: MatSort) {
    this.allTimesheets.sort = sort;
  }
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableTwoPaginator', {static: true}) tableTwoPaginator: MatPaginator;
  @ViewChild('timesheetDetailDialog', { static: true, read: TemplateRef }) timesheetDetailRef: TemplateRef<any>;
  public displayedColumns = ['clientName', 'contractorName', 'weeklyHours', 'submitDate', 'timesheetStatus', 'approverName',
'release', 'comment', 'star'];

  public displayedDraftColumns = ['clientName', 'contractorName', 'weeklyHours', 'created', 'modified', 'star'];
  public allTimesheets = new MatTableDataSource<TimesheetRecordsResponse>();
  public allTimesheetDrafts = new MatTableDataSource<TimesheetRecordsResponse>();
  weekEndings: string[];
  selectedContractor: Contractor;
  unprocessedTimesheet: TimesheetResponse;
  action: string;
  
  constructor(
    public alertService: AlertService,
    fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService) {
      this.timesheetsForm = fb.group({        
        timesheetWeekEnding: ['', [Validators.required]]
      });
      this.timesheetDraftsForm = fb.group({
        draftWeekEnding: ['', [Validators.required]]
      });
      this.selectedContractor = new Contractor();
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.spinner.show();
      if (params.get('type') === 'timesheet') {
        this.selectedIndex = 1;
      } else {
        this.selectedIndex = 0;
      }
      this.executeGetAllTimesheetsByWeekending();
  });
}

  executeGetAllTimesheetsByWeekending() {
    return this.dataService.getSubmittedTimesheetWeekEnding().subscribe((wke: string[]) => {
      if (wke !== null && wke.length > 0) {
        forkJoin([this.dataService.getAllTimesheetsByWeekending(wke[0]),
          this.dataService.getAllTimesheetDraftsByWeekending(wke[0])])
        .subscribe(([tsInfo, dfInfo]) => {
          this.allTimesheets.data = tsInfo as TimesheetRecordsResponse[];
          this.allTimesheetDrafts.data = dfInfo as TimesheetRecordsResponse[];
          this.weekEndings = wke;
          this.timesheetsForm.controls.timesheetWeekEnding.patchValue(wke[0]);
          this.timesheetDraftsForm.controls.draftWeekEnding.patchValue(wke[0]);
          this.allTimesheetDrafts.paginator = this.tableOnePaginator;
          this.allTimesheets.paginator = this.tableTwoPaginator;
          window.scrollTo(0, 0);
          this.spinner.hide();
        },
        error => {
          this.alertService.error(error);
          window.scrollTo(0, 0);
          this.spinner.hide();
        });
      }
    }, error => {
      this.alertService.error(error);
      window.scrollTo(0, 0);
      this.spinner.hide();
    });
  }

  changeWeekEnding(event: MatSelectChange, type: string) {
    switch (type) {
      case 'timesheet':
        this.loadTimesheets(this.datePipe.transform(event.value, 'yyyy-MM-dd'));
        break;
      case 'draft':
        this.loadDrafts(this.datePipe.transform(event.value, 'yyyy-MM-dd'));
        break;
    }
  }

  loadDrafts(weekEnding: string) {
    this.dataService.getAllTimesheetDraftsByWeekending(weekEnding).subscribe(dfInfo => {
      this.allTimesheetDrafts.data = dfInfo as TimesheetRecordsResponse[];
      this.allTimesheetDrafts.paginator = this.tableOnePaginator;
      window.scrollTo(0, 0);
      this.spinner.hide();
    },
    error => {
      this.alertService.error(error);
      window.scrollTo(0, 0);
      this.spinner.hide();
    });
  }
  loadTimesheets(weekEnding: string) {
    this.dataService.getAllTimesheetsByWeekending(weekEnding).subscribe(tsInfo => {
      this.allTimesheets.data = tsInfo as TimesheetRecordsResponse[];
      this.allTimesheets.paginator = this.tableTwoPaginator;
      window.scrollTo(0, 0);
      this.spinner.hide();
    },
    error => {
      this.alertService.error(error);
      window.scrollTo(0, 0);
      this.spinner.hide();
    });
  }
  onTimesheetTabChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    this.spinner.show();
    if (tab === 'Timesheet Drafts') {
      return this.dataService.getSubmittedTimesheetWeekEnding().subscribe((wke: string[]) => {
        if (wke !== null && wke.length > 0) {
            this.loadDrafts(wke[0]);
            this.weekEndings = wke;
            this.timesheetDraftsForm.controls.draftWeekEnding.patchValue(wke[0]);
        }
      }, error => {
        this.alertService.error(error);
        window.scrollTo(0, 0);
        this.spinner.hide();
      });
    } else if (tab === 'Submitted Timesheets') {
      return this.dataService.getSubmittedTimesheetWeekEnding().subscribe((wke: string[]) => {
        if (wke !== null && wke.length > 0) {
          this.loadTimesheets(wke[0]);
          this.weekEndings = wke;
          this.timesheetsForm.controls.timesheetWeekEnding.patchValue(wke[0]);
        }
      }, error => {
        this.alertService.error(error);
        window.scrollTo(0, 0);
        this.spinner.hide();
      });
    }
  }

  navigateToTimesheetDetail(timesheet: TimesheetRecordsResponse) {
    this.router.navigate(['/view-my-timesheet'],
      { queryParams: { timesheetid: timesheet.timesheetId, timesheetstatus: timesheet.timesheetStatus,
      releasetimesheet: true }, skipLocationChange: false });
  }

  navigateToDraftDetail(draft: TimesheetRecordsResponse) {
    this.router.navigate(['/view-my-draft'],
    { queryParams: { timesheetid: draft.timesheetId, releasetimesheet: true }, skipLocationChange: false });
  }

  applyFilterOne(filterValue: string) {
    this.allTimesheetDrafts.filter = filterValue.trim().toLowerCase();
  }

  viewOriginalTimesheet(timesheet: TimesheetRecordsResponse) {
    this.spinner.show();
    this.dataService.getUnprocessedTimesheetById(timesheet.timesheetId).subscribe(tsInfo => {
      this.unprocessedTimesheet = tsInfo as TimesheetResponse;
      this.openTimesheetDetailDialog(this.timesheetDetailRef);
      this.spinner.hide();
    },
    error => {
      this.alertService.error(error);
      window.scrollTo(0, 0);
      this.spinner.hide();
    });    
  }

  openTimesheetDetailDialog(timesheetDetailDialog) {
    this.dialog.open(timesheetDetailDialog, {
      autoFocus: false,
      width: '700px',
      disableClose: true,
      panelClass: 'detailed-dialog-container'
    });
  }

  openWarningDialog(warningDialog, id: number, type: string, action: string) {
    this.action = action;
    if (type === 'timesheet') {
      this.selectedContractor.contractorName = this.allTimesheets.data.find(c => c.timesheetId === id).contractorName;
      this.selectedContractor.contractorId = +this.allTimesheets.data.find(c => c.timesheetId === id).contractorId;
    } else {
      this.selectedContractor.contractorName = this.allTimesheetDrafts.data.find(c => c.timesheetId === id).contractorName;
    }
    this.selectedContractor.timesheetId = id;
    this.dialog.open(warningDialog, {
      autoFocus: true,
      width: '400px',
      disableClose: true
    });
  }

  revertOrDeleteTimesheet() {
    if (this.action === 'revert') {
      this.revertToDraft();
    }
    else if (this.action === 'delete') {
      this.deleteTimesheet();
    }
  }

  revertToDraft() {
    this.spinner.show();
    const request = new RevertTimesheetRequest();
    request.timesheetId = this.selectedContractor.timesheetId;
    request.weekEnding = this.allTimesheets.data[0].weekEnding;
    request.contractorId = this.selectedContractor.contractorId;
    this.dataService.revertTimesheet(request)
      .subscribe((response: IApiResponse) => {
        this.executeGetAllTimesheetsByWeekending();
        this.alertService.success(response.message);
        this.spinner.hide();
      },
      error => {
        this.alertService.error(error);
        this.spinner.hide();
      });
  }

  deleteTimesheet() {
    this.spinner.show();
    this.dataService.deleteTimesheet(this.selectedContractor.timesheetId)
      .subscribe((response: IApiResponse) => {
        this.executeGetAllTimesheetsByWeekending();
        this.alertService.success(response.message);
        this.spinner.hide();
      },
      error => {
        this.alertService.error(error);
        this.spinner.hide();
      });
  }
}
