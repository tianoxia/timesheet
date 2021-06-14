import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, DataService } from 'app/_services';
import { TimesheetTitleResponse, TimesheetRequest, IApiResponse } from 'app/_models';

@Component({
  selector: 'app-view-my-draft',
  templateUrl: './add-my-draft.component.html',
  styleUrls: ['./add-my-draft.component.scss']
})
export class AddMyDraftComponent implements OnInit {
  @Input() draftForm: FormGroup;
  timesheetId: number;
  timesheetTitle: TimesheetTitleResponse;
  myDraftDetails: TimesheetRequest;
  projectvalue: string;
  contractorId: number;
  floatLabelControl = new FormControl('auto');

  public displayedColumns = ['date', 'day', 'startWork', 'lunchOut',
          'lunchIn', 'endWork', 'totalHours'];
  public dataSource = new MatTableDataSource<TimesheetRequest>();
  
  constructor(public alertService: AlertService,
    fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService) {
      this.draftForm = fb.group({
        floatLabel: this.floatLabelControl,
        weekEnding: ['', [Validators.required]],
        projectName: '',
        weeklyTotalHours: ['']
      });
      this.myDraftDetails = new TimesheetRequest();
      this.myDraftDetails.mondayStart = '12:00 am';
      this.myDraftDetails.mondayLunchOut = '12:00 am';
      this.myDraftDetails.mondayLunchIn = '12:00 am';
      this.myDraftDetails.mondayEnd = '12:00 am';
      this.myDraftDetails.mondayHours = 0.00;
      this.myDraftDetails.tuesdayStart = '12:00 am';
      this.myDraftDetails.tuesdayLunchOut = '12:00 am';
      this.myDraftDetails.tuesdayLunchIn = '12:00 am';
      this.myDraftDetails.tuesdayEnd = '12:00 am';
      this.myDraftDetails.tuesdayHours = 0.00;
      this.myDraftDetails.wednesdayStart = '12:00 am';
      this.myDraftDetails.wednesdayLunchOut = '12:00 am';
      this.myDraftDetails.wednesdayLunchIn = '12:00 am';
      this.myDraftDetails.wednesdayEnd = '12:00 am';
      this.myDraftDetails.wednesdayHours = 0.00;
      this.myDraftDetails.thursdayStart = '12:00 am';
      this.myDraftDetails.thursdayLunchOut = '12:00 am';
      this.myDraftDetails.thursdayLunchIn = '12:00 am';
      this.myDraftDetails.thursdayEnd = '12:00 am';
      this.myDraftDetails.thursdayHours = 0.00;
      this.myDraftDetails.fridayStart = '12:00 am';
      this.myDraftDetails.fridayLunchOut = '12:00 am';
      this.myDraftDetails.fridayLunchIn = '12:00 am';
      this.myDraftDetails.fridayEnd = '12:00 am';
      this.myDraftDetails.fridayHours = 0.00;
      this.myDraftDetails.saturdayStart = '12:00 am';
      this.myDraftDetails.saturdayLunchOut = '12:00 am';
      this.myDraftDetails.saturdayLunchIn = '12:00 am';
      this.myDraftDetails.saturdayEnd = '12:00 am';
      this.myDraftDetails.saturdayHours = 0.00
      this.myDraftDetails.sundayStart = '12:00 am';
      this.myDraftDetails.sundayLunchOut = '12:00 am';
      this.myDraftDetails.sundayLunchIn = '12:00 am';
      this.myDraftDetails.sundayEnd = '12:00 am';
      this.myDraftDetails.sundayHours = 0.00;
      this.myDraftDetails.weeklyTotalHours = 0.00;
    }

  ngOnInit() {
    this.contractorId = this.route.snapshot.queryParams['contractorid'];
    this.spinner.show();
    this.loadData();
  }  

  private loadData() {
    return this.dataService.getTimesheetTitleInfo(this.contractorId)
        .subscribe(tsTitleInfo => {
          this.timesheetTitle = tsTitleInfo[0] as TimesheetTitleResponse;
          this.myDraftDetails.contractorName = this.timesheetTitle.firstName + ' ' + this.timesheetTitle.lastName;
          window.scrollTo(0, 0);
          this.spinner.hide();
        },
        error => {
          this.alertService.error(error);
          this.spinner.hide();
        });
    }
  
    setStart(value, day) {  
      switch (day) {
        case 'sun':
          this.myDraftDetails.sundayStart = value;
          this.myDraftDetails.sundayHours = this.getWorkingHours(value,
            this.myDraftDetails.sundayLunchOut, this.myDraftDetails.sundayLunchIn, this.myDraftDetails.sundayEnd);
          this.updateWeeklyHours();
          break;
        case 'mon':
          this.myDraftDetails.mondayStart = value;
          this.myDraftDetails.mondayHours = this.getWorkingHours(value,
            this.myDraftDetails.mondayLunchOut, this.myDraftDetails.mondayLunchIn, this.myDraftDetails.mondayEnd);
          this.updateWeeklyHours();
          break;
        case 'tues':
          this.myDraftDetails.tuesdayStart = value;
          this.myDraftDetails.tuesdayHours = this.getWorkingHours(value,
            this.myDraftDetails.tuesdayLunchOut, this.myDraftDetails.tuesdayLunchIn, this.myDraftDetails.tuesdayEnd);
          break;
        case 'wed':
          this.myDraftDetails.wednesdayStart = value;
          this.myDraftDetails.wednesdayHours = this.getWorkingHours(value,
            this.myDraftDetails.wednesdayLunchOut, this.myDraftDetails.wednesdayLunchIn, this.myDraftDetails.wednesdayEnd);
          this.updateWeeklyHours();  
          break;
        case 'thur':
          this.myDraftDetails.thursdayStart = value;
          this.myDraftDetails.thursdayHours = this.getWorkingHours(value,
            this.myDraftDetails.thursdayLunchOut, this.myDraftDetails.thursdayLunchIn, this.myDraftDetails.thursdayEnd);
          break;
        case 'fri':
          this.myDraftDetails.fridayStart = value;
          this.myDraftDetails.fridayHours = this.getWorkingHours(value,
            this.myDraftDetails.fridayLunchOut, this.myDraftDetails.fridayLunchIn, this.myDraftDetails.fridayEnd);
          this.updateWeeklyHours();
          break;
        case 'sat':
          this.myDraftDetails.saturdayStart = value;
          this.myDraftDetails.saturdayHours = this.getWorkingHours(value,
            this.myDraftDetails.saturdayLunchOut, this.myDraftDetails.saturdayLunchIn, this.myDraftDetails.saturdayEnd);
          this.updateWeeklyHours();
          break;
      }
    }
    setLunchOut(value, day) {
      switch (day) {
        case 'sun':
          this.myDraftDetails.sundayLunchOut = value;
          this.myDraftDetails.sundayHours = this.getWorkingHours(this.myDraftDetails.sundayStart,
            value, this.myDraftDetails.sundayLunchIn, this.myDraftDetails.sundayEnd);
          break;
        case 'mon':
          this.myDraftDetails.mondayLunchOut = value;
          this.myDraftDetails.mondayHours = this.getWorkingHours(this.myDraftDetails.mondayStart, 
            value, this.myDraftDetails.mondayLunchIn, this.myDraftDetails.mondayEnd);
            this.updateWeeklyHours();
            break;
        case 'tues':
          this.myDraftDetails.tuesdayLunchOut = value;
          this.myDraftDetails.tuesdayHours = this.getWorkingHours(this.myDraftDetails.tuesdayStart, 
            value, this.myDraftDetails.tuesdayLunchIn, this.myDraftDetails.tuesdayEnd);
            this.updateWeeklyHours();
            break;
        case 'wed':
          this.myDraftDetails.wednesdayLunchOut = value;
          this.myDraftDetails.wednesdayHours = this.getWorkingHours(this.myDraftDetails.wednesdayStart,
            value, this.myDraftDetails.wednesdayLunchIn, this.myDraftDetails.wednesdayEnd);
            this.updateWeeklyHours();
            break;
        case 'thur':
          this.myDraftDetails.thursdayLunchOut = value;
          this.myDraftDetails.thursdayHours = this.getWorkingHours(this.myDraftDetails.thursdayStart, 
            value, this.myDraftDetails.thursdayLunchIn, this.myDraftDetails.thursdayEnd);
            this.updateWeeklyHours();
            break;
        case 'fri':
          this.myDraftDetails.fridayLunchOut = value;
          this.myDraftDetails.fridayHours = this.getWorkingHours(this.myDraftDetails.fridayStart, 
            value, this.myDraftDetails.fridayLunchIn, this.myDraftDetails.fridayEnd);
            this.updateWeeklyHours();
            break;
        case 'sat':
          this.myDraftDetails.saturdayLunchOut = value;
          this.myDraftDetails.saturdayHours = this.getWorkingHours(this.myDraftDetails.saturdayStart, 
            value, this.myDraftDetails.saturdayLunchIn, this.myDraftDetails.saturdayEnd);
            this.updateWeeklyHours();
            break;
      }
    }

    setLunchIn(value, day) {  
      switch (day) {
        case 'sun':
          this.myDraftDetails.sundayLunchIn = value;
          this.myDraftDetails.sundayHours = this.getWorkingHours(this.myDraftDetails.sundayStart,
            this.myDraftDetails.sundayLunchOut, value, this.myDraftDetails.sundayEnd);
            this.updateWeeklyHours();
            break;
        case 'mon':
          this.myDraftDetails.mondayLunchIn = value;
          this.myDraftDetails.mondayHours = this.getWorkingHours(this.myDraftDetails.mondayStart, 
            this.myDraftDetails.mondayLunchOut, value, this.myDraftDetails.mondayEnd);
            this.updateWeeklyHours();
            break;
        case 'tues':
          this.myDraftDetails.tuesdayLunchIn = value;
          this.myDraftDetails.tuesdayHours = this.getWorkingHours(this.myDraftDetails.tuesdayStart, 
            this.myDraftDetails.tuesdayLunchOut, value, this.myDraftDetails.tuesdayEnd);
            this.updateWeeklyHours();
            break;
        case 'wed':
          this.myDraftDetails.wednesdayLunchIn = value;
          this.myDraftDetails.wednesdayHours = this.getWorkingHours(this.myDraftDetails.wednesdayStart,
            this.myDraftDetails.wednesdayLunchOut, value, this.myDraftDetails.wednesdayEnd);
          this.updateWeeklyHours();
          break;
        case 'thur':
          this.myDraftDetails.thursdayLunchIn = value;
          this.myDraftDetails.thursdayHours = this.getWorkingHours(this.myDraftDetails.thursdayStart, 
            this.myDraftDetails.thursdayLunchOut, value, this.myDraftDetails.thursdayEnd);
          this.updateWeeklyHours();
          break;
        case 'fri':
          this.myDraftDetails.fridayLunchIn = value;
          this.myDraftDetails.fridayHours = this.getWorkingHours(this.myDraftDetails.fridayStart, 
            this.myDraftDetails.fridayLunchOut, value, this.myDraftDetails.fridayEnd);
          this.updateWeeklyHours();
          break;
        case 'sat':
          this.myDraftDetails.saturdayLunchIn = value;
          this.myDraftDetails.saturdayHours = this.getWorkingHours(this.myDraftDetails.saturdayStart, 
            this.myDraftDetails.saturdayLunchOut, value, this.myDraftDetails.saturdayEnd);
          this.updateWeeklyHours();
          break;
      }
    }

    setEnd(value, day) {  
      switch (day) {
        case 'sun':
          this.myDraftDetails.sundayEnd = value;
          this.myDraftDetails.sundayHours = this.getWorkingHours(this.myDraftDetails.sundayStart,
            this.myDraftDetails.sundayLunchOut, this.myDraftDetails.sundayLunchIn, value);
          this.updateWeeklyHours();
          break;
        case 'mon':
          this.myDraftDetails.mondayEnd = value;
          this.myDraftDetails.mondayHours = this.getWorkingHours(this.myDraftDetails.mondayStart, 
            this.myDraftDetails.mondayLunchOut, this.myDraftDetails.mondayLunchIn, value);
          this.updateWeeklyHours();
          break;
        case 'tues':
          this.myDraftDetails.tuesdayEnd = value;
          this.myDraftDetails.tuesdayHours = this.getWorkingHours(this.myDraftDetails.tuesdayStart, 
            this.myDraftDetails.tuesdayLunchOut, this.myDraftDetails.tuesdayLunchIn, value);
          this.updateWeeklyHours();
          break;
        case 'wed':
          this.myDraftDetails.wednesdayEnd = value;
          this.myDraftDetails.wednesdayHours = this.getWorkingHours(this.myDraftDetails.wednesdayStart,
            this.myDraftDetails.wednesdayLunchOut, this.myDraftDetails.wednesdayLunchIn, value);
          this.updateWeeklyHours();
          break;
        case 'thur':
          this.myDraftDetails.thursdayEnd = value;
          this.myDraftDetails.thursdayHours = this.getWorkingHours(this.myDraftDetails.thursdayStart, 
            this.myDraftDetails.thursdayLunchOut, this.myDraftDetails.thursdayLunchIn, value);
          this.updateWeeklyHours();
          break;
        case 'fri':
          this.myDraftDetails.fridayEnd = value;
          this.myDraftDetails.fridayHours = this.getWorkingHours(this.myDraftDetails.fridayStart, 
            this.myDraftDetails.fridayLunchOut, this.myDraftDetails.fridayLunchIn, value);
          this.updateWeeklyHours();
          break;
        case 'sat':
          this.myDraftDetails.saturdayEnd = value;
          this.myDraftDetails.saturdayHours = this.getWorkingHours(this.myDraftDetails.saturdayStart, 
            this.myDraftDetails.saturdayLunchOut, this.myDraftDetails.saturdayLunchIn, value);
          this.updateWeeklyHours();
          break;
      }
    }

    private updateWeeklyHours(): void {
      this.myDraftDetails.weeklyTotalHours = this.myDraftDetails.sundayHours + this.myDraftDetails.mondayHours
      + this.myDraftDetails.tuesdayHours + this.myDraftDetails.wednesdayHours + this.myDraftDetails.thursdayHours
      + this.myDraftDetails.fridayHours + this.myDraftDetails.saturdayHours;
      if (this.myDraftDetails.weeklyTotalHours === 0) {
        this.draftForm.controls.weeklyTotalHours.setErrors({lessThanMin: true});
      } else {
        this.draftForm.controls.weeklyTotalHours.setErrors(null);
      }
    }
  public submitDraft = (draftFormValue) => {
    if (this.myDraftDetails.weeklyTotalHours === 0) {
      this.draftForm.controls.weeklyTotalHours.setErrors({lessThanMin: true});
      return;
    }
    const details = this.myDraftDetails;
    details.isDraft = true;
    details.assignmentId = this.timesheetTitle.assignmentId;
    details.contractorId = this.timesheetTitle.contractorId;
    details.weekEnding = draftFormValue.weekEnding;
    details.projectName = draftFormValue.projectName;
    if (this.draftForm.valid) {
      this.spinner.show();
      this.executeCreateTimesheetDraft(details);
    }
  };

  private executeCreateTimesheetDraft = (details) => {
    this.dataService.createTimesheetDraft(details)
        .pipe(first())
        .subscribe((response: IApiResponse) => {
          this.alertService.success(response.message);
          window.scrollTo(0, 0);
          this.spinner.hide();
        },
        error => {
          window.scrollTo(0, 0);
          this.alertService.error(error);
          this.spinner.hide();
        });
  };

submitTimesheet(draftFormValue) {
  this.spinner.show();
  const request = this.myDraftDetails;
  request.isDraft = false;
  request.assignmentId = this.timesheetTitle.assignmentId;
  request.contractorId = this.timesheetTitle.contractorId;
  request.weekEnding = draftFormValue.weekEnding;
  request.projectName = draftFormValue.projectName;
  this.dataService.createTimesheet(request)
  .pipe(first())
  .subscribe((response: IApiResponse) => {
    this.alertService.success(response.message);
    window.scrollTo(0, 0);
    this.spinner.hide();
  },
  error => {
    window.scrollTo(0, 0);
    this.alertService.error(error);
    this.spinner.hide();
  });  
  return false;
}
  private getWorkingHours(start, lunchout, lunchin, end): number {
    let sum = 0;
    if (!this.isInitialized(start, lunchout, lunchin, end))
    {
      const endtime  = new Date('01/01/2014' + " " + end) as any;
      const starttime = new Date('01/01/2014' + " " + start) as any;
      const lunchouttime = new Date('01/01/2014' + " " + lunchout) as any;
      const lunchintime = new Date('01/01/2014' + " " + lunchin) as any;
      if (endtime > starttime)
        sum = Math.abs(endtime - starttime + (lunchouttime - lunchintime))/3600000 as number;
      else if (endtime < starttime)
        sum = 24-Math.abs(endtime - starttime + (lunchouttime - lunchintime))/3600000 as number;
    }
    return Math.round(sum*100)/100; //round to 2 decimal places
  }

  private isInitialized(start, lunchout, lunchin, end): boolean {
    return (start == "00:00 AM" && lunchout == "00:00 AM" && lunchin == "00:00 AM" && end == "00:00 AM"); 
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event.value.getDay() === 6) {
      this.draftForm.controls.weekEnding.setErrors(null);
      this.myDraftDetails.weekEnding = this.myDraftDetails.saturdayDate = new Date(event.value);
      this.myDraftDetails.mondayDate = new Date(event.value);
      this.myDraftDetails.mondayDate.setDate(this.myDraftDetails.mondayDate.getDate() - 5);
      this.myDraftDetails.tuesdayDate = new Date(event.value);
      this.myDraftDetails.tuesdayDate.setDate(this.myDraftDetails.tuesdayDate.getDate() - 4);
      this.myDraftDetails.wednesdayDate = new Date(event.value);
      this.myDraftDetails.wednesdayDate.setDate(this.myDraftDetails.wednesdayDate.getDate() - 3);
      this.myDraftDetails.thursdayDate = new Date(event.value);
      this.myDraftDetails.thursdayDate.setDate(this.myDraftDetails.thursdayDate.getDate() - 2);
      this.myDraftDetails.fridayDate = new Date(event.value);
      this.myDraftDetails.fridayDate.setDate(this.myDraftDetails.fridayDate.getDate() - 1);
      this.myDraftDetails.sundayDate = new Date(event.value);
      this.myDraftDetails.sundayDate.setDate(this.myDraftDetails.sundayDate.getDate() - 6);
    } else {
      this.draftForm.controls.weekEnding.setErrors({notSaturday: true});
      return false;
    }
    let oneWeekLater: Date = new Date();
    const sevenDays=new Date().getDate()+7;
    if (this.myDraftDetails.saturdayDate>new Date(oneWeekLater.setDate(sevenDays))) {
      this.draftForm.controls.weekEnding.setErrors({exceedAllowedDateRange: true});
      return false;
    }
    this.spinner.show();
    this.dataService.timesheetExists(this.timesheetTitle.assignmentId, this.datePipe.transform(this.myDraftDetails.weekEnding, 'yyyy-MM-dd'))
    .subscribe((response: boolean) => {
      if (response) {
        this.draftForm.controls.weekEnding.setErrors({timesheetExists: true});
      }
      this.spinner.hide();
    },
    error => {
      window.scrollTo(0, 0);
      this.alertService.error(error);
      this.spinner.hide();
    });
    return false;
  }

  public hasError = (controlName: string) => {
    return this.draftForm.controls[controlName].hasError;
  }

  getWeekEndingErrorMessage() {
    if (this.draftForm.get('weekEnding').hasError('required')) {
      return 'You must enter a week ending date';
    } else if (this.draftForm.get('weekEnding').hasError('exceedAllowedDateRange')) {
      return 'Please enter a Week Ending Date within the next 7 days.';
    } else if (this.draftForm.get('weekEnding').hasError('timesheetExists')) {
      return 'You already Submitted Timesheet for this Week Ending.';
    }
    return  this.draftForm.get('weekEnding').hasError('notSaturday') ? 'Week ending date must be a Saturday date' : '';
  }

  getWeeklyHoursErrorMessage() {
    if (this.draftForm.controls.weeklyTotalHours.hasError('lessThanMin')) {
      return 'Weekly hours must be greater than 0';
    }    
  }

  openWarningDialog(warningDialog) {
    if (this.myDraftDetails.weeklyTotalHours === 0) {
      this.draftForm.controls.weeklyTotalHours.setErrors({lessThanMin: true});
      return;
    }
    this.dialog.open(warningDialog, {
      autoFocus: true,
      width: '400px',
      disableClose: true
    });
    return false;
  }
}
