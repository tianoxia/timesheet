import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, DataService } from 'app/_services';
import { TimesheetResponse, TimesheetRequest, IApiResponse } from 'app/_models';

@Component({
  selector: 'app-view-my-timesheet',
  templateUrl: './view-my-timesheet.component.html',
  styleUrls: ['./view-my-timesheet.component.scss']
})
export class ViewMyTimesheetComponent implements OnInit {
  @Input() timesheetForm: FormGroup;
  @ViewChild('mondayStart', { static: false}) mondayStart: ElementRef;
  timesheetId: number;
  isRejected = false;
  isReleased: string;
  eligibleToRelease: boolean;
  releaseTimesheet = false;
  myTimesheetDetails: TimesheetResponse;
  projectvalue: string;
  floatLabelControl = new FormControl('auto');

  public displayedColumns = ['date', 'day', 'startWork', 'lunchOut',
          'lunchIn', 'endWork', 'totalHours'];
  public dataSource = new MatTableDataSource<TimesheetResponse>();
  
  constructor(public alertService: AlertService,
    fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService) {
      this.timesheetForm = fb.group({
        floatLabel: this.floatLabelControl,
        weekEnding: ['', [Validators.required]],
        projectName: '',
        weeklyTotalHours: '',
        isReleased: false
      });
    }

  ngOnInit() {
    this.timesheetId = this.route.snapshot.queryParams['timesheetid'];
    this.isRejected = this.route.snapshot.queryParams['timesheetstatus'] === 'Rejected';
    this.releaseTimesheet = this.route.snapshot.queryParams['releasetimesheet'] === 'true';
    this.spinner.show();
    this.loadData();
  }

  private loadData() {
    return this.dataService.getTimesheetById(this.timesheetId)
        .subscribe(tsInfo => {
          this.myTimesheetDetails = tsInfo as TimesheetResponse;
          this.timesheetForm.get("weekEnding").patchValue(this.myTimesheetDetails.weekEnding);
          this.timesheetForm.get("projectName").patchValue(this.myTimesheetDetails.projectName);
          this.timesheetForm.controls.isReleased.patchValue(this.myTimesheetDetails.isReleased);
          this.isReleased = this.myTimesheetDetails.isReleased ? 'Yes' : 'No';
          this.eligibleToRelease = this.myTimesheetDetails.timesheetStatus !== 'Pending' && this.myTimesheetDetails.timesheetStatus !== 'Rejected';
          this.timesheetForm.controls.isReleased.valueChanges.subscribe((value) => {
            this.isReleased = value ? 'Yes' : 'No';
          });
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
          this.myTimesheetDetails.sundayStart = value;
          this.myTimesheetDetails.sundayHours = this.getWorkingHours(value,
            this.myTimesheetDetails.sundayLunchOut, this.myTimesheetDetails.sundayLunchIn, this.myTimesheetDetails.sundayEnd);
          this.updateWeeklyHours();
          break;
        case 'mon':
          this.myTimesheetDetails.mondayStart = value;
          this.myTimesheetDetails.mondayHours = this.getWorkingHours(value,
            this.myTimesheetDetails.mondayLunchOut, this.myTimesheetDetails.mondayLunchIn, this.myTimesheetDetails.mondayEnd);
          this.updateWeeklyHours();
          break;
        case 'tues':
          this.myTimesheetDetails.tuesdayStart = value;
          this.myTimesheetDetails.tuesdayHours = this.getWorkingHours(value,
            this.myTimesheetDetails.tuesdayLunchOut, this.myTimesheetDetails.tuesdayLunchIn, this.myTimesheetDetails.tuesdayEnd);
          break;
        case 'wed':
          this.myTimesheetDetails.wednesdayStart = value;
          this.myTimesheetDetails.wednesdayHours = this.getWorkingHours(value,
            this.myTimesheetDetails.wednesdayLunchOut, this.myTimesheetDetails.wednesdayLunchIn, this.myTimesheetDetails.wednesdayEnd);
          this.updateWeeklyHours();  
          break;
        case 'thur':
          this.myTimesheetDetails.thursdayStart = value;
          this.myTimesheetDetails.thursdayHours = this.getWorkingHours(value,
            this.myTimesheetDetails.thursdayLunchOut, this.myTimesheetDetails.thursdayLunchIn, this.myTimesheetDetails.thursdayEnd);
          break;
        case 'fri':
          this.myTimesheetDetails.fridayStart = value;
          this.myTimesheetDetails.fridayHours = this.getWorkingHours(value,
            this.myTimesheetDetails.fridayLunchOut, this.myTimesheetDetails.fridayLunchIn, this.myTimesheetDetails.fridayEnd);
          this.updateWeeklyHours();
          break;
        case 'sat':
          this.myTimesheetDetails.saturdayStart = value;
          this.myTimesheetDetails.saturdayHours = this.getWorkingHours(value,
            this.myTimesheetDetails.saturdayLunchOut, this.myTimesheetDetails.saturdayLunchIn, this.myTimesheetDetails.saturdayEnd);
          this.updateWeeklyHours();
          break;
      }
    }
    setLunchOut(value, day) {
      switch (day) {
        case 'sun':
          this.myTimesheetDetails.sundayLunchOut = value;
          this.myTimesheetDetails.sundayHours = this.getWorkingHours(this.myTimesheetDetails.sundayStart,
            value, this.myTimesheetDetails.sundayLunchIn, this.myTimesheetDetails.sundayEnd);
          break;
        case 'mon':
          this.myTimesheetDetails.mondayLunchOut = value;
          this.myTimesheetDetails.mondayHours = this.getWorkingHours(this.myTimesheetDetails.mondayStart, 
            value, this.myTimesheetDetails.mondayLunchIn, this.myTimesheetDetails.mondayEnd);
            this.updateWeeklyHours();
            break;
        case 'tues':
          this.myTimesheetDetails.tuesdayLunchOut = value;
          this.myTimesheetDetails.tuesdayHours = this.getWorkingHours(this.myTimesheetDetails.tuesdayStart, 
            value, this.myTimesheetDetails.tuesdayLunchIn, this.myTimesheetDetails.tuesdayEnd);
            this.updateWeeklyHours();
            break;
        case 'wed':
          this.myTimesheetDetails.wednesdayLunchOut = value;
          this.myTimesheetDetails.wednesdayHours = this.getWorkingHours(this.myTimesheetDetails.wednesdayStart,
            value, this.myTimesheetDetails.wednesdayLunchIn, this.myTimesheetDetails.wednesdayEnd);
            this.updateWeeklyHours();
            break;
        case 'thur':
          this.myTimesheetDetails.thursdayLunchOut = value;
          this.myTimesheetDetails.thursdayHours = this.getWorkingHours(this.myTimesheetDetails.thursdayStart, 
            value, this.myTimesheetDetails.thursdayLunchIn, this.myTimesheetDetails.thursdayEnd);
            this.updateWeeklyHours();
            break;
        case 'fri':
          this.myTimesheetDetails.fridayLunchOut = value;
          this.myTimesheetDetails.fridayHours = this.getWorkingHours(this.myTimesheetDetails.fridayStart, 
            value, this.myTimesheetDetails.fridayLunchIn, this.myTimesheetDetails.fridayEnd);
            this.updateWeeklyHours();
            break;
        case 'sat':
          this.myTimesheetDetails.saturdayLunchOut = value;
          this.myTimesheetDetails.saturdayHours = this.getWorkingHours(this.myTimesheetDetails.saturdayStart, 
            value, this.myTimesheetDetails.saturdayLunchIn, this.myTimesheetDetails.saturdayEnd);
            this.updateWeeklyHours();
            break;
      }
    }

    setLunchIn(value, day) {  
      switch (day) {
        case 'sun':
          this.myTimesheetDetails.sundayLunchIn = value;
          this.myTimesheetDetails.sundayHours = this.getWorkingHours(this.myTimesheetDetails.sundayStart,
            this.myTimesheetDetails.sundayLunchOut, value, this.myTimesheetDetails.sundayEnd);
            this.updateWeeklyHours();
            break;
        case 'mon':
          this.myTimesheetDetails.mondayLunchIn = value;
          this.myTimesheetDetails.mondayHours = this.getWorkingHours(this.myTimesheetDetails.mondayStart, 
            this.myTimesheetDetails.mondayLunchOut, value, this.myTimesheetDetails.mondayEnd);
            this.updateWeeklyHours();
            break;
        case 'tues':
          this.myTimesheetDetails.tuesdayLunchIn = value;
          this.myTimesheetDetails.tuesdayHours = this.getWorkingHours(this.myTimesheetDetails.tuesdayStart, 
            this.myTimesheetDetails.tuesdayLunchOut, value, this.myTimesheetDetails.tuesdayEnd);
            this.updateWeeklyHours();
            break;
        case 'wed':
          this.myTimesheetDetails.wednesdayLunchIn = value;
          this.myTimesheetDetails.wednesdayHours = this.getWorkingHours(this.myTimesheetDetails.wednesdayStart,
            this.myTimesheetDetails.wednesdayLunchOut, value, this.myTimesheetDetails.wednesdayEnd);
          this.updateWeeklyHours();
          break;
        case 'thur':
          this.myTimesheetDetails.thursdayLunchIn = value;
          this.myTimesheetDetails.thursdayHours = this.getWorkingHours(this.myTimesheetDetails.thursdayStart, 
            this.myTimesheetDetails.thursdayLunchOut, value, this.myTimesheetDetails.thursdayEnd);
          this.updateWeeklyHours();
          break;
        case 'fri':
          this.myTimesheetDetails.fridayLunchIn = value;
          this.myTimesheetDetails.fridayHours = this.getWorkingHours(this.myTimesheetDetails.fridayStart, 
            this.myTimesheetDetails.fridayLunchOut, value, this.myTimesheetDetails.fridayEnd);
          this.updateWeeklyHours();
          break;
        case 'sat':
          this.myTimesheetDetails.saturdayLunchIn = value;
          this.myTimesheetDetails.saturdayHours = this.getWorkingHours(this.myTimesheetDetails.saturdayStart, 
            this.myTimesheetDetails.saturdayLunchOut, value, this.myTimesheetDetails.saturdayEnd);
          this.updateWeeklyHours();
          break;
      }
    }

    setEnd(value, day) {  
      switch (day) {
        case 'sun':
          this.myTimesheetDetails.sundayEnd = value;
          this.myTimesheetDetails.sundayHours = this.getWorkingHours(this.myTimesheetDetails.sundayStart,
            this.myTimesheetDetails.sundayLunchOut, this.myTimesheetDetails.sundayLunchIn, value);
          this.updateWeeklyHours();
          break;
        case 'mon':
          this.myTimesheetDetails.mondayEnd = value;
          this.myTimesheetDetails.mondayHours = this.getWorkingHours(this.myTimesheetDetails.mondayStart, 
            this.myTimesheetDetails.mondayLunchOut, this.myTimesheetDetails.mondayLunchIn, value);
          this.updateWeeklyHours();
          break;
        case 'tues':
          this.myTimesheetDetails.tuesdayEnd = value;
          this.myTimesheetDetails.tuesdayHours = this.getWorkingHours(this.myTimesheetDetails.tuesdayStart, 
            this.myTimesheetDetails.tuesdayLunchOut, this.myTimesheetDetails.tuesdayLunchIn, value);
          this.updateWeeklyHours();
          break;
        case 'wed':
          this.myTimesheetDetails.wednesdayEnd = value;
          this.myTimesheetDetails.wednesdayHours = this.getWorkingHours(this.myTimesheetDetails.wednesdayStart,
            this.myTimesheetDetails.wednesdayLunchOut, this.myTimesheetDetails.wednesdayLunchIn, value);
          this.updateWeeklyHours();
          break;
        case 'thur':
          this.myTimesheetDetails.thursdayEnd = value;
          this.myTimesheetDetails.thursdayHours = this.getWorkingHours(this.myTimesheetDetails.thursdayStart, 
            this.myTimesheetDetails.thursdayLunchOut, this.myTimesheetDetails.thursdayLunchIn, value);
          this.updateWeeklyHours();
          break;
        case 'fri':
          this.myTimesheetDetails.fridayEnd = value;
          this.myTimesheetDetails.fridayHours = this.getWorkingHours(this.myTimesheetDetails.fridayStart, 
            this.myTimesheetDetails.fridayLunchOut, this.myTimesheetDetails.fridayLunchIn, value);
          this.updateWeeklyHours();
          break;
        case 'sat':
          this.myTimesheetDetails.saturdayEnd = value;
          this.myTimesheetDetails.saturdayHours = this.getWorkingHours(this.myTimesheetDetails.saturdayStart, 
            this.myTimesheetDetails.saturdayLunchOut, this.myTimesheetDetails.saturdayLunchIn, value);
          this.updateWeeklyHours();
          break;
      }
    }

    private updateWeeklyHours(): void {
      this.myTimesheetDetails.weeklyTotalHours = this.myTimesheetDetails.sundayHours + this.myTimesheetDetails.mondayHours
      + this.myTimesheetDetails.tuesdayHours + this.myTimesheetDetails.wednesdayHours + this.myTimesheetDetails.thursdayHours
      + this.myTimesheetDetails.fridayHours + this.myTimesheetDetails.saturdayHours;
      if (this.myTimesheetDetails.weeklyTotalHours === 0) {
        this.timesheetForm.controls.weeklyTotalHours.setErrors({lessThanMin: true});
      } else {
        this.timesheetForm.controls.weeklyTotalHours.setErrors(null);
      }
    }
  public submitTimesheet = () => {
    if (this.timesheetForm.valid) {
      this.spinner.show();
      if (this.releaseTimesheet) {
        this.executeReleaseTimesheet();
      } else {
        this.executeUpdateTimesheet();
      }
    }
  }

  private executeReleaseTimesheet = () => {
    const request = this.setTimesheetRequest() as TimesheetRequest;
      this.dataService.releaseTimesheet(request)
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
  }

  private executeUpdateTimesheet = () => {
    const request = this.setTimesheetRequest() as TimesheetRequest;
      this.dataService.updateTimesheet(request)
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
  }

  private setTimesheetRequest(): TimesheetRequest  {
      const request = new TimesheetRequest();
      request.timesheetId = this.myTimesheetDetails.timesheetId;
      request.assignmentId = this.myTimesheetDetails.assignmentId;
      request.contractorName = this.myTimesheetDetails.contractorName;
      request.contractorId = this.myTimesheetDetails.contractorId;
      request.weekEnding = this.timesheetForm.controls.weekEnding.value;
      request.projectName = this.timesheetForm.controls.projectName.value;
      request.mondayDate = this.myTimesheetDetails.mondayDate;
      request.tuesdayDate = this.myTimesheetDetails.tuesdayDate;
      request.wednesdayDate = this.myTimesheetDetails.wednesdayDate;
      request.thursdayDate = this.myTimesheetDetails.thursdayDate;
      request.fridayDate = this.myTimesheetDetails.fridayDate;
      request.saturdayDate = this.myTimesheetDetails.saturdayDate;
      request.sundayDate = this.myTimesheetDetails.sundayDate;
      request.mondayStart = this.myTimesheetDetails.mondayStart;
      request.mondayLunchOut = this.myTimesheetDetails.mondayLunchOut;
      request.mondayLunchIn = this.myTimesheetDetails.mondayLunchIn;
      request.mondayEnd = this.myTimesheetDetails.mondayEnd;
      request.mondayHours = this.myTimesheetDetails.mondayHours;
      request.tuesdayStart = this.myTimesheetDetails.tuesdayStart;
      request.tuesdayLunchOut = this.myTimesheetDetails.tuesdayLunchOut;
      request.tuesdayLunchIn = this.myTimesheetDetails.tuesdayLunchIn;
      request.tuesdayEnd = this.myTimesheetDetails.tuesdayEnd;
      request.tuesdayHours = this.myTimesheetDetails.tuesdayHours;
      request.wednesdayStart = this.myTimesheetDetails.wednesdayStart;
      request.wednesdayLunchOut = this.myTimesheetDetails.wednesdayLunchOut;
      request.wednesdayLunchIn = this.myTimesheetDetails.wednesdayLunchIn;
      request.wednesdayEnd = this.myTimesheetDetails.wednesdayEnd;
      request.wednesdayHours = this.myTimesheetDetails.wednesdayHours;
      request.thursdayStart = this.myTimesheetDetails.thursdayStart;
      request.thursdayLunchOut = this.myTimesheetDetails.thursdayLunchOut;
      request.thursdayLunchIn = this.myTimesheetDetails.thursdayLunchIn;
      request.thursdayEnd = this.myTimesheetDetails.thursdayEnd;
      request.thursdayHours = this.myTimesheetDetails.thursdayHours;
      request.fridayStart = this.myTimesheetDetails.fridayStart;
      request.fridayLunchOut = this.myTimesheetDetails.fridayLunchOut;
      request.fridayLunchIn = this.myTimesheetDetails.fridayLunchIn;
      request.fridayEnd = this.myTimesheetDetails.fridayEnd;
      request.fridayHours = this.myTimesheetDetails.fridayHours;
      request.saturdayStart = this.myTimesheetDetails.saturdayStart;
      request.saturdayLunchOut = this.myTimesheetDetails.saturdayLunchOut;
      request.saturdayLunchIn = this.myTimesheetDetails.saturdayLunchIn;
      request.saturdayEnd = this.myTimesheetDetails.saturdayEnd;
      request.saturdayHours = this.myTimesheetDetails.saturdayHours;
      request.sundayStart = this.myTimesheetDetails.sundayStart;
      request.sundayLunchOut = this.myTimesheetDetails.sundayLunchOut;
      request.sundayLunchIn = this.myTimesheetDetails.sundayLunchIn;
      request.sundayEnd = this.myTimesheetDetails.sundayEnd;
      request.sundayHours = this.myTimesheetDetails.sundayHours;
      request.isDraft = false;
      request.isReleased = this.timesheetForm.controls.isReleased.value;
      return request;
  }

  private getWorkingHours(start, lunchout, lunchin, end): number {
    let sum = 0;
    if (!this.isInitialized(start, lunchout, lunchin, end))
    {
      const endtime  = new Date('01/01/2014' + " " + end) as any;
      const starttime = new Date('01/01/2014' + " " + start) as any;
      const lunchouttime = new Date('01/01/2014' + " " + lunchout) as any;
      const lunchintime = new Date('01/01/2014'+" "+lunchin) as any;
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
          this.timesheetForm.controls.weekEnding.setErrors(null);
          this.myTimesheetDetails.weekEnding = this.myTimesheetDetails.saturdayDate = new Date(event.value);
          this.myTimesheetDetails.mondayDate = new Date(event.value);
          this.myTimesheetDetails.mondayDate.setDate(this.myTimesheetDetails.mondayDate.getDate() - 5);
          this.myTimesheetDetails.tuesdayDate = new Date(event.value);
          this.myTimesheetDetails.tuesdayDate.setDate(this.myTimesheetDetails.tuesdayDate.getDate() - 4);
          this.myTimesheetDetails.wednesdayDate = new Date(event.value);
          this.myTimesheetDetails.wednesdayDate.setDate(this.myTimesheetDetails.wednesdayDate.getDate() - 3);
          this.myTimesheetDetails.thursdayDate = new Date(event.value);
          this.myTimesheetDetails.thursdayDate.setDate(this.myTimesheetDetails.thursdayDate.getDate() - 2);
          this.myTimesheetDetails.fridayDate = new Date(event.value);
          this.myTimesheetDetails.fridayDate.setDate(this.myTimesheetDetails.fridayDate.getDate() - 1);
          this.myTimesheetDetails.sundayDate = new Date(event.value);
          this.myTimesheetDetails.sundayDate.setDate(this.myTimesheetDetails.sundayDate.getDate() - 6);
        } else {
          this.timesheetForm.controls.weekEnding.setErrors({notSaturday: true});
        }
        let oneWeekLater: Date = new Date();
        const sevenDays=new Date().getDate()+7;
        if (this.myTimesheetDetails.saturdayDate>new Date(oneWeekLater.setDate(sevenDays))) {
          this.timesheetForm.controls.weekEnding.setErrors({exceedAllowedDateRange: true});
          return false;
        }
        this.spinner.show();
        this.dataService.timesheetExists(this.myTimesheetDetails.assignmentId, this.datePipe.transform(this.myTimesheetDetails.weekEnding, 'yyyy-MM-dd'))
        .subscribe((response: boolean) => {
          if (response) {
            this.timesheetForm.controls.weekEnding.setErrors({timesheetExists: true});
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
    return this.timesheetForm.controls[controlName].hasError;
  }

  getWeekEndingErrorMessage() {
    if (this.timesheetForm.get('weekEnding').hasError('required')) {
      return 'You must enter a week ending date';
    } else if (this.timesheetForm.get('weekEnding').hasError('exceedAllowedDateRange')) {
      return 'Please enter a Week Ending Date within the next 7 days.';
    } else if (this.timesheetForm.get('weekEnding').hasError('timesheetExists')) {
      return 'You already Submitted Timesheet for this Week Ending.';
    }
    return  this.timesheetForm.get('weekEnding').hasError('notSaturday') ? 'Week ending date must be a Saturday date' : '';
  }

  getWeeklyHoursErrorMessage() {
    if (this.timesheetForm.controls.weeklyTotalHours.hasError('lessThanMin')) {
      return 'Weekly hours must be greater than 0';
    }
  }

  openWarningDialog(warningDialog) {
    if (this.myTimesheetDetails.weeklyTotalHours === 0) {
      this.timesheetForm.controls.weeklyTotalHours.setErrors({lessThanMin: true});
      return;
    }
    this.dialog.open(warningDialog, {
      autoFocus: true,
      width: '400px',
      disableClose: true
    });
    return false;
  }

  navigateToPreviousPage() {
    if (this.releaseTimesheet) {
      this.router.navigate(['release-timesheets'], { queryParams: {type:'timesheet'} });
    } else {
      this.router.navigate(['view-my-timesheets'], { queryParams: {type:'timesheet'} });
    }
  }
}
