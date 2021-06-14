import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FileUploadValidators } from '@iplab/ngx-file-upload';

import { AlertService, DataService } from 'app/_services';
import { TimesheetTitleResponse, ExpenseRequest, IApiResponse } from 'app/_models';

@Component({
  selector: 'app-view-my-expense',
  templateUrl: './add-my-expense.component.html',
  styleUrls: ['./add-my-expense.component.scss']
})
export class AddMyExpenseComponent implements OnInit {
  @Input() expenseForm: FormGroup;
  expenseId: number;
  mileageRate: number;
  timesheetTitle: TimesheetTitleResponse;
  myExpenseDetails: ExpenseRequest;
  projectvalue: string = '';
  contractorId: number;
  floatLabelControl = new FormControl('auto');
  private filesControl = new FormControl(null, FileUploadValidators.fileSize(10000000));
  constructor(public alertService: AlertService,
    fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService) {
      this.myExpenseDetails = new ExpenseRequest();
      this.myExpenseDetails.mondayHotel = this.myExpenseDetails.mondayTravel = this.myExpenseDetails.mondayMarketing
      = this.myExpenseDetails.mondayMiles = this.myExpenseDetails.mondayMeals = this.myExpenseDetails.mondayPhone
      = this.myExpenseDetails.mondayOther = this.myExpenseDetails.mondayExpenses = this.myExpenseDetails.mondayMileage = 0;
      this.myExpenseDetails.tuesdayHotel = this.myExpenseDetails.tuesdayTravel = this.myExpenseDetails.tuesdayMarketing
      = this.myExpenseDetails.tuesdayMiles = this.myExpenseDetails.tuesdayMeals = this.myExpenseDetails.tuesdayPhone
      = this.myExpenseDetails.tuesdayOther = this.myExpenseDetails.tuesdayExpenses = this.myExpenseDetails.tuesdayMileage = 0;
      this.myExpenseDetails.wednesdayHotel = this.myExpenseDetails.wednesdayTravel = this.myExpenseDetails.wednesdayMarketing
      = this.myExpenseDetails.wednesdayMiles = this.myExpenseDetails.wednesdayMeals = this.myExpenseDetails.wednesdayPhone
      = this.myExpenseDetails.wednesdayOther = this.myExpenseDetails.wednesdayExpenses = this.myExpenseDetails.wednesdayMileage = 0;
      this.myExpenseDetails.thursdayHotel = this.myExpenseDetails.thursdayTravel = this.myExpenseDetails.thursdayMarketing
      = this.myExpenseDetails.thursdayMiles = this.myExpenseDetails.thursdayMeals = this.myExpenseDetails.thursdayPhone
      = this.myExpenseDetails.thursdayOther = this.myExpenseDetails.thursdayExpenses = this.myExpenseDetails.thursdayMileage = 0;
      this.myExpenseDetails.fridayHotel = this.myExpenseDetails.fridayTravel = this.myExpenseDetails.fridayMarketing
      = this.myExpenseDetails.fridayMiles = this.myExpenseDetails.fridayMeals = this.myExpenseDetails.fridayPhone
      = this.myExpenseDetails.fridayOther = this.myExpenseDetails.fridayExpenses = this.myExpenseDetails.fridayMileage = 0;
      this.myExpenseDetails.saturdayHotel = this.myExpenseDetails.saturdayTravel = this.myExpenseDetails.saturdayMarketing
      = this.myExpenseDetails.saturdayMiles = this.myExpenseDetails.saturdayMeals = this.myExpenseDetails.saturdayPhone
      = this.myExpenseDetails.saturdayOther = this.myExpenseDetails.saturdayExpenses = this.myExpenseDetails.saturdayMileage = 0;
      this.myExpenseDetails.sundayHotel = this.myExpenseDetails.sundayTravel = this.myExpenseDetails.sundayMarketing
      = this.myExpenseDetails.sundayMiles = this.myExpenseDetails.sundayMeals = this.myExpenseDetails.sundayPhone
      = this.myExpenseDetails.sundayOther = this.myExpenseDetails.sundayExpenses = this.myExpenseDetails.sundayMileage = 0;
      this.myExpenseDetails.weeklyTotalExpense = 0;
      this.expenseForm = fb.group({
        floatLabel: this.floatLabelControl,
        weekEnding: ['', [Validators.required]],
        projectName: '',
        prepaidExpense: '',
        sundayHotel: '',
        sundayTravel: '',
        sundayMarketing: '',
        sundayMiles: '',
        sundayMileage: '',
        sundayMeals: '',
        sundayPhone: '',
        sundayOther: '',
        mondayHotel: '',
        mondayTravel: '',
        mondayMarketing: '',
        mondayMiles: '',
        mondayMileage: '',
        mondayMeals: '',
        mondayPhone: '',
        mondayOther: '',
        tuesdayHotel: '',
        tuesdayTravel: '',
        tuesdayMarketing: '',
        tuesdayMiles: '',
        tuesdayMileage: '',
        tuesdayMeals: '',
        tuesdayPhone: '',
        tuesdayOther: '',
        wednesdayHotel: '',
        wednesdayTravel: '',
        wednesdayMarketing: '',
        wednesdayMiles: '',
        wednesdayMileage: '',
        wednesdayMeals: '',
        wednesdayPhone: '',
        wednesdayOther: '',
        thursdayHotel: '',
        thursdayTravel: '',
        thursdayMarketing: '',
        thursdayMiles: '',
        thursdayMileage: '',
        thursdayMeals: '',
        thursdayPhone: '',
        thursdayOther: '',
        fridayHotel: '',
        fridayTravel: '',
        fridayMarketing: '',
        fridayMiles: '',
        fridayMileage: '',
        fridayMeals: '',
        fridayPhone: '',
        fridayOther: '',
        saturdayHotel: '',
        saturdayTravel: '',
        saturdayMarketing: '',
        saturdayMiles: '',
        saturdayMileage: '',
        saturdayMeals: '',
        saturdayPhone: '',
        saturdayOther: '',
        weeklyTotalExpense: '',
        files: this.filesControl
      });
    }

  ngOnInit() {
    this.contractorId = this.route.snapshot.queryParams['contractorid'];
    this.mileageRate = this.route.snapshot.queryParams['mileagerate'] !== undefined ?
    this.route.snapshot.queryParams['mileagerate'] : 0;
    this.spinner.show();
    this.loadData();
  }  

  private loadData() {
    return this.dataService.getTimesheetTitleInfo(this.contractorId)
        .subscribe(tsTitleInfo => {
          this.timesheetTitle = tsTitleInfo[0] as TimesheetTitleResponse;
          window.scrollTo(0, 0);
          this.spinner.hide();
        },
        error => {
          this.alertService.error(error);
          this.spinner.hide();
        });
    }
  
    setHotel(event: any, day: any) {
      switch (day) {
        case 'sun':
          this.myExpenseDetails.sundayHotel = +event.target.value;
          this.myExpenseDetails.sundayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDetails.sundayTravel, this.myExpenseDetails.sundayMarketing, this.myExpenseDetails.sundayMileage,
            this.myExpenseDetails.sundayMeals, this.myExpenseDetails.sundayPhone, this.myExpenseDetails.sundayOther);
          this.updateWeeklyExpenses();
          break;
        case 'mon':
          this.myExpenseDetails.mondayHotel = +event.target.value;
          this.myExpenseDetails.mondayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDetails.mondayTravel, this.myExpenseDetails.mondayMarketing, this.myExpenseDetails.mondayMileage,
            this.myExpenseDetails.mondayMeals, this.myExpenseDetails.mondayPhone, this.myExpenseDetails.mondayOther);
          this.updateWeeklyExpenses();
          break;
        case 'tues':
          this.myExpenseDetails.tuesdayHotel = +event.target.value;
          this.myExpenseDetails.tuesdayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDetails.tuesdayTravel, this.myExpenseDetails.tuesdayMarketing, this.myExpenseDetails.tuesdayMileage,
            this.myExpenseDetails.tuesdayMeals, this.myExpenseDetails.tuesdayPhone, this.myExpenseDetails.tuesdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'wed':
          this.myExpenseDetails.wednesdayHotel = +event.target.value;
          this.myExpenseDetails.wednesdayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDetails.wednesdayTravel, this.myExpenseDetails.wednesdayMarketing, this.myExpenseDetails.wednesdayMileage,
            this.myExpenseDetails.wednesdayMeals, this.myExpenseDetails.wednesdayPhone, this.myExpenseDetails.wednesdayOther);
          this.updateWeeklyExpenses();  
          break;
        case 'thur':
          this.myExpenseDetails.thursdayHotel = +event.target.value;
          this.myExpenseDetails.thursdayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDetails.thursdayTravel, this.myExpenseDetails.thursdayMarketing, this.myExpenseDetails.thursdayMileage,
            this.myExpenseDetails.thursdayMeals, this.myExpenseDetails.thursdayPhone, this.myExpenseDetails.thursdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'fri':
          this.myExpenseDetails.fridayHotel = +event.target.value;
          this.myExpenseDetails.fridayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDetails.fridayTravel, this.myExpenseDetails.fridayMarketing, this.myExpenseDetails.fridayMileage,
            this.myExpenseDetails.fridayMeals, this.myExpenseDetails.fridayPhone, this.myExpenseDetails.fridayOther);
          this.updateWeeklyExpenses();
          break;
        case 'sat':
          this.myExpenseDetails.saturdayHotel = +event.target.value;
          this.myExpenseDetails.saturdayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDetails.saturdayTravel, this.myExpenseDetails.saturdayMarketing, this.myExpenseDetails.saturdayMileage,
            this.myExpenseDetails.saturdayMeals, this.myExpenseDetails.saturdayPhone, this.myExpenseDetails.saturdayOther);
          this.updateWeeklyExpenses();
          break;
      }
    }
    setTravel(event: any, day: any) {
      switch (day) {
        case 'sun':
          this.myExpenseDetails.sundayTravel = +event.target.value;
          this.myExpenseDetails.sundayExpenses = this.getDailyExpense(this.myExpenseDetails.sundayHotel,
            +event.target.value, this.myExpenseDetails.sundayMarketing, this.myExpenseDetails.sundayMileage,
            this.myExpenseDetails.sundayMeals, this.myExpenseDetails.sundayPhone, this.myExpenseDetails.sundayOther);
          this.updateWeeklyExpenses();
          break;
        case 'mon':
          this.myExpenseDetails.mondayTravel = +event.target.value;
          this.myExpenseDetails.mondayExpenses = this.getDailyExpense(this.myExpenseDetails.mondayHotel,
            +event.target.value, this.myExpenseDetails.mondayMarketing, this.myExpenseDetails.mondayMileage,
            this.myExpenseDetails.mondayMeals, this.myExpenseDetails.mondayPhone, this.myExpenseDetails.mondayOther);
          this.updateWeeklyExpenses();
          break;
        case 'tues':
          this.myExpenseDetails.tuesdayTravel = +event.target.value;
          this.myExpenseDetails.tuesdayExpenses = this.getDailyExpense(this.myExpenseDetails.tuesdayHotel,
            +event.target.value, this.myExpenseDetails.tuesdayMarketing, this.myExpenseDetails.tuesdayMileage,
            this.myExpenseDetails.tuesdayMeals, this.myExpenseDetails.tuesdayPhone, this.myExpenseDetails.tuesdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'wed':
          this.myExpenseDetails.wednesdayTravel = +event.target.value;
          this.myExpenseDetails.wednesdayExpenses = this.getDailyExpense(this.myExpenseDetails.wednesdayHotel,
            +event.target.value, this.myExpenseDetails.wednesdayMarketing, this.myExpenseDetails.wednesdayMileage,
            this.myExpenseDetails.wednesdayMeals, this.myExpenseDetails.wednesdayPhone, this.myExpenseDetails.wednesdayOther);
          this.updateWeeklyExpenses();  
          break;
        case 'thur':
          this.myExpenseDetails.thursdayTravel = +event.target.value;
          this.myExpenseDetails.thursdayExpenses = this.getDailyExpense(this.myExpenseDetails.thursdayHotel,
            +event.target.value, this.myExpenseDetails.thursdayMarketing, this.myExpenseDetails.thursdayMileage,
            this.myExpenseDetails.thursdayMeals, this.myExpenseDetails.thursdayPhone, this.myExpenseDetails.thursdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'fri':
          this.myExpenseDetails.fridayTravel = +event.target.value;
          this.myExpenseDetails.fridayExpenses = this.getDailyExpense(this.myExpenseDetails.fridayHotel,
            +event.target.value, this.myExpenseDetails.fridayMarketing, this.myExpenseDetails.fridayMileage,
            this.myExpenseDetails.fridayMeals, this.myExpenseDetails.fridayPhone, this.myExpenseDetails.fridayOther);
          this.updateWeeklyExpenses();
          break;
        case 'sat':
          this.myExpenseDetails.saturdayTravel = +event.target.value;
          this.myExpenseDetails.saturdayExpenses = this.getDailyExpense(this.myExpenseDetails.saturdayHotel,
            +event.target.value, this.myExpenseDetails.saturdayMarketing, this.myExpenseDetails.saturdayMileage,
            this.myExpenseDetails.saturdayMeals, this.myExpenseDetails.saturdayPhone, this.myExpenseDetails.saturdayOther);
          this.updateWeeklyExpenses();
          break;
      }
    }
    setMarketing(event: any, day: any) {
      switch (day) {
        case 'sun':
          this.myExpenseDetails.sundayMarketing = +event.target.value;
          this.myExpenseDetails.sundayExpenses = this.getDailyExpense(this.myExpenseDetails.sundayHotel,
            this.myExpenseDetails.sundayTravel, +event.target.value, this.myExpenseDetails.sundayMileage,
            this.myExpenseDetails.sundayMeals, this.myExpenseDetails.sundayPhone, this.myExpenseDetails.sundayOther);
          this.updateWeeklyExpenses();
          break;
        case 'mon':
          this.myExpenseDetails.mondayMarketing = +event.target.value;
          this.myExpenseDetails.mondayExpenses = this.getDailyExpense(this.myExpenseDetails.mondayHotel,
            this.myExpenseDetails.mondayTravel, +event.target.value, this.myExpenseDetails.mondayMileage,
            this.myExpenseDetails.mondayMeals, this.myExpenseDetails.mondayPhone, this.myExpenseDetails.mondayOther);
          this.updateWeeklyExpenses();
          break;
        case 'tues':
          this.myExpenseDetails.tuesdayMarketing = +event.target.value;
          this.myExpenseDetails.tuesdayExpenses = this.getDailyExpense(this.myExpenseDetails.tuesdayHotel,
            this.myExpenseDetails.tuesdayTravel, +event.target.value, this.myExpenseDetails.tuesdayMileage,
            this.myExpenseDetails.tuesdayMeals, this.myExpenseDetails.tuesdayPhone, this.myExpenseDetails.tuesdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'wed':
          this.myExpenseDetails.wednesdayMarketing = +event.target.value;
          this.myExpenseDetails.wednesdayExpenses = this.getDailyExpense(this.myExpenseDetails.wednesdayHotel,
            this.myExpenseDetails.wednesdayTravel, +event.target.value, this.myExpenseDetails.wednesdayMileage,
            this.myExpenseDetails.wednesdayMeals, this.myExpenseDetails.wednesdayPhone, this.myExpenseDetails.wednesdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'thur':
          this.myExpenseDetails.thursdayMarketing = +event.target.value;
          this.myExpenseDetails.thursdayExpenses = this.getDailyExpense(this.myExpenseDetails.thursdayHotel,
            this.myExpenseDetails.thursdayTravel, +event.target.value, this.myExpenseDetails.thursdayMileage,
            this.myExpenseDetails.thursdayMeals, this.myExpenseDetails.thursdayPhone, this.myExpenseDetails.thursdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'fri':
          this.myExpenseDetails.fridayMarketing = +event.target.value;
          this.myExpenseDetails.fridayExpenses = this.getDailyExpense(this.myExpenseDetails.fridayHotel,
            this.myExpenseDetails.fridayTravel, +event.target.value, this.myExpenseDetails.fridayMileage,
            this.myExpenseDetails.fridayMeals, this.myExpenseDetails.fridayPhone, this.myExpenseDetails.fridayOther);
          this.updateWeeklyExpenses();
          break;
        case 'sat':
          this.myExpenseDetails.saturdayMarketing = +event.target.value;
          this.myExpenseDetails.saturdayExpenses = this.getDailyExpense(this.myExpenseDetails.saturdayHotel,
            this.myExpenseDetails.saturdayTravel, +event.target.value, this.myExpenseDetails.saturdayMileage,
            this.myExpenseDetails.saturdayMeals, this.myExpenseDetails.saturdayPhone, this.myExpenseDetails.saturdayOther);
          this.updateWeeklyExpenses();
          break;
      }
    }

    setMileage(event: any, day: any) {  
      switch (day) {
        case 'sun':
          this.myExpenseDetails.sundayMiles = +event.target.value;
          this.myExpenseDetails.sundayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('sun');          
          this.updateWeeklyExpenses();
          break;
        case 'mon':
          this.myExpenseDetails.mondayMiles = +event.target.value;
          this.myExpenseDetails.mondayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('mon');
          this.updateWeeklyExpenses();
          break;
        case 'tues':
          this.myExpenseDetails.tuesdayMiles = +event.target.value;
          this.myExpenseDetails.tuesdayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('tues');
          this.updateWeeklyExpenses();
          break;
        case 'wed':
          this.myExpenseDetails.wednesdayMiles = +event.target.value;
          this.myExpenseDetails.wednesdayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('wed');
          this.updateWeeklyExpenses();
          break;
        case 'thur':
          this.myExpenseDetails.thursdayMiles = +event.target.value;
          this.myExpenseDetails.thursdayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('thur');
          this.updateWeeklyExpenses();
          break;
        case 'fri':
          this.myExpenseDetails.fridayMiles = +event.target.value;
          this.myExpenseDetails.fridayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('fri');
          this.updateWeeklyExpenses();
          break;
        case 'sat':
          this.myExpenseDetails.saturdayMiles = +event.target.value;
          this.myExpenseDetails.saturdayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('sat');
          this.updateWeeklyExpenses();
          break;
      }
    }

    setMeals(event: any, day: any) {  
      switch (day) {
        case 'sun':
          this.myExpenseDetails.sundayMeals = +event.target.value;
          this.myExpenseDetails.sundayExpenses = this.getDailyExpense(this.myExpenseDetails.sundayHotel,
            this.myExpenseDetails.sundayTravel, this.myExpenseDetails.sundayMarketing, this.myExpenseDetails.sundayMileage,
			      +event.target.value, this.myExpenseDetails.sundayPhone, this.myExpenseDetails.sundayOther);
          this.updateWeeklyExpenses();
          break;
        case 'mon':
          this.myExpenseDetails.mondayMeals = +event.target.value;
          this.myExpenseDetails.mondayExpenses = this.getDailyExpense(this.myExpenseDetails.mondayHotel,
            this.myExpenseDetails.mondayTravel, this.myExpenseDetails.mondayMarketing, this.myExpenseDetails.mondayMileage,
			      +event.target.value, this.myExpenseDetails.mondayPhone, this.myExpenseDetails.mondayOther);
          this.updateWeeklyExpenses();
          break;
        case 'tues':
          this.myExpenseDetails.tuesdayMeals = +event.target.value;
          this.myExpenseDetails.tuesdayExpenses = this.getDailyExpense(this.myExpenseDetails.tuesdayHotel,
            this.myExpenseDetails.tuesdayTravel, this.myExpenseDetails.tuesdayMarketing, this.myExpenseDetails.tuesdayMileage,
			      +event.target.value, this.myExpenseDetails.tuesdayPhone, this.myExpenseDetails.tuesdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'wed':
          this.myExpenseDetails.wednesdayMeals = +event.target.value;
          this.myExpenseDetails.wednesdayExpenses = this.getDailyExpense(this.myExpenseDetails.wednesdayHotel,
            this.myExpenseDetails.wednesdayTravel, this.myExpenseDetails.wednesdayMarketing, this.myExpenseDetails.wednesdayMileage,
			      +event.target.value, this.myExpenseDetails.wednesdayPhone, this.myExpenseDetails.wednesdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'thur':
          this.myExpenseDetails.thursdayMeals = +event.target.value;
          this.myExpenseDetails.thursdayExpenses = this.getDailyExpense(this.myExpenseDetails.thursdayHotel,
            this.myExpenseDetails.thursdayTravel, this.myExpenseDetails.thursdayMarketing, this.myExpenseDetails.thursdayMileage,
			      +event.target.value, this.myExpenseDetails.thursdayPhone, this.myExpenseDetails.thursdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'fri':
          this.myExpenseDetails.fridayMeals = +event.target.value;
          this.myExpenseDetails.fridayExpenses = this.getDailyExpense(this.myExpenseDetails.fridayHotel,
            this.myExpenseDetails.fridayTravel, this.myExpenseDetails.fridayMarketing, this.myExpenseDetails.fridayMileage,
			      +event.target.value, this.myExpenseDetails.fridayPhone, this.myExpenseDetails.fridayOther);
          this.updateWeeklyExpenses();
          break;
        case 'sat':
          this.myExpenseDetails.saturdayMeals = +event.target.value;
          this.myExpenseDetails.saturdayExpenses = this.getDailyExpense(this.myExpenseDetails.saturdayHotel,
            this.myExpenseDetails.saturdayTravel, this.myExpenseDetails.saturdayMarketing, this.myExpenseDetails.saturdayMileage,
			      +event.target.value, this.myExpenseDetails.saturdayPhone, this.myExpenseDetails.saturdayOther);
          this.updateWeeklyExpenses();
          break;
      }
    }

    setPhone(event: any, day: any) {  
      switch (day) {
        case 'sun':
          this.myExpenseDetails.sundayPhone = +event.target.value;
          this.myExpenseDetails.sundayExpenses = this.getDailyExpense(this.myExpenseDetails.sundayHotel,
            this.myExpenseDetails.sundayTravel, this.myExpenseDetails.sundayMarketing, this.myExpenseDetails.sundayMileage,
			      this.myExpenseDetails.sundayMeals, +event.target.value, this.myExpenseDetails.sundayOther);
          this.updateWeeklyExpenses();
          break;
          case 'mon':
            this.myExpenseDetails.mondayPhone = +event.target.value;
            this.myExpenseDetails.mondayExpenses = this.getDailyExpense(this.myExpenseDetails.mondayHotel,
              this.myExpenseDetails.mondayTravel, this.myExpenseDetails.mondayMarketing, this.myExpenseDetails.mondayMileage,
              this.myExpenseDetails.mondayMeals, +event.target.value, this.myExpenseDetails.mondayOther);
            this.updateWeeklyExpenses();
            break;
          case 'tues':
            this.myExpenseDetails.tuesdayPhone = +event.target.value;
            this.myExpenseDetails.tuesdayExpenses = this.getDailyExpense(this.myExpenseDetails.tuesdayHotel,
              this.myExpenseDetails.tuesdayTravel, this.myExpenseDetails.tuesdayMarketing, this.myExpenseDetails.tuesdayMileage,
              this.myExpenseDetails.tuesdayMeals, +event.target.value, this.myExpenseDetails.tuesdayOther);
            this.updateWeeklyExpenses();
            break;
          case 'wed':
            this.myExpenseDetails.wednesdayPhone = +event.target.value;
            this.myExpenseDetails.wednesdayExpenses = this.getDailyExpense(this.myExpenseDetails.wednesdayHotel,
              this.myExpenseDetails.wednesdayTravel, this.myExpenseDetails.wednesdayMarketing, this.myExpenseDetails.wednesdayMileage,
              this.myExpenseDetails.wednesdayMeals, +event.target.value, this.myExpenseDetails.wednesdayOther);
            this.updateWeeklyExpenses();
            break;
          case 'thur':
            this.myExpenseDetails.thursdayPhone = +event.target.value;
            this.myExpenseDetails.thursdayExpenses = this.getDailyExpense(this.myExpenseDetails.thursdayHotel,
              this.myExpenseDetails.thursdayTravel, this.myExpenseDetails.thursdayMarketing, this.myExpenseDetails.thursdayMileage,
              this.myExpenseDetails.thursdayMeals, +event.target.value, this.myExpenseDetails.thursdayOther);
            this.updateWeeklyExpenses();
            break;
          case 'fri':
            this.myExpenseDetails.fridayPhone = +event.target.value;
            this.myExpenseDetails.fridayExpenses = this.getDailyExpense(this.myExpenseDetails.fridayHotel,
              this.myExpenseDetails.fridayTravel, this.myExpenseDetails.fridayMarketing, this.myExpenseDetails.fridayMileage,
              this.myExpenseDetails.fridayMeals, +event.target.value, this.myExpenseDetails.fridayOther);
            this.updateWeeklyExpenses();
            break;
          case 'sat':
            this.myExpenseDetails.saturdayPhone = +event.target.value;
            this.myExpenseDetails.saturdayExpenses = this.getDailyExpense(this.myExpenseDetails.saturdayHotel,
              this.myExpenseDetails.saturdayTravel, this.myExpenseDetails.saturdayMarketing, this.myExpenseDetails.saturdayMileage,
              this.myExpenseDetails.saturdayMeals, +event.target.value, this.myExpenseDetails.saturdayOther);
            this.updateWeeklyExpenses();
            break;
      }
    }

    setOther(event: any, day: any) {  
      switch (day) {
          case 'sun':
            this.myExpenseDetails.sundayOther = +event.target.value;
            this.myExpenseDetails.sundayExpenses = this.getDailyExpense(this.myExpenseDetails.sundayHotel,
              this.myExpenseDetails.sundayTravel, this.myExpenseDetails.sundayMarketing, this.myExpenseDetails.sundayMileage,
              this.myExpenseDetails.sundayMeals, +event.target.value, this.myExpenseDetails.sundayPhone);
            this.updateWeeklyExpenses();
            break;
          case 'mon':
            this.myExpenseDetails.mondayOther = +event.target.value;
            this.myExpenseDetails.mondayExpenses = this.getDailyExpense(this.myExpenseDetails.mondayHotel,
              this.myExpenseDetails.mondayTravel, this.myExpenseDetails.mondayMarketing, this.myExpenseDetails.mondayMileage,
              this.myExpenseDetails.mondayMeals, this.myExpenseDetails.mondayPhone, +event.target.value);
            this.updateWeeklyExpenses();
            break;
          case 'tues':
            this.myExpenseDetails.tuesdayOther = +event.target.value;
            this.myExpenseDetails.tuesdayExpenses = this.getDailyExpense(this.myExpenseDetails.tuesdayHotel,
              this.myExpenseDetails.tuesdayTravel, this.myExpenseDetails.tuesdayMarketing, this.myExpenseDetails.tuesdayMileage,
              this.myExpenseDetails.tuesdayMeals, this.myExpenseDetails.tuesdayPhone, +event.target.value);
            this.updateWeeklyExpenses();
            break;
          case 'wed':
            this.myExpenseDetails.wednesdayOther = +event.target.value;
            this.myExpenseDetails.wednesdayExpenses = this.getDailyExpense(this.myExpenseDetails.wednesdayHotel,
              this.myExpenseDetails.wednesdayTravel, this.myExpenseDetails.wednesdayMarketing, this.myExpenseDetails.wednesdayMileage,
              this.myExpenseDetails.wednesdayMeals, this.myExpenseDetails.wednesdayPhone, +event.target.value);
            this.updateWeeklyExpenses();
            break;
          case 'thur':
            this.myExpenseDetails.thursdayOther = +event.target.value;
            this.myExpenseDetails.thursdayExpenses = this.getDailyExpense(this.myExpenseDetails.thursdayHotel,
              this.myExpenseDetails.thursdayTravel, this.myExpenseDetails.thursdayMarketing, this.myExpenseDetails.thursdayMileage,
              this.myExpenseDetails.thursdayMeals, this.myExpenseDetails.thursdayPhone, +event.target.value);
            this.updateWeeklyExpenses();
            break;
          case 'fri':
            this.myExpenseDetails.fridayOther = +event.target.value;
            this.myExpenseDetails.fridayExpenses = this.getDailyExpense(this.myExpenseDetails.fridayHotel,
              this.myExpenseDetails.fridayTravel, this.myExpenseDetails.fridayMarketing, this.myExpenseDetails.fridayMileage,
              this.myExpenseDetails.fridayMeals, this.myExpenseDetails.fridayPhone, +event.target.value);
            this.updateWeeklyExpenses();
            break;
          case 'sat':
            this.myExpenseDetails.saturdayOther = +event.target.value;
            this.myExpenseDetails.saturdayExpenses = this.getDailyExpense(this.myExpenseDetails.saturdayHotel,
              this.myExpenseDetails.saturdayTravel, this.myExpenseDetails.saturdayMarketing, this.myExpenseDetails.saturdayMileage,
              this.myExpenseDetails.saturdayMeals, this.myExpenseDetails.saturdayPhone, +event.target.value);
            this.updateWeeklyExpenses();
            break;
        }
      }

    updateDailyExpenses(day: any): void {
      switch(day) {
        case 'sun':
          this.myExpenseDetails.sundayExpenses = this.getDailyExpense(this.myExpenseDetails.sundayHotel,
            this.myExpenseDetails.sundayTravel, this.myExpenseDetails.sundayMarketing, this.myExpenseDetails.sundayMileage,
            this.myExpenseDetails.sundayMeals, this.myExpenseDetails.sundayPhone, this.myExpenseDetails.sundayOther);
          break;
        case 'mon':
          this.myExpenseDetails.mondayExpenses = this.getDailyExpense(this.myExpenseDetails.mondayHotel,
            this.myExpenseDetails.mondayTravel, this.myExpenseDetails.mondayMarketing, this.myExpenseDetails.mondayMileage,
            this.myExpenseDetails.mondayMeals, this.myExpenseDetails.mondayPhone, this.myExpenseDetails.mondayOther);
          break;
        case 'tues':
          this.myExpenseDetails.tuesdayExpenses = this.getDailyExpense(this.myExpenseDetails.tuesdayHotel,
            this.myExpenseDetails.tuesdayTravel, this.myExpenseDetails.tuesdayMarketing, this.myExpenseDetails.tuesdayMileage,
            this.myExpenseDetails.tuesdayMeals, this.myExpenseDetails.tuesdayPhone, this.myExpenseDetails.tuesdayOther);
          break;
        case 'wed':
          this.myExpenseDetails.wednesdayExpenses = this.getDailyExpense(this.myExpenseDetails.wednesdayHotel,
            this.myExpenseDetails.wednesdayTravel, this.myExpenseDetails.wednesdayMarketing, this.myExpenseDetails.wednesdayMileage,
            this.myExpenseDetails.wednesdayMeals, this.myExpenseDetails.wednesdayPhone, this.myExpenseDetails.wednesdayOther);
          break;
        case 'thur':
          this.myExpenseDetails.thursdayExpenses = this.getDailyExpense(this.myExpenseDetails.thursdayHotel,
            this.myExpenseDetails.thursdayTravel, this.myExpenseDetails.thursdayMarketing, this.myExpenseDetails.thursdayMileage,
            this.myExpenseDetails.thursdayMeals, this.myExpenseDetails.thursdayPhone, this.myExpenseDetails.thursdayOther);
          break;
        case 'fri':
          this.myExpenseDetails.fridayExpenses = this.getDailyExpense(this.myExpenseDetails.fridayHotel,
            this.myExpenseDetails.fridayTravel, this.myExpenseDetails.fridayMarketing, this.myExpenseDetails.fridayMileage,
            this.myExpenseDetails.fridayMeals, this.myExpenseDetails.fridayPhone, this.myExpenseDetails.fridayOther);
          break;
        case 'sat':
          this.myExpenseDetails.saturdayExpenses = this.getDailyExpense(this.myExpenseDetails.saturdayHotel,
            this.myExpenseDetails.saturdayTravel, this.myExpenseDetails.saturdayMarketing, this.myExpenseDetails.saturdayMileage,
            this.myExpenseDetails.saturdayMeals, this.myExpenseDetails.saturdayPhone, this.myExpenseDetails.saturdayOther);
          break;
      }
    }

    private updateWeeklyExpenses(): void {
      this.myExpenseDetails.weeklyTotalExpense = this.myExpenseDetails.sundayExpenses + this.myExpenseDetails.mondayExpenses
      + this.myExpenseDetails.tuesdayExpenses + this.myExpenseDetails.wednesdayExpenses + this.myExpenseDetails.thursdayExpenses
      + this.myExpenseDetails.fridayExpenses + this.myExpenseDetails.saturdayExpenses;
      if (this.myExpenseDetails.weeklyTotalExpense === 0) {
        this.expenseForm.controls.weeklyTotalExpense.setErrors({lessThanMin: true});
      } else {
        this.expenseForm.controls.weeklyTotalExpense.setErrors(null);
      }
    }  
  
  submitExpense() {
    const request = this.setExpenseRequest() as FormData;
    this.spinner.show();
    this.dataService.createExpense(request)
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
  
  private setExpenseRequest(): FormData  {
    const formData = new FormData();
    if (this.expenseForm.get('files').value !== null) {
      this.expenseForm.get('files').value.forEach((f) => formData.append('files', f));
    }
    formData.append('assignmentId', this.timesheetTitle.assignmentId.toString());
    formData.append('contractorName', this.myExpenseDetails.contractorName);
    formData.append('contractorId', this.timesheetTitle.contractorId.toString());
    formData.append('weekEnding', this.datePipe.transform(this.expenseForm.controls.weekEnding.value, 'yyyy-MM-dd'));
    formData.append('projectName', this.expenseForm.controls.projectName.value);
    formData.append('prepaidExpense', this.expenseForm.controls.prepaidExpense.toString());
    formData.append('mondayDate', this.datePipe.transform(this.myExpenseDetails.mondayDate, 'yyyy-MM-dd'));
    formData.append('tuesdayDate', this.datePipe.transform(this.myExpenseDetails.tuesdayDate, 'yyyy-MM-dd'));
    formData.append('wednesdayDate', this.datePipe.transform(this.myExpenseDetails.wednesdayDate, 'yyyy-MM-dd'));
    formData.append('thursdayDate', this.datePipe.transform(this.myExpenseDetails.thursdayDate, 'yyyy-MM-dd'));
    formData.append('fridayDate', this.datePipe.transform(this.myExpenseDetails.fridayDate, 'yyyy-MM-dd'));
    formData.append('saturdayDate', this.datePipe.transform(this.myExpenseDetails.saturdayDate, 'yyyy-MM-dd'));
    formData.append('sundayDate', this.datePipe.transform(this.myExpenseDetails.sundayDate, 'yyyy-MM-dd'));
    formData.append('mondayHotel', this.myExpenseDetails.mondayHotel.toString());
    formData.append('mondayTravel', this.myExpenseDetails.mondayTravel.toString());
    formData.append('mondayMarketing', this.myExpenseDetails.mondayMarketing.toString());
    formData.append('mondayMiles', this.myExpenseDetails.mondayMiles.toString());
    formData.append('mondayMileage', this.myExpenseDetails.mondayMileage.toString());
    formData.append('mondayMeals', this.myExpenseDetails.mondayMeals.toString());
    formData.append('mondayPhone', this.myExpenseDetails.mondayPhone.toString());
    formData.append('mondayOther', this.myExpenseDetails.mondayOther.toString());
    formData.append('mondayExpenses', this.myExpenseDetails.mondayExpenses.toString());
    formData.append('tuesdayHotel', this.myExpenseDetails.tuesdayHotel.toString());
    formData.append('tuesdayTravel', this.myExpenseDetails.tuesdayTravel.toString());
    formData.append('tuesdayMarketing', this.myExpenseDetails.tuesdayMarketing.toString());
    formData.append('tuesdayMiles', this.myExpenseDetails.tuesdayMiles.toString());
    formData.append('tuesdayMileage', this.myExpenseDetails.tuesdayMileage.toString());
    formData.append('tuesdayMeals', this.myExpenseDetails.tuesdayMeals.toString());
    formData.append('tuesdayPhone', this.myExpenseDetails.tuesdayPhone.toString());
    formData.append('tuesdayOther', this.myExpenseDetails.tuesdayOther.toString());
    formData.append('tuesdayExpenses', this.myExpenseDetails.tuesdayExpenses.toString());
    formData.append('wednesdayHotel', this.myExpenseDetails.wednesdayHotel.toString());
    formData.append('wednesdayTravel', this.myExpenseDetails.wednesdayTravel.toString());
    formData.append('wednesdayMarketing', this.myExpenseDetails.wednesdayMarketing.toString());
    formData.append('wednesdayMiles', this.myExpenseDetails.wednesdayMiles.toString());
    formData.append('wednesdayMileage', this.myExpenseDetails.wednesdayMileage.toString());
    formData.append('wednesdayMeals', this.myExpenseDetails.wednesdayMeals.toString());
    formData.append('wednesdayPhone', this.myExpenseDetails.wednesdayPhone.toString());
    formData.append('wednesdayOther', this.myExpenseDetails.wednesdayOther.toString());
    formData.append('wednesdayExpenses', this.myExpenseDetails.wednesdayExpenses.toString());
    formData.append('thursdayHotel', this.myExpenseDetails.thursdayHotel.toString());
    formData.append('thursdayTravel', this.myExpenseDetails.thursdayTravel.toString());
    formData.append('thursdayMarketing', this.myExpenseDetails.thursdayMarketing.toString());
    formData.append('thursdayMiles', this.myExpenseDetails.thursdayMiles.toString());
    formData.append('thursdayMileage', this.myExpenseDetails.thursdayMileage.toString());
    formData.append('thursdayMeals', this.myExpenseDetails.thursdayMeals.toString());
    formData.append('thursdayPhone', this.myExpenseDetails.thursdayPhone.toString());
    formData.append('thursdayOther', this.myExpenseDetails.thursdayOther.toString());
    formData.append('thursdayExpenses', this.myExpenseDetails.thursdayExpenses.toString());
    formData.append('fridayHotel', this.myExpenseDetails.fridayHotel.toString());
    formData.append('fridayTravel', this.myExpenseDetails.fridayTravel.toString());
    formData.append('fridayMarketing', this.myExpenseDetails.fridayMarketing.toString());
    formData.append('fridayMiles', this.myExpenseDetails.fridayMiles.toString());
    formData.append('fridayMileage', this.myExpenseDetails.fridayMileage.toString());
    formData.append('fridayMeals', this.myExpenseDetails.fridayMeals.toString());
    formData.append('fridayPhone', this.myExpenseDetails.fridayPhone.toString());
    formData.append('fridayOther', this.myExpenseDetails.fridayOther.toString());
    formData.append('fridayExpenses', this.myExpenseDetails.fridayExpenses.toString());
    formData.append('saturdayHotel', this.myExpenseDetails.saturdayHotel.toString());
    formData.append('saturdayTravel', this.myExpenseDetails.saturdayTravel.toString());
    formData.append('saturdayMarketing', this.myExpenseDetails.saturdayMarketing.toString());
    formData.append('saturdayMiles', this.myExpenseDetails.saturdayMiles.toString());
    formData.append('saturdayMileage', this.myExpenseDetails.saturdayMileage.toString());
    formData.append('saturdayMeals', this.myExpenseDetails.saturdayMeals.toString());
    formData.append('saturdayPhone', this.myExpenseDetails.saturdayPhone.toString());
    formData.append('saturdayOther', this.myExpenseDetails.saturdayOther.toString());
    formData.append('saturdayExpenses', this.myExpenseDetails.saturdayExpenses.toString());
    formData.append('sundayHotel', this.myExpenseDetails.sundayHotel.toString());
    formData.append('sundayTravel', this.myExpenseDetails.sundayTravel.toString());
    formData.append('sundayMarketing', this.myExpenseDetails.sundayMarketing.toString());
    formData.append('sundayMiles', this.myExpenseDetails.sundayMiles.toString());
    formData.append('sundayMileage', this.myExpenseDetails.sundayMileage.toString());
    formData.append('sundayMeals', this.myExpenseDetails.sundayMeals.toString());
    formData.append('sundayPhone', this.myExpenseDetails.sundayPhone.toString());
    formData.append('sundayOther', this.myExpenseDetails.sundayOther.toString());
    formData.append('sundayExpenses', this.myExpenseDetails.sundayExpenses.toString());
    formData.append('isDraft', 'false');
    return formData;
  }
  private getDailyExpense(hotel: number, travel: number, marketing, mileage, meals, phone, other): number {
    let sum = [hotel, travel, marketing, mileage, meals, phone, other].reduce((a,b)=>a+b);
    return Math.round(sum*100)/100; //round to 2 decimal places
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      if (event.value.getDay() === 6) {
        this.expenseForm.controls.weekEnding.setErrors(null);
        this.myExpenseDetails.weekEnding = this.myExpenseDetails.saturdayDate = new Date(event.value);
        this.myExpenseDetails.mondayDate = new Date(event.value);
        this.myExpenseDetails.mondayDate.setDate(this.myExpenseDetails.mondayDate.getDate() - 5);
        this.myExpenseDetails.tuesdayDate = new Date(event.value);
        this.myExpenseDetails.tuesdayDate.setDate(this.myExpenseDetails.tuesdayDate.getDate() - 4);
        this.myExpenseDetails.wednesdayDate = new Date(event.value);
        this.myExpenseDetails.wednesdayDate.setDate(this.myExpenseDetails.wednesdayDate.getDate() - 3);
        this.myExpenseDetails.thursdayDate = new Date(event.value);
        this.myExpenseDetails.thursdayDate.setDate(this.myExpenseDetails.thursdayDate.getDate() - 2);
        this.myExpenseDetails.fridayDate = new Date(event.value);
        this.myExpenseDetails.fridayDate.setDate(this.myExpenseDetails.fridayDate.getDate() - 1);
        this.myExpenseDetails.sundayDate = new Date(event.value);
        this.myExpenseDetails.sundayDate.setDate(this.myExpenseDetails.sundayDate.getDate() - 6);
      } else {
        this.expenseForm.controls.weekEnding.setErrors({notSaturday: true});
        return false;
      }
      let oneWeekLater: Date = new Date();
      const sevenDays=new Date().getDate()+7;
      if (this.myExpenseDetails.saturdayDate>new Date(oneWeekLater.setDate(sevenDays))) {
        this.expenseForm.controls.weekEnding.setErrors({exceedAllowedDateRange: true});
        return false;
      }
      this.spinner.show();
      this.dataService.expenseExists(this.timesheetTitle.assignmentId, this.datePipe.transform(this.myExpenseDetails.weekEnding, 'yyyy-MM-dd'))
      .subscribe((response: boolean) => {
        if (response) {
          this.expenseForm.controls.weekEnding.setErrors({expenseExists: true});
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
  return this.expenseForm.controls[controlName].hasError;
  }

  resetPrepaidExpense() {
    this.myExpenseDetails.prepaidExpense = 0;
  }

  resetHotel(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDetails.sundayHotel = 0;
        this.updateDailyExpenses('sun');
        this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDetails.mondayHotel = 0;
        this.updateDailyExpenses('mon');
        this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDetails.tuesdayHotel = 0;
        this.updateDailyExpenses('tues');
        this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDetails.wednesdayHotel = 0;
        this.updateDailyExpenses('wed');
        this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDetails.thursdayHotel = 0;
        this.updateDailyExpenses('thur');
        this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDetails.fridayHotel = 0;
        this.updateDailyExpenses('fri');
        this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDetails.saturdayHotel = 0;
        this.updateDailyExpenses('sat');
        this.updateWeeklyExpenses();
        break;
    }
  }

  resetTravel(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDetails.sundayTravel = 0;
        this.updateDailyExpenses('sun');
        this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDetails.mondayTravel = 0;
        this.updateDailyExpenses('mon');
        this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDetails.tuesdayTravel = 0;
        this.updateDailyExpenses('tues');
        this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDetails.wednesdayTravel = 0;
        this.updateDailyExpenses('wed');
        this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDetails.thursdayTravel = 0;
        this.updateDailyExpenses('thur');
        this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDetails.fridayTravel = 0;
        this.updateDailyExpenses('fri');
        this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDetails.saturdayTravel = 0;
        this.updateDailyExpenses('sat');
        this.updateWeeklyExpenses();
        break;
    }
  }

  resetMarketing(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDetails.sundayMarketing = 0;
        this.updateDailyExpenses('sun');
		this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDetails.mondayMarketing = 0;
        this.updateDailyExpenses('mon');
		this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDetails.tuesdayMarketing = 0;
        this.updateDailyExpenses('tues');
		this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDetails.wednesdayMarketing = 0;
        this.updateDailyExpenses('wed');
		this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDetails.thursdayMarketing = 0;
        this.updateDailyExpenses('thur');
		this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDetails.fridayMarketing = 0;
        this.updateDailyExpenses('fri');
		this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDetails.saturdayMarketing = 0;
        this.updateDailyExpenses('sat');
		this.updateWeeklyExpenses();
        break;
    }
  }

  resetMiles(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDetails.sundayMiles = 0;
        this.myExpenseDetails.sundayMileage = 0;
        this.updateDailyExpenses('sun');
        this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDetails.mondayMiles = 0;
        this.myExpenseDetails.mondayMileage = 0;
        this.updateDailyExpenses('mon');
        this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDetails.tuesdayMiles = 0;
        this.myExpenseDetails.tuesdayMileage = 0;
        this.updateDailyExpenses('tues');
        this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDetails.wednesdayMiles = 0;
        this.myExpenseDetails.wednesdayMileage = 0;
        this.updateDailyExpenses('wed');
        this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDetails.thursdayMiles = 0;
        this.myExpenseDetails.thursdayMileage = 0;
        this.updateDailyExpenses('thur');
        this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDetails.fridayMiles = 0;
        this.myExpenseDetails.fridayMileage = 0;
        this.updateDailyExpenses('fri');
        this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDetails.saturdayMiles = 0;
        this.myExpenseDetails.saturdayMileage = 0;
        this.updateDailyExpenses('sat');
        this.updateWeeklyExpenses();
        break;
    }
  }

  resetMeals(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDetails.sundayMeals = 0;
        this.updateDailyExpenses('sun');
		    this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDetails.mondayMeals = 0;
        this.updateDailyExpenses('mon');
		    this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDetails.tuesdayMeals = 0;
        this.updateDailyExpenses('tues');
		    this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDetails.wednesdayMeals = 0;
        this.updateDailyExpenses('wed');
		    this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDetails.thursdayMeals = 0;
        this.updateDailyExpenses('thur');
		    this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDetails.fridayMeals = 0;
        this.updateDailyExpenses('fri');
		    this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDetails.saturdayMeals = 0;
        this.updateDailyExpenses('sat');
		this.updateWeeklyExpenses();
        break;
    }
  }

  resetPhone(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDetails.sundayPhone = 0;
        this.updateDailyExpenses('sun');
		    this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDetails.mondayPhone = 0;
        this.updateDailyExpenses('mon');
		    this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDetails.tuesdayPhone = 0;
        this.updateDailyExpenses('tues');
		    this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDetails.wednesdayPhone = 0;
        this.updateDailyExpenses('wed');
		    this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDetails.thursdayPhone = 0;
        this.updateDailyExpenses('thur');
		    this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDetails.fridayPhone = 0;
        this.updateDailyExpenses('fri');
		    this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDetails.saturdayPhone = 0;
        this.updateDailyExpenses('sat');
		this.updateWeeklyExpenses();
        break;
    }
  }
  resetOther(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDetails.sundayOther = 0;
        this.updateDailyExpenses('sun');
		    this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDetails.mondayOther = 0;
        this.updateDailyExpenses('mon');
		    this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDetails.tuesdayOther = 0;
        this.updateDailyExpenses('tues');
		    this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDetails.wednesdayOther = 0;
        this.updateDailyExpenses('wed');
		    this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDetails.thursdayOther = 0;
        this.updateDailyExpenses('thur');
		    this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDetails.fridayOther = 0;
        this.updateDailyExpenses('fri');
		    this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDetails.saturdayOther = 0;
        this.updateDailyExpenses('sat');
		this.updateWeeklyExpenses();
        break;
    }
  }

  setPrepaidExpense(value: any) {
    this.myExpenseDetails.prepaidExpense = +value;
  }

  getWeekEndingErrorMessage() {
  if (this.expenseForm.get('weekEnding').hasError('required')) {
    return 'You must enter a week ending date';
  } else if (this.expenseForm.get('weekEnding').hasError('exceedAllowedDateRange')) {
    return 'Please enter a Week Ending Date within the next 7 days.';
  } else if (this.expenseForm.get('weekEnding').hasError('expenseExists')) {
    return 'You already Submitted Expense for this Week Ending.';
  }
  return  this.expenseForm.get('weekEnding').hasError('notSaturday') ? 'Week ending date must be a Saturday date' : '';
  }

  getWeeklyExpenseErrorMessage() {
  if (this.expenseForm.controls.weeklyTotalExpense.hasError('lessThanMin')) {
    return 'Weekly Expenses must be greater than 0';
  }    
  }

  openWarningDialog(warningDialog) {
  if (this.myExpenseDetails.weeklyTotalExpense === 0) {
    this.expenseForm.controls.weeklyTotalExpense.setErrors({lessThanMin: true});
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
