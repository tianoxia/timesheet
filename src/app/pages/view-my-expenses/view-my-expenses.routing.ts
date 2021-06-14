import { Routes, RouterModule } from '@angular/router';
import { ViewMyExpenseComponent } from './view-my-expense/view-my-expense.component';
import { ViewMyExpenseDraftComponent } from './view-my-expense-draft/view-my-expense-draft.component';
import { AddMyExpenseDraftComponent } from './add-my-expense-draft/add-my-expense-draft.component';
import { AddMyExpenseComponent } from './add-my-expense/add-my-expense.component';

const childRoutes: Routes = [
  { path: 'view-my-expense', component: ViewMyExpenseComponent },
  { path: 'view-my-expense-draft', component: ViewMyExpenseDraftComponent },
  { path: 'add-my-expense', component: AddMyExpenseComponent },
  { path: 'add-my-expense-draft', component: AddMyExpenseDraftComponent }
];

export const routing = RouterModule.forChild(childRoutes);
