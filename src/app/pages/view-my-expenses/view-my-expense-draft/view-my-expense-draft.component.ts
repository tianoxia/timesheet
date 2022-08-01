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
import { ExpenseResponse, IApiResponse } from 'app/_models';

@Component({
  selector: 'app-view-my-expense-draft',
  templateUrl: './view-my-expense-draft.component.html',
  styleUrls: ['./view-my-expense-draft.component.scss']
})
export class ViewMyExpenseDraftComponent implements OnInit {
  @Input() draftForm: FormGroup;
  expenseId: number;
  mileageRate: number;
  projectvalue: string;
  releaseTimesheet: boolean;
  myExpenseDraftDetails: ExpenseResponse;
  floatLabelControl = new FormControl('auto');
  private filesControl = new FormControl(null, FileUploadValidators.fileSize(10000000)); //10MB is max limit
  constructor(public alertService: AlertService,
    fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService) {
      this.draftForm = fb.group({
        floatLabel: this.floatLabelControl,
        weekEnding: ['', [Validators.required]],
        projectName: '',
        prePaidExpense: '',
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
    this.expenseId = this.route.snapshot.queryParams['expenseid'];
    this.mileageRate = this.route.snapshot.queryParams['mileagerate'];
    this.releaseTimesheet = this.route.snapshot.queryParams['releasetimesheet'] === 'true';
    this.spinner.show();
    this.loadData();
  }  

  private loadData() {
    return this.dataService.getExpenseDraftById(this.expenseId)
        .subscribe(tsInfo => {
          this.myExpenseDraftDetails = tsInfo as ExpenseResponse;          
          this.draftForm.get('weekEnding').patchValue(this.myExpenseDraftDetails.weekEnding);
          this.draftForm.get('projectName').patchValue(this.myExpenseDraftDetails.projectName);
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
          this.myExpenseDraftDetails.sundayHotel = +event.target.value;
          this.myExpenseDraftDetails.sundayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDraftDetails.sundayTravel, this.myExpenseDraftDetails.sundayMarketing, this.myExpenseDraftDetails.sundayMileage,
            this.myExpenseDraftDetails.sundayMeals, this.myExpenseDraftDetails.sundayPhone, this.myExpenseDraftDetails.sundayOther);
          this.updateWeeklyExpenses();
          break;
        case 'mon':
          this.myExpenseDraftDetails.mondayHotel = +event.target.value;
          this.myExpenseDraftDetails.mondayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDraftDetails.mondayTravel, this.myExpenseDraftDetails.mondayMarketing, this.myExpenseDraftDetails.mondayMileage,
            this.myExpenseDraftDetails.mondayMeals, this.myExpenseDraftDetails.mondayPhone, this.myExpenseDraftDetails.mondayOther);
          this.updateWeeklyExpenses();
          break;
        case 'tues':
          this.myExpenseDraftDetails.tuesdayHotel = +event.target.value;
          this.myExpenseDraftDetails.tuesdayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDraftDetails.tuesdayTravel, this.myExpenseDraftDetails.tuesdayMarketing, this.myExpenseDraftDetails.tuesdayMileage,
            this.myExpenseDraftDetails.tuesdayMeals, this.myExpenseDraftDetails.tuesdayPhone, this.myExpenseDraftDetails.tuesdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'wed':
          this.myExpenseDraftDetails.wednesdayHotel = +event.target.value;
          this.myExpenseDraftDetails.wednesdayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDraftDetails.wednesdayTravel, this.myExpenseDraftDetails.wednesdayMarketing, this.myExpenseDraftDetails.wednesdayMileage,
            this.myExpenseDraftDetails.wednesdayMeals, this.myExpenseDraftDetails.wednesdayPhone, this.myExpenseDraftDetails.wednesdayOther);
          this.updateWeeklyExpenses();  
          break;
        case 'thur':
          this.myExpenseDraftDetails.thursdayHotel = +event.target.value;
          this.myExpenseDraftDetails.thursdayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDraftDetails.thursdayTravel, this.myExpenseDraftDetails.thursdayMarketing, this.myExpenseDraftDetails.thursdayMileage,
            this.myExpenseDraftDetails.thursdayMeals, this.myExpenseDraftDetails.thursdayPhone, this.myExpenseDraftDetails.thursdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'fri':
          this.myExpenseDraftDetails.fridayHotel = +event.target.value;
          this.myExpenseDraftDetails.fridayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDraftDetails.fridayTravel, this.myExpenseDraftDetails.fridayMarketing, this.myExpenseDraftDetails.fridayMileage,
            this.myExpenseDraftDetails.fridayMeals, this.myExpenseDraftDetails.fridayPhone, this.myExpenseDraftDetails.fridayOther);
          this.updateWeeklyExpenses();
          break;
        case 'sat':
          this.myExpenseDraftDetails.saturdayHotel = +event.target.value;
          this.myExpenseDraftDetails.saturdayExpenses = this.getDailyExpense(+event.target.value,
            this.myExpenseDraftDetails.saturdayTravel, this.myExpenseDraftDetails.saturdayMarketing, this.myExpenseDraftDetails.saturdayMileage,
            this.myExpenseDraftDetails.saturdayMeals, this.myExpenseDraftDetails.saturdayPhone, this.myExpenseDraftDetails.saturdayOther);
          this.updateWeeklyExpenses();
          break;
      }
    }
    setTravel(event: any, day: any) {
      switch (day) {
        case 'sun':
          this.myExpenseDraftDetails.sundayTravel = +event.target.value;
          this.myExpenseDraftDetails.sundayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.sundayHotel,
            +event.target.value, this.myExpenseDraftDetails.sundayMarketing, this.myExpenseDraftDetails.sundayMileage,
            this.myExpenseDraftDetails.sundayMeals, this.myExpenseDraftDetails.sundayPhone, this.myExpenseDraftDetails.sundayOther);
          this.updateWeeklyExpenses();
          break;
        case 'mon':
          this.myExpenseDraftDetails.mondayTravel = +event.target.value;
          this.myExpenseDraftDetails.mondayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.mondayHotel,
            +event.target.value, this.myExpenseDraftDetails.mondayMarketing, this.myExpenseDraftDetails.mondayMileage,
            this.myExpenseDraftDetails.mondayMeals, this.myExpenseDraftDetails.mondayPhone, this.myExpenseDraftDetails.mondayOther);
          this.updateWeeklyExpenses();
          break;
        case 'tues':
          this.myExpenseDraftDetails.tuesdayTravel = +event.target.value;
          this.myExpenseDraftDetails.tuesdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.tuesdayHotel,
            +event.target.value, this.myExpenseDraftDetails.tuesdayMarketing, this.myExpenseDraftDetails.tuesdayMileage,
            this.myExpenseDraftDetails.tuesdayMeals, this.myExpenseDraftDetails.tuesdayPhone, this.myExpenseDraftDetails.tuesdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'wed':
          this.myExpenseDraftDetails.wednesdayTravel = +event.target.value;
          this.myExpenseDraftDetails.wednesdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.wednesdayHotel,
            +event.target.value, this.myExpenseDraftDetails.wednesdayMarketing, this.myExpenseDraftDetails.wednesdayMileage,
            this.myExpenseDraftDetails.wednesdayMeals, this.myExpenseDraftDetails.wednesdayPhone, this.myExpenseDraftDetails.wednesdayOther);
          this.updateWeeklyExpenses();  
          break;
        case 'thur':
          this.myExpenseDraftDetails.thursdayTravel = +event.target.value;
          this.myExpenseDraftDetails.thursdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.thursdayHotel,
            +event.target.value, this.myExpenseDraftDetails.thursdayMarketing, this.myExpenseDraftDetails.thursdayMileage,
            this.myExpenseDraftDetails.thursdayMeals, this.myExpenseDraftDetails.thursdayPhone, this.myExpenseDraftDetails.thursdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'fri':
          this.myExpenseDraftDetails.fridayTravel = +event.target.value;
          this.myExpenseDraftDetails.fridayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.fridayHotel,
            +event.target.value, this.myExpenseDraftDetails.fridayMarketing, this.myExpenseDraftDetails.fridayMileage,
            this.myExpenseDraftDetails.fridayMeals, this.myExpenseDraftDetails.fridayPhone, this.myExpenseDraftDetails.fridayOther);
          this.updateWeeklyExpenses();
          break;
        case 'sat':
          this.myExpenseDraftDetails.saturdayTravel = +event.target.value;
          this.myExpenseDraftDetails.saturdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.saturdayHotel,
            +event.target.value, this.myExpenseDraftDetails.saturdayMarketing, this.myExpenseDraftDetails.saturdayMileage,
            this.myExpenseDraftDetails.saturdayMeals, this.myExpenseDraftDetails.saturdayPhone, this.myExpenseDraftDetails.saturdayOther);
          this.updateWeeklyExpenses();
          break;
      }
    }
    setMarketing(event: any, day: any) {
      switch (day) {
        case 'sun':
          this.myExpenseDraftDetails.sundayMarketing = +event.target.value;
          this.myExpenseDraftDetails.sundayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.sundayHotel,
            this.myExpenseDraftDetails.sundayTravel, +event.target.value, this.myExpenseDraftDetails.sundayMileage,
            this.myExpenseDraftDetails.sundayMeals, this.myExpenseDraftDetails.sundayPhone, this.myExpenseDraftDetails.sundayOther);
          this.updateWeeklyExpenses();
          break;
        case 'mon':
          this.myExpenseDraftDetails.mondayMarketing = +event.target.value;
          this.myExpenseDraftDetails.mondayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.mondayHotel,
            this.myExpenseDraftDetails.mondayTravel, +event.target.value, this.myExpenseDraftDetails.mondayMileage,
            this.myExpenseDraftDetails.mondayMeals, this.myExpenseDraftDetails.mondayPhone, this.myExpenseDraftDetails.mondayOther);
          this.updateWeeklyExpenses();
          break;
        case 'tues':
          this.myExpenseDraftDetails.tuesdayMarketing = +event.target.value;
          this.myExpenseDraftDetails.tuesdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.tuesdayHotel,
            this.myExpenseDraftDetails.tuesdayTravel, +event.target.value, this.myExpenseDraftDetails.tuesdayMileage,
            this.myExpenseDraftDetails.tuesdayMeals, this.myExpenseDraftDetails.tuesdayPhone, this.myExpenseDraftDetails.tuesdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'wed':
          this.myExpenseDraftDetails.wednesdayMarketing = +event.target.value;
          this.myExpenseDraftDetails.wednesdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.wednesdayHotel,
            this.myExpenseDraftDetails.wednesdayTravel, +event.target.value, this.myExpenseDraftDetails.wednesdayMileage,
            this.myExpenseDraftDetails.wednesdayMeals, this.myExpenseDraftDetails.wednesdayPhone, this.myExpenseDraftDetails.wednesdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'thur':
          this.myExpenseDraftDetails.thursdayMarketing = +event.target.value;
          this.myExpenseDraftDetails.thursdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.thursdayHotel,
            this.myExpenseDraftDetails.thursdayTravel, +event.target.value, this.myExpenseDraftDetails.thursdayMileage,
            this.myExpenseDraftDetails.thursdayMeals, this.myExpenseDraftDetails.thursdayPhone, this.myExpenseDraftDetails.thursdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'fri':
          this.myExpenseDraftDetails.fridayMarketing = +event.target.value;
          this.myExpenseDraftDetails.fridayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.fridayHotel,
            this.myExpenseDraftDetails.fridayTravel, +event.target.value, this.myExpenseDraftDetails.fridayMileage,
            this.myExpenseDraftDetails.fridayMeals, this.myExpenseDraftDetails.fridayPhone, this.myExpenseDraftDetails.fridayOther);
          this.updateWeeklyExpenses();
          break;
        case 'sat':
          this.myExpenseDraftDetails.saturdayMarketing = +event.target.value;
          this.myExpenseDraftDetails.saturdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.saturdayHotel,
            this.myExpenseDraftDetails.saturdayTravel, +event.target.value, this.myExpenseDraftDetails.saturdayMileage,
            this.myExpenseDraftDetails.saturdayMeals, this.myExpenseDraftDetails.saturdayPhone, this.myExpenseDraftDetails.saturdayOther);
          this.updateWeeklyExpenses();
          break;
      }
    }

    setMileage(event: any, day: any) {  
      switch (day) {
        case 'sun':
          this.myExpenseDraftDetails.sundayMiles = +event.target.value;
          this.myExpenseDraftDetails.sundayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('sun');          
          this.updateWeeklyExpenses();
          break;
        case 'mon':
          this.myExpenseDraftDetails.mondayMiles = +event.target.value;
          this.myExpenseDraftDetails.mondayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('mon');
          this.updateWeeklyExpenses();
          break;
        case 'tues':
          this.myExpenseDraftDetails.tuesdayMiles = +event.target.value;
          this.myExpenseDraftDetails.tuesdayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('tues');
          this.updateWeeklyExpenses();
          break;
        case 'wed':
          this.myExpenseDraftDetails.wednesdayMiles = +event.target.value;
          this.myExpenseDraftDetails.wednesdayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('wed');
          this.updateWeeklyExpenses();
          break;
        case 'thur':
          this.myExpenseDraftDetails.thursdayMiles = +event.target.value;
          this.myExpenseDraftDetails.thursdayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('thur');
          this.updateWeeklyExpenses();
          break;
        case 'fri':
          this.myExpenseDraftDetails.fridayMiles = +event.target.value;
          this.myExpenseDraftDetails.fridayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('fri');
          this.updateWeeklyExpenses();
          break;
        case 'sat':
          this.myExpenseDraftDetails.saturdayMiles = +event.target.value;
          this.myExpenseDraftDetails.saturdayMileage = +event.target.value * this.mileageRate;
          this.updateDailyExpenses('sat');
          this.updateWeeklyExpenses();
          break;
      }
    }

    setMeals(event: any, day: any) {  
      switch (day) {
        case 'sun':
          this.myExpenseDraftDetails.sundayMeals = +event.target.value;
          this.myExpenseDraftDetails.sundayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.sundayHotel,
            this.myExpenseDraftDetails.sundayTravel, this.myExpenseDraftDetails.sundayMarketing, this.myExpenseDraftDetails.sundayMileage,
			      +event.target.value, this.myExpenseDraftDetails.sundayPhone, this.myExpenseDraftDetails.sundayOther);
          this.updateWeeklyExpenses();
          break;
        case 'mon':
          this.myExpenseDraftDetails.mondayMeals = +event.target.value;
          this.myExpenseDraftDetails.mondayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.mondayHotel,
            this.myExpenseDraftDetails.mondayTravel, this.myExpenseDraftDetails.mondayMarketing, this.myExpenseDraftDetails.mondayMileage,
			      +event.target.value, this.myExpenseDraftDetails.mondayPhone, this.myExpenseDraftDetails.mondayOther);
          this.updateWeeklyExpenses();
          break;
        case 'tues':
          this.myExpenseDraftDetails.tuesdayMeals = +event.target.value;
          this.myExpenseDraftDetails.tuesdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.tuesdayHotel,
            this.myExpenseDraftDetails.tuesdayTravel, this.myExpenseDraftDetails.tuesdayMarketing, this.myExpenseDraftDetails.tuesdayMileage,
			      +event.target.value, this.myExpenseDraftDetails.tuesdayPhone, this.myExpenseDraftDetails.tuesdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'wed':
          this.myExpenseDraftDetails.wednesdayMeals = +event.target.value;
          this.myExpenseDraftDetails.wednesdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.wednesdayHotel,
            this.myExpenseDraftDetails.wednesdayTravel, this.myExpenseDraftDetails.wednesdayMarketing, this.myExpenseDraftDetails.wednesdayMileage,
			      +event.target.value, this.myExpenseDraftDetails.wednesdayPhone, this.myExpenseDraftDetails.wednesdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'thur':
          this.myExpenseDraftDetails.thursdayMeals = +event.target.value;
          this.myExpenseDraftDetails.thursdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.thursdayHotel,
            this.myExpenseDraftDetails.thursdayTravel, this.myExpenseDraftDetails.thursdayMarketing, this.myExpenseDraftDetails.thursdayMileage,
			      +event.target.value, this.myExpenseDraftDetails.thursdayPhone, this.myExpenseDraftDetails.thursdayOther);
          this.updateWeeklyExpenses();
          break;
        case 'fri':
          this.myExpenseDraftDetails.fridayMeals = +event.target.value;
          this.myExpenseDraftDetails.fridayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.fridayHotel,
            this.myExpenseDraftDetails.fridayTravel, this.myExpenseDraftDetails.fridayMarketing, this.myExpenseDraftDetails.fridayMileage,
			      +event.target.value, this.myExpenseDraftDetails.fridayPhone, this.myExpenseDraftDetails.fridayOther);
          this.updateWeeklyExpenses();
          break;
        case 'sat':
          this.myExpenseDraftDetails.saturdayMeals = +event.target.value;
          this.myExpenseDraftDetails.saturdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.saturdayHotel,
            this.myExpenseDraftDetails.saturdayTravel, this.myExpenseDraftDetails.saturdayMarketing, this.myExpenseDraftDetails.saturdayMileage,
			      +event.target.value, this.myExpenseDraftDetails.saturdayPhone, this.myExpenseDraftDetails.saturdayOther);
          this.updateWeeklyExpenses();
          break;
      }
    }

    setPhone(event: any, day: any) {  
      switch (day) {
        case 'sun':
          this.myExpenseDraftDetails.sundayPhone = +event.target.value;
          this.myExpenseDraftDetails.sundayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.sundayHotel,
            this.myExpenseDraftDetails.sundayTravel, this.myExpenseDraftDetails.sundayMarketing, this.myExpenseDraftDetails.sundayMileage,
			      this.myExpenseDraftDetails.sundayMeals, +event.target.value, this.myExpenseDraftDetails.sundayOther);
          this.updateWeeklyExpenses();
          break;
          case 'mon':
            this.myExpenseDraftDetails.mondayPhone = +event.target.value;
            this.myExpenseDraftDetails.mondayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.mondayHotel,
              this.myExpenseDraftDetails.mondayTravel, this.myExpenseDraftDetails.mondayMarketing, this.myExpenseDraftDetails.mondayMileage,
              this.myExpenseDraftDetails.mondayMeals, +event.target.value, this.myExpenseDraftDetails.mondayOther);
            this.updateWeeklyExpenses();
            break;
          case 'tues':
            this.myExpenseDraftDetails.tuesdayPhone = +event.target.value;
            this.myExpenseDraftDetails.tuesdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.tuesdayHotel,
              this.myExpenseDraftDetails.tuesdayTravel, this.myExpenseDraftDetails.tuesdayMarketing, this.myExpenseDraftDetails.tuesdayMileage,
              this.myExpenseDraftDetails.tuesdayMeals, +event.target.value, this.myExpenseDraftDetails.tuesdayOther);
            this.updateWeeklyExpenses();
            break;
          case 'wed':
            this.myExpenseDraftDetails.wednesdayPhone = +event.target.value;
            this.myExpenseDraftDetails.wednesdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.wednesdayHotel,
              this.myExpenseDraftDetails.wednesdayTravel, this.myExpenseDraftDetails.wednesdayMarketing, this.myExpenseDraftDetails.wednesdayMileage,
              this.myExpenseDraftDetails.wednesdayMeals, +event.target.value, this.myExpenseDraftDetails.wednesdayOther);
            this.updateWeeklyExpenses();
            break;
          case 'thur':
            this.myExpenseDraftDetails.thursdayPhone = +event.target.value;
            this.myExpenseDraftDetails.thursdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.thursdayHotel,
              this.myExpenseDraftDetails.thursdayTravel, this.myExpenseDraftDetails.thursdayMarketing, this.myExpenseDraftDetails.thursdayMileage,
              this.myExpenseDraftDetails.thursdayMeals, +event.target.value, this.myExpenseDraftDetails.thursdayOther);
            this.updateWeeklyExpenses();
            break;
          case 'fri':
            this.myExpenseDraftDetails.fridayPhone = +event.target.value;
            this.myExpenseDraftDetails.fridayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.fridayHotel,
              this.myExpenseDraftDetails.fridayTravel, this.myExpenseDraftDetails.fridayMarketing, this.myExpenseDraftDetails.fridayMileage,
              this.myExpenseDraftDetails.fridayMeals, +event.target.value, this.myExpenseDraftDetails.fridayOther);
            this.updateWeeklyExpenses();
            break;
          case 'sat':
            this.myExpenseDraftDetails.saturdayPhone = +event.target.value;
            this.myExpenseDraftDetails.saturdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.saturdayHotel,
              this.myExpenseDraftDetails.saturdayTravel, this.myExpenseDraftDetails.saturdayMarketing, this.myExpenseDraftDetails.saturdayMileage,
              this.myExpenseDraftDetails.saturdayMeals, +event.target.value, this.myExpenseDraftDetails.saturdayOther);
            this.updateWeeklyExpenses();
            break;
      }
    }

    setOther(event: any, day: any) {  
      switch (day) {
          case 'sun':
            this.myExpenseDraftDetails.sundayOther = +event.target.value;
            this.myExpenseDraftDetails.sundayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.sundayHotel,
              this.myExpenseDraftDetails.sundayTravel, this.myExpenseDraftDetails.sundayMarketing, this.myExpenseDraftDetails.sundayMileage,
              this.myExpenseDraftDetails.sundayMeals, +event.target.value, this.myExpenseDraftDetails.sundayPhone);
            this.updateWeeklyExpenses();
            break;
          case 'mon':
            this.myExpenseDraftDetails.mondayOther = +event.target.value;
            this.myExpenseDraftDetails.mondayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.mondayHotel,
              this.myExpenseDraftDetails.mondayTravel, this.myExpenseDraftDetails.mondayMarketing, this.myExpenseDraftDetails.mondayMileage,
              this.myExpenseDraftDetails.mondayMeals, this.myExpenseDraftDetails.mondayPhone, +event.target.value);
            this.updateWeeklyExpenses();
            break;
          case 'tues':
            this.myExpenseDraftDetails.tuesdayOther = +event.target.value;
            this.myExpenseDraftDetails.tuesdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.tuesdayHotel,
              this.myExpenseDraftDetails.tuesdayTravel, this.myExpenseDraftDetails.tuesdayMarketing, this.myExpenseDraftDetails.tuesdayMileage,
              this.myExpenseDraftDetails.tuesdayMeals, this.myExpenseDraftDetails.tuesdayPhone, +event.target.value);
            this.updateWeeklyExpenses();
            break;
          case 'wed':
            this.myExpenseDraftDetails.wednesdayOther = +event.target.value;
            this.myExpenseDraftDetails.wednesdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.wednesdayHotel,
              this.myExpenseDraftDetails.wednesdayTravel, this.myExpenseDraftDetails.wednesdayMarketing, this.myExpenseDraftDetails.wednesdayMileage,
              this.myExpenseDraftDetails.wednesdayMeals, this.myExpenseDraftDetails.wednesdayPhone, +event.target.value);
            this.updateWeeklyExpenses();
            break;
          case 'thur':
            this.myExpenseDraftDetails.thursdayOther = +event.target.value;
            this.myExpenseDraftDetails.thursdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.thursdayHotel,
              this.myExpenseDraftDetails.thursdayTravel, this.myExpenseDraftDetails.thursdayMarketing, this.myExpenseDraftDetails.thursdayMileage,
              this.myExpenseDraftDetails.thursdayMeals, this.myExpenseDraftDetails.thursdayPhone, +event.target.value);
            this.updateWeeklyExpenses();
            break;
          case 'fri':
            this.myExpenseDraftDetails.fridayOther = +event.target.value;
            this.myExpenseDraftDetails.fridayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.fridayHotel,
              this.myExpenseDraftDetails.fridayTravel, this.myExpenseDraftDetails.fridayMarketing, this.myExpenseDraftDetails.fridayMileage,
              this.myExpenseDraftDetails.fridayMeals, this.myExpenseDraftDetails.fridayPhone, +event.target.value);
            this.updateWeeklyExpenses();
            break;
          case 'sat':
            this.myExpenseDraftDetails.saturdayOther = +event.target.value;
            this.myExpenseDraftDetails.saturdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.saturdayHotel,
              this.myExpenseDraftDetails.saturdayTravel, this.myExpenseDraftDetails.saturdayMarketing, this.myExpenseDraftDetails.saturdayMileage,
              this.myExpenseDraftDetails.saturdayMeals, this.myExpenseDraftDetails.saturdayPhone, +event.target.value);
            this.updateWeeklyExpenses();
            break;
        }
      }

    updateDailyExpenses(day: any): void {
      switch(day) {
        case 'sun':
          this.myExpenseDraftDetails.sundayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.sundayHotel,
            this.myExpenseDraftDetails.sundayTravel, this.myExpenseDraftDetails.sundayMarketing, this.myExpenseDraftDetails.sundayMileage,
            this.myExpenseDraftDetails.sundayMeals, this.myExpenseDraftDetails.sundayPhone, this.myExpenseDraftDetails.sundayOther);
          break;
        case 'mon':
          this.myExpenseDraftDetails.mondayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.mondayHotel,
            this.myExpenseDraftDetails.mondayTravel, this.myExpenseDraftDetails.mondayMarketing, this.myExpenseDraftDetails.mondayMileage,
            this.myExpenseDraftDetails.mondayMeals, this.myExpenseDraftDetails.mondayPhone, this.myExpenseDraftDetails.mondayOther);
          break;
        case 'tues':
          this.myExpenseDraftDetails.tuesdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.tuesdayHotel,
            this.myExpenseDraftDetails.tuesdayTravel, this.myExpenseDraftDetails.tuesdayMarketing, this.myExpenseDraftDetails.tuesdayMileage,
            this.myExpenseDraftDetails.tuesdayMeals, this.myExpenseDraftDetails.tuesdayPhone, this.myExpenseDraftDetails.tuesdayOther);
          break;
        case 'wed':
          this.myExpenseDraftDetails.wednesdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.wednesdayHotel,
            this.myExpenseDraftDetails.wednesdayTravel, this.myExpenseDraftDetails.wednesdayMarketing, this.myExpenseDraftDetails.wednesdayMileage,
            this.myExpenseDraftDetails.wednesdayMeals, this.myExpenseDraftDetails.wednesdayPhone, this.myExpenseDraftDetails.wednesdayOther);
          break;
        case 'thur':
          this.myExpenseDraftDetails.thursdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.thursdayHotel,
            this.myExpenseDraftDetails.thursdayTravel, this.myExpenseDraftDetails.thursdayMarketing, this.myExpenseDraftDetails.thursdayMileage,
            this.myExpenseDraftDetails.thursdayMeals, this.myExpenseDraftDetails.thursdayPhone, this.myExpenseDraftDetails.thursdayOther);
          break;
        case 'fri':
          this.myExpenseDraftDetails.fridayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.fridayHotel,
            this.myExpenseDraftDetails.fridayTravel, this.myExpenseDraftDetails.fridayMarketing, this.myExpenseDraftDetails.fridayMileage,
            this.myExpenseDraftDetails.fridayMeals, this.myExpenseDraftDetails.fridayPhone, this.myExpenseDraftDetails.fridayOther);
          break;
        case 'sat':
          this.myExpenseDraftDetails.saturdayExpenses = this.getDailyExpense(this.myExpenseDraftDetails.saturdayHotel,
            this.myExpenseDraftDetails.saturdayTravel, this.myExpenseDraftDetails.saturdayMarketing, this.myExpenseDraftDetails.saturdayMileage,
            this.myExpenseDraftDetails.saturdayMeals, this.myExpenseDraftDetails.saturdayPhone, this.myExpenseDraftDetails.saturdayOther);
          break;
      }
    }

    private updateWeeklyExpenses(): void {
      this.myExpenseDraftDetails.weeklyTotalExpense = this.myExpenseDraftDetails.sundayExpenses + this.myExpenseDraftDetails.mondayExpenses
      + this.myExpenseDraftDetails.tuesdayExpenses + this.myExpenseDraftDetails.wednesdayExpenses + this.myExpenseDraftDetails.thursdayExpenses
      + this.myExpenseDraftDetails.fridayExpenses + this.myExpenseDraftDetails.saturdayExpenses;
      if (this.myExpenseDraftDetails.weeklyTotalExpense === 0) {
        this.draftForm.controls.weeklyTotalExpense.setErrors({lessThanMin: true});
      } else {
        this.draftForm.controls.weeklyTotalExpense.setErrors(null);
      }
    }

    public submitDraft = () => {
      if (this.myExpenseDraftDetails.weeklyTotalExpense === 0) {
        this.draftForm.controls.weeklyTotalExpense.setErrors({lessThanMin: true});
        return;
      }
      if (this.draftForm.valid) {
        this.spinner.show();
        this.executeUpdateExpenseDraft();
      }
    };
  
    private executeUpdateExpenseDraft = () => {
      const request = this.setExpenseDraftRequest() as FormData;
      this.dataService.updateExpenseDraft(request)
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
    private setExpenseDraftRequest(): FormData {
      const formData = new FormData();
      if (this.draftForm.get('files').value !== null) {
        this.draftForm.get('files').value.forEach((f) => formData.append('files', f));
      }
      formData.append('expenseId', this.myExpenseDraftDetails.expenseId.toString());
      formData.append('assignmentId', this.myExpenseDraftDetails.assignmentId.toString());
      formData.append('contractorName', this.myExpenseDraftDetails.contractorName);
      formData.append('contractorId', this.myExpenseDraftDetails.contractorId.toString());
      formData.append('weekEnding', this.draftForm.controls.weekEnding.value);
      formData.append('projectName', this.draftForm.controls.projectName.value);
      formData.append('prepaidExpense', this.myExpenseDraftDetails.prePaidExpense.toString());
      formData.append('mondayDate', this.myExpenseDraftDetails.mondayDate.toString());
      formData.append('tuesdayDate', this.myExpenseDraftDetails.tuesdayDate.toString());
      formData.append('wednesdayDate', this.myExpenseDraftDetails.wednesdayDate.toString());
      formData.append('thursdayDate', this.myExpenseDraftDetails.thursdayDate.toString());
      formData.append('fridayDate', this.myExpenseDraftDetails.fridayDate.toString());
      formData.append('saturdayDate', this.myExpenseDraftDetails.saturdayDate.toString());
      formData.append('sundayDate', this.myExpenseDraftDetails.sundayDate.toString());
      formData.append('mondayHotel', this.myExpenseDraftDetails.mondayHotel.toString());
      formData.append('mondayTravel', this.myExpenseDraftDetails.mondayTravel.toString());
      formData.append('mondayMarketing', this.myExpenseDraftDetails.mondayMarketing.toString());
      formData.append('mondayMiles', this.myExpenseDraftDetails.mondayMiles.toString());
	    formData.append('mondayMileage', this.myExpenseDraftDetails.mondayMileage.toString());
      formData.append('mondayMeals', this.myExpenseDraftDetails.mondayMeals.toString());
      formData.append('mondayPhone', this.myExpenseDraftDetails.mondayPhone.toString());
      formData.append('mondayOther', this.myExpenseDraftDetails.mondayOther.toString());
      formData.append('mondayExpenses', this.myExpenseDraftDetails.mondayExpenses.toString());
      formData.append('tuesdayHotel', this.myExpenseDraftDetails.tuesdayHotel.toString());
      formData.append('tuesdayTravel', this.myExpenseDraftDetails.tuesdayTravel.toString());
      formData.append('tuesdayMarketing', this.myExpenseDraftDetails.tuesdayMarketing.toString());
      formData.append('tuesdayMiles', this.myExpenseDraftDetails.tuesdayMiles.toString());
	    formData.append('tuesdayMileage', this.myExpenseDraftDetails.tuesdayMileage.toString());
      formData.append('tuesdayMeals', this.myExpenseDraftDetails.tuesdayMeals.toString());
      formData.append('tuesdayPhone', this.myExpenseDraftDetails.tuesdayPhone.toString());
      formData.append('tuesdayOther', this.myExpenseDraftDetails.tuesdayOther.toString());
      formData.append('tuesdayExpenses', this.myExpenseDraftDetails.tuesdayExpenses.toString());
      formData.append('wednesdayHotel', this.myExpenseDraftDetails.wednesdayHotel.toString());
      formData.append('wednesdayTravel', this.myExpenseDraftDetails.wednesdayTravel.toString());
      formData.append('wednesdayMarketing', this.myExpenseDraftDetails.wednesdayMarketing.toString());
      formData.append('wednesdayMiles', this.myExpenseDraftDetails.wednesdayMiles.toString());
	    formData.append('wednesdayMileage', this.myExpenseDraftDetails.wednesdayMileage.toString());
      formData.append('wednesdayMeals', this.myExpenseDraftDetails.wednesdayMeals.toString());
      formData.append('wednesdayPhone', this.myExpenseDraftDetails.wednesdayPhone.toString());
      formData.append('wednesdayOther', this.myExpenseDraftDetails.wednesdayOther.toString());
      formData.append('wednesdayExpenses', this.myExpenseDraftDetails.wednesdayExpenses.toString());
      formData.append('thursdayHotel', this.myExpenseDraftDetails.thursdayHotel.toString());
      formData.append('thursdayTravel', this.myExpenseDraftDetails.thursdayTravel.toString());
      formData.append('thursdayMarketing', this.myExpenseDraftDetails.thursdayMarketing.toString());
      formData.append('thursdayMiles', this.myExpenseDraftDetails.thursdayMiles.toString());
	    formData.append('thursdayMileage', this.myExpenseDraftDetails.thursdayMileage.toString());
      formData.append('thursdayMeals', this.myExpenseDraftDetails.thursdayMeals.toString());
      formData.append('thursdayPhone', this.myExpenseDraftDetails.thursdayPhone.toString());
      formData.append('thursdayOther', this.myExpenseDraftDetails.thursdayOther.toString());
      formData.append('thursdayExpenses', this.myExpenseDraftDetails.thursdayExpenses.toString());
      formData.append('fridayHotel', this.myExpenseDraftDetails.fridayHotel.toString());
      formData.append('fridayTravel', this.myExpenseDraftDetails.fridayTravel.toString());
      formData.append('fridayMarketing', this.myExpenseDraftDetails.fridayMarketing.toString());
      formData.append('fridayMiles', this.myExpenseDraftDetails.fridayMiles.toString());
	    formData.append('fridayMileage', this.myExpenseDraftDetails.fridayMileage.toString());
      formData.append('fridayMeals', this.myExpenseDraftDetails.fridayMeals.toString());
      formData.append('fridayPhone', this.myExpenseDraftDetails.fridayPhone.toString());
      formData.append('fridayOther', this.myExpenseDraftDetails.fridayOther.toString());
      formData.append('fridayExpenses', this.myExpenseDraftDetails.fridayExpenses.toString());
      formData.append('saturdayHotel', this.myExpenseDraftDetails.saturdayHotel.toString());
      formData.append('saturdayTravel', this.myExpenseDraftDetails.saturdayTravel.toString());
      formData.append('saturdayMarketing', this.myExpenseDraftDetails.saturdayMarketing.toString());
      formData.append('saturdayMiles', this.myExpenseDraftDetails.saturdayMiles.toString());
	    formData.append('saturdayMileage', this.myExpenseDraftDetails.saturdayMileage.toString());
      formData.append('saturdayMeals', this.myExpenseDraftDetails.saturdayMeals.toString());
      formData.append('saturdayPhone', this.myExpenseDraftDetails.saturdayPhone.toString());
      formData.append('saturdayOther', this.myExpenseDraftDetails.saturdayOther.toString());
      formData.append('saturdayExpenses', this.myExpenseDraftDetails.saturdayExpenses.toString());
      formData.append('sundayHotel', this.myExpenseDraftDetails.sundayHotel.toString());
      formData.append('sundayTravel', this.myExpenseDraftDetails.sundayTravel.toString());
      formData.append('sundayMarketing', this.myExpenseDraftDetails.sundayMarketing.toString());
      formData.append('sundayMiles', this.myExpenseDraftDetails.sundayMiles.toString());
	    formData.append('sundayMileage', this.myExpenseDraftDetails.sundayMileage.toString());
      formData.append('sundayMeals', this.myExpenseDraftDetails.sundayMeals.toString());
      formData.append('sundayPhone', this.myExpenseDraftDetails.sundayPhone.toString());
      formData.append('sundayOther', this.myExpenseDraftDetails.sundayOther.toString());
      formData.append('sundayExpenses', this.myExpenseDraftDetails.sundayExpenses.toString());
      formData.append('isDraft', 'true');
      return formData;
    }

  submitExpense() {
    const request = this.setExpenseRequest() as FormData;
    this.dataService.updateExpense(request)
    .pipe(first())
    .subscribe((response: IApiResponse) => {
      window.scrollTo(0, 0);
      this.alertService.success(response.message);    
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
      formData.append('expenseId', this.myExpenseDraftDetails.expenseId.toString());
      formData.append('assignmentId', this.myExpenseDraftDetails.assignmentId.toString());
      formData.append('contractorName', this.myExpenseDraftDetails.contractorName);
      formData.append('contractorId', this.myExpenseDraftDetails.contractorId.toString());
      formData.append('weekEnding', this.draftForm.controls.weekEnding.value);
      formData.append('projectName', this.draftForm.controls.projectName.value);
      formData.append('prepaidExpense', this.myExpenseDraftDetails.prePaidExpense.toString());
      formData.append('mondayDate', this.myExpenseDraftDetails.mondayDate.toString());
      formData.append('tuesdayDate', this.myExpenseDraftDetails.tuesdayDate.toString());
      formData.append('wednesdayDate', this.myExpenseDraftDetails.wednesdayDate.toString());
      formData.append('thursdayDate', this.myExpenseDraftDetails.thursdayDate.toString());
      formData.append('fridayDate', this.myExpenseDraftDetails.fridayDate.toString());
      formData.append('saturdayDate', this.myExpenseDraftDetails.saturdayDate.toString());
      formData.append('sundayDate', this.myExpenseDraftDetails.sundayDate.toString());
      formData.append('mondayHotel', this.myExpenseDraftDetails.mondayHotel.toString());
      formData.append('mondayTravel', this.myExpenseDraftDetails.mondayTravel.toString());
      formData.append('mondayMarketing', this.myExpenseDraftDetails.mondayMarketing.toString());
      formData.append('mondayMiles', this.myExpenseDraftDetails.mondayMiles.toString());
	    formData.append('mondayMileage', this.myExpenseDraftDetails.mondayMileage.toString());
      formData.append('mondayMeals', this.myExpenseDraftDetails.mondayMeals.toString());
      formData.append('mondayPhone', this.myExpenseDraftDetails.mondayPhone.toString());
      formData.append('mondayOther', this.myExpenseDraftDetails.mondayOther.toString());
      formData.append('mondayExpenses', this.myExpenseDraftDetails.mondayExpenses.toString());
      formData.append('tuesdayHotel', this.myExpenseDraftDetails.tuesdayHotel.toString());
      formData.append('tuesdayTravel', this.myExpenseDraftDetails.tuesdayTravel.toString());
      formData.append('tuesdayMarketing', this.myExpenseDraftDetails.tuesdayMarketing.toString());
      formData.append('tuesdayMiles', this.myExpenseDraftDetails.tuesdayMiles.toString());
	    formData.append('tuesdayMileage', this.myExpenseDraftDetails.tuesdayMileage.toString());
      formData.append('tuesdayMeals', this.myExpenseDraftDetails.tuesdayMeals.toString());
      formData.append('tuesdayPhone', this.myExpenseDraftDetails.tuesdayPhone.toString());
      formData.append('tuesdayOther', this.myExpenseDraftDetails.tuesdayOther.toString());
      formData.append('tuesdayExpenses', this.myExpenseDraftDetails.tuesdayExpenses.toString());
      formData.append('wednesdayHotel', this.myExpenseDraftDetails.wednesdayHotel.toString());
      formData.append('wednesdayTravel', this.myExpenseDraftDetails.wednesdayTravel.toString());
      formData.append('wednesdayMarketing', this.myExpenseDraftDetails.wednesdayMarketing.toString());
      formData.append('wednesdayMiles', this.myExpenseDraftDetails.wednesdayMiles.toString());
	    formData.append('wednesdayMileage', this.myExpenseDraftDetails.wednesdayMileage.toString());
      formData.append('wednesdayMeals', this.myExpenseDraftDetails.wednesdayMeals.toString());
      formData.append('wednesdayPhone', this.myExpenseDraftDetails.wednesdayPhone.toString());
      formData.append('wednesdayOther', this.myExpenseDraftDetails.wednesdayOther.toString());
      formData.append('wednesdayExpenses', this.myExpenseDraftDetails.wednesdayExpenses.toString());
      formData.append('thursdayHotel', this.myExpenseDraftDetails.thursdayHotel.toString());
      formData.append('thursdayTravel', this.myExpenseDraftDetails.thursdayTravel.toString());
      formData.append('thursdayMarketing', this.myExpenseDraftDetails.thursdayMarketing.toString());
      formData.append('thursdayMiles', this.myExpenseDraftDetails.thursdayMiles.toString());
	    formData.append('thursdayMileage', this.myExpenseDraftDetails.thursdayMileage.toString());
      formData.append('thursdayMeals', this.myExpenseDraftDetails.thursdayMeals.toString());
      formData.append('thursdayPhone', this.myExpenseDraftDetails.thursdayPhone.toString());
      formData.append('thursdayOther', this.myExpenseDraftDetails.thursdayOther.toString());
      formData.append('thursdayExpenses', this.myExpenseDraftDetails.thursdayExpenses.toString());
      formData.append('fridayHotel', this.myExpenseDraftDetails.fridayHotel.toString());
      formData.append('fridayTravel', this.myExpenseDraftDetails.fridayTravel.toString());
      formData.append('fridayMarketing', this.myExpenseDraftDetails.fridayMarketing.toString());
      formData.append('fridayMiles', this.myExpenseDraftDetails.fridayMiles.toString());
	    formData.append('fridayMileage', this.myExpenseDraftDetails.fridayMileage.toString());
      formData.append('fridayMeals', this.myExpenseDraftDetails.fridayMeals.toString());
      formData.append('fridayPhone', this.myExpenseDraftDetails.fridayPhone.toString());
      formData.append('fridayOther', this.myExpenseDraftDetails.fridayOther.toString());
      formData.append('fridayExpenses', this.myExpenseDraftDetails.fridayExpenses.toString());
      formData.append('saturdayHotel', this.myExpenseDraftDetails.saturdayHotel.toString());
      formData.append('saturdayTravel', this.myExpenseDraftDetails.saturdayTravel.toString());
      formData.append('saturdayMarketing', this.myExpenseDraftDetails.saturdayMarketing.toString());
      formData.append('saturdayMiles', this.myExpenseDraftDetails.saturdayMiles.toString());
	    formData.append('saturdayMileage', this.myExpenseDraftDetails.saturdayMileage.toString());
      formData.append('saturdayMeals', this.myExpenseDraftDetails.saturdayMeals.toString());
      formData.append('saturdayPhone', this.myExpenseDraftDetails.saturdayPhone.toString());
      formData.append('saturdayOther', this.myExpenseDraftDetails.saturdayOther.toString());
      formData.append('saturdayExpenses', this.myExpenseDraftDetails.saturdayExpenses.toString());
      formData.append('sundayHotel', this.myExpenseDraftDetails.sundayHotel.toString());
      formData.append('sundayTravel', this.myExpenseDraftDetails.sundayTravel.toString());
      formData.append('sundayMarketing', this.myExpenseDraftDetails.sundayMarketing.toString());
      formData.append('sundayMiles', this.myExpenseDraftDetails.sundayMiles.toString());
	    formData.append('sundayMileage', this.myExpenseDraftDetails.sundayMileage.toString());
      formData.append('sundayMeals', this.myExpenseDraftDetails.sundayMeals.toString());
      formData.append('sundayPhone', this.myExpenseDraftDetails.sundayPhone.toString());
      formData.append('sundayOther', this.myExpenseDraftDetails.sundayOther.toString());
      formData.append('sundayExpenses', this.myExpenseDraftDetails.sundayExpenses.toString());
      formData.append('isDraft', 'false');
      return formData;
  }

  private getDailyExpense(hotel: number, travel: number, marketing, mileage, meals, phone, other): number {
    let sum = [hotel, travel, marketing, mileage, meals, phone, other].reduce((a,b)=>a+b);
    return Math.round(sum*100)/100; //round to 2 decimal places
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        if (event.value.getDay() === 6) {
          this.draftForm.controls.weekEnding.setErrors(null);
          this.myExpenseDraftDetails.weekEnding = new Date(event.value);
          this.myExpenseDraftDetails.mondayDate = new Date(event.value);
          this.myExpenseDraftDetails.mondayDate.setDate(this.myExpenseDraftDetails.mondayDate.getDate() - 5);
          this.myExpenseDraftDetails.tuesdayDate = new Date(event.value);
          this.myExpenseDraftDetails.tuesdayDate.setDate(this.myExpenseDraftDetails.tuesdayDate.getDate() - 4);
          this.myExpenseDraftDetails.wednesdayDate = new Date(event.value);
          this.myExpenseDraftDetails.wednesdayDate.setDate(this.myExpenseDraftDetails.wednesdayDate.getDate() - 3);
          this.myExpenseDraftDetails.thursdayDate = new Date(event.value);
          this.myExpenseDraftDetails.thursdayDate.setDate(this.myExpenseDraftDetails.thursdayDate.getDate() - 2);
          this.myExpenseDraftDetails.fridayDate = new Date(event.value);
          this.myExpenseDraftDetails.fridayDate.setDate(this.myExpenseDraftDetails.fridayDate.getDate() - 1);
          this.myExpenseDraftDetails.sundayDate = new Date(event.value);
          this.myExpenseDraftDetails.sundayDate.setDate(this.myExpenseDraftDetails.sundayDate.getDate() - 6);
        } else {
          this.draftForm.controls.weekEnding.setErrors({notSaturday: true});
          return false;
        }
        let oneWeekLater: Date = new Date();
        const sevenDays=new Date().getDate()+7;
        if (this.myExpenseDraftDetails.saturdayDate>new Date(oneWeekLater.setDate(sevenDays))) {
          this.draftForm.controls.weekEnding.setErrors({exceedAllowedDateRange: true});
          return false;
        }
        this.spinner.show();
        this.dataService.expenseExists(this.myExpenseDraftDetails.assignmentId, this.datePipe.transform(this.myExpenseDraftDetails.weekEnding, 'yyyy-MM-dd'))
        .subscribe((response: boolean) => {
          if (response) {
            this.draftForm.controls.weekEnding.setErrors({expenseExists: true});
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

  resetPrepaidExpense() {
    this.myExpenseDraftDetails.prePaidExpense = 0;
  }

  resetHotel(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDraftDetails.sundayHotel = 0;
        this.updateDailyExpenses('sun');
        this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDraftDetails.mondayHotel = 0;
        this.updateDailyExpenses('mon');
        this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDraftDetails.tuesdayHotel = 0;
        this.updateDailyExpenses('tues');
        this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDraftDetails.wednesdayHotel = 0;
        this.updateDailyExpenses('wed');
        this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDraftDetails.thursdayHotel = 0;
        this.updateDailyExpenses('thur');
        this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDraftDetails.fridayHotel = 0;
        this.updateDailyExpenses('fri');
        this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDraftDetails.saturdayHotel = 0;
        this.updateDailyExpenses('sat');
        this.updateWeeklyExpenses();
        break;
    }
  }

  resetTravel(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDraftDetails.sundayTravel = 0;
        this.updateDailyExpenses('sun');
        this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDraftDetails.mondayTravel = 0;
        this.updateDailyExpenses('mon');
        this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDraftDetails.tuesdayTravel = 0;
        this.updateDailyExpenses('tues');
        this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDraftDetails.wednesdayTravel = 0;
        this.updateDailyExpenses('wed');
        this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDraftDetails.thursdayTravel = 0;
        this.updateDailyExpenses('thur');
        this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDraftDetails.fridayTravel = 0;
        this.updateDailyExpenses('fri');
        this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDraftDetails.saturdayTravel = 0;
        this.updateDailyExpenses('sat');
        this.updateWeeklyExpenses();
        break;
    }
  }

  resetMarketing(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDraftDetails.sundayMarketing = 0;
        this.updateDailyExpenses('sun');
		this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDraftDetails.mondayMarketing = 0;
        this.updateDailyExpenses('mon');
		this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDraftDetails.tuesdayMarketing = 0;
        this.updateDailyExpenses('tues');
		this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDraftDetails.wednesdayMarketing = 0;
        this.updateDailyExpenses('wed');
		this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDraftDetails.thursdayMarketing = 0;
        this.updateDailyExpenses('thur');
		this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDraftDetails.fridayMarketing = 0;
        this.updateDailyExpenses('fri');
		this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDraftDetails.saturdayMarketing = 0;
        this.updateDailyExpenses('sat');
		this.updateWeeklyExpenses();
        break;
    }
  }

  resetMiles(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDraftDetails.sundayMiles = 0;
        this.myExpenseDraftDetails.sundayMileage = 0;
        this.updateDailyExpenses('sun');
        this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDraftDetails.mondayMiles = 0;
        this.myExpenseDraftDetails.mondayMileage = 0;
        this.updateDailyExpenses('mon');
        this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDraftDetails.tuesdayMiles = 0;
        this.myExpenseDraftDetails.tuesdayMileage = 0;
        this.updateDailyExpenses('tues');
        this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDraftDetails.wednesdayMiles = 0;
        this.myExpenseDraftDetails.wednesdayMileage = 0;
        this.updateDailyExpenses('wed');
        this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDraftDetails.thursdayMiles = 0;
        this.myExpenseDraftDetails.thursdayMileage = 0;
        this.updateDailyExpenses('thur');
        this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDraftDetails.fridayMiles = 0;
        this.myExpenseDraftDetails.fridayMileage = 0;
        this.updateDailyExpenses('fri');
        this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDraftDetails.saturdayMiles = 0;
        this.myExpenseDraftDetails.saturdayMileage = 0;
        this.updateDailyExpenses('sat');
        this.updateWeeklyExpenses();
        break;
    }
  }

  resetMeals(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDraftDetails.sundayMeals = 0;
        this.updateDailyExpenses('sun');
		    this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDraftDetails.mondayMeals = 0;
        this.updateDailyExpenses('mon');
		    this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDraftDetails.tuesdayMeals = 0;
        this.updateDailyExpenses('tues');
		    this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDraftDetails.wednesdayMeals = 0;
        this.updateDailyExpenses('wed');
		    this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDraftDetails.thursdayMeals = 0;
        this.updateDailyExpenses('thur');
		    this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDraftDetails.fridayMeals = 0;
        this.updateDailyExpenses('fri');
		    this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDraftDetails.saturdayMeals = 0;
        this.updateDailyExpenses('sat');
		this.updateWeeklyExpenses();
        break;
    }
  }

  resetPhone(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDraftDetails.sundayPhone = 0;
        this.updateDailyExpenses('sun');
		    this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDraftDetails.mondayPhone = 0;
        this.updateDailyExpenses('mon');
		    this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDraftDetails.tuesdayPhone = 0;
        this.updateDailyExpenses('tues');
		    this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDraftDetails.wednesdayPhone = 0;
        this.updateDailyExpenses('wed');
		    this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDraftDetails.thursdayPhone = 0;
        this.updateDailyExpenses('thur');
		    this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDraftDetails.fridayPhone = 0;
        this.updateDailyExpenses('fri');
		    this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDraftDetails.saturdayPhone = 0;
        this.updateDailyExpenses('sat');
		this.updateWeeklyExpenses();
        break;
    }
  }
  resetOther(day: string) {
    switch(day) {
      case 'sun':
        this.myExpenseDraftDetails.sundayOther = 0;
        this.updateDailyExpenses('sun');
		    this.updateWeeklyExpenses();
        break;
      case 'mon':
        this.myExpenseDraftDetails.mondayOther = 0;
        this.updateDailyExpenses('mon');
		    this.updateWeeklyExpenses();
        break;
      case 'tues':
        this.myExpenseDraftDetails.tuesdayOther = 0;
        this.updateDailyExpenses('tues');
		    this.updateWeeklyExpenses();
        break;
      case 'wed':
        this.myExpenseDraftDetails.wednesdayOther = 0;
        this.updateDailyExpenses('wed');
		    this.updateWeeklyExpenses();
        break;
      case 'thur':
        this.myExpenseDraftDetails.thursdayOther = 0;
        this.updateDailyExpenses('thur');
		    this.updateWeeklyExpenses();
        break;
      case 'fri':
        this.myExpenseDraftDetails.fridayOther = 0;
        this.updateDailyExpenses('fri');
		    this.updateWeeklyExpenses();
        break;
      case 'sat':
        this.myExpenseDraftDetails.saturdayOther = 0;
        this.updateDailyExpenses('sat');
		    this.updateWeeklyExpenses();
        break;
    }
  }

  setPrepaidExpense(value: any) {
    this.myExpenseDraftDetails.prePaidExpense = +value;
  }

  getWeekEndingErrorMessage() {
    if (this.draftForm.get('weekEnding').hasError('required')) {
      return 'You must enter a week ending date';
    } else if (this.draftForm.get('weekEnding').hasError('exceedAllowedDateRange')) {
      return 'Please enter a Week Ending Date within the next 7 days.';
    } else if (this.draftForm.get('weekEnding').hasError('expenseExists')) {
      return 'You already Submitted Expense for this Week Ending.';
    }
    return  this.draftForm.get('weekEnding').hasError('notSaturday') ? 'Week ending date must be a Saturday date' : '';
  }

  getWeeklyExpenseErrorMessage() {
    if (this.draftForm.controls.weeklyTotalExpense.hasError('lessThanMin')) {
      return 'Weekly Expenses must be greater than 0';
    }    
  }

  openWarningDialog(warningDialog) {
    if (this.myExpenseDraftDetails.weeklyTotalExpense === 0) {
      this.draftForm.controls.weeklyTotalExpense.setErrors({lessThanMin: true});
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
