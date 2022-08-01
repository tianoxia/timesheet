import { ExpenseRecordsResponse } from "./expense-records-response";

export class ExpenseResponse {
    expenseId: number;
    assignmentId: number;
    locationName: string;
    contractorName: string;
    name: string;
    mileageRate: number;
    contractorId: number;
    weekEnding: Date;
    projectName: string;
    prePaidExpense: number | 0;
    mondayDate: Date;
    tuesdayDate: Date;
    wednesdayDate: Date;
    thursdayDate: Date;
    fridayDate: Date;
    saturdayDate: Date;
    sundayDate: Date;
    weeklyTotalExpense: number;
    expenseStatus: string;
    approverName: string;
    approveTime: Date;
    isReleased: string;
    expenseLink: number;
    
    mondayHotel: number;
    mondayTravel: number;		
    mondayMarketing: number;
    mondayMiles: number;
    mondayMileage: number;
    mondayMeals: number;		
    mondayPhone: number;
    mondayOther: number;
    mondayExpenses: number;

    tuesdayHotel: number;
    tuesdayTravel: number;
    tuesdayMarketing: number;
    tuesdayMiles: number;
    tuesdayMileage: number;
    tuesdayMeals: number;		
    tuesdayPhone: number;
    tuesdayOther: number;
    tuesdayExpenses: number;

    wednesdayHotel: number;
    wednesdayTravel: number;
    wednesdayMarketing: number;
    wednesdayMiles: number;
    wednesdayMileage: number;
    wednesdayMeals: number;		
    wednesdayPhone: number;
    wednesdayOther: number;
    wednesdayExpenses: number;

    thursdayHotel: number;
    thursdayTravel: number;
    thursdayMarketing: number;
    thursdayMiles: number;
    thursdayMileage: number;
    thursdayMeals: number;		
    thursdayPhone: number;
    thursdayOther: number;
    thursdayExpenses: number;

    fridayHotel: number;
    fridayTravel: number;
    fridayMarketing: number;
    fridayMiles: number;
    fridayMileage: number;
    fridayMeals: number;		
    fridayPhone: number;
    fridayOther: number;
    fridayExpenses: number;

    saturdayHotel: number;
    saturdayTravel: number;
    saturdayMarketing: number;
    saturdayMiles: number;
    saturdayMileage: number;
    saturdayMeals: number;		
    saturdayPhone: number;
    saturdayOther: number;
    saturdayExpenses: number;
    
    sundayHotel: number;
    sundayTravel: number;
    sundayMarketing: number;
    sundayMiles: number;
    sundayMileage: number;
    sundayMeals: number;		
    sundayPhone: number;
    sundayOther: number;
    sundayExpenses: number;
    expenseAttachments: UploadedFile[];
}

export class UploadedFile {
    fileName: string;
	fileNameWithPath: string;
    created: Date;
}
