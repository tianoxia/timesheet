import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-timesheets-expenses',
  templateUrl: './admin-timesheets-expenses.component.html',
  styleUrls: ['./admin-timesheets-expenses.component.css']
})
export class AdminTimesheetsExpensesComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.spinner.hide();
  }

}
