import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './view-my-expenses.routing';
import { SharedModule } from '../../shared/shared.module';
import { ViewMyExpenseComponent } from './view-my-expense/view-my-expense.component';
import { ViewMyExpenseDraftComponent } from './view-my-expense-draft/view-my-expense-draft.component';
import { AddMyExpenseDraftComponent } from './add-my-expense-draft/add-my-expense-draft.component';
import { AddMyExpenseComponent } from './add-my-expense/add-my-expense.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    ViewMyExpenseComponent,
    ViewMyExpenseDraftComponent,
    AddMyExpenseDraftComponent,
    AddMyExpenseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    routing
  ],
  providers: [
    DatePipe
  ]
})
export class ViewMyExpensesModule { }
