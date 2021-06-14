export class TimesheetRequest {
    timesheetId: number;
    assignmentId: number;
    contractorName: string;
    contractorId: number;
    approverName: string;
    managerId: number;
    name: string;
    weekEnding: Date;
    projectName: string;
    mondayDate: Date;
    tuesdayDate: Date;
    wednesdayDate: Date;
    thursdayDate: Date;
    fridayDate: Date;
    saturdayDate: Date;
    sundayDate: Date;
    weeklyTotalHours: number;
    timesheetStatus: number;
    approveTime: string;
    isReleased: boolean;
    isDraft: boolean;
    mondayStart: string;
    mondayLunchOut: string;		
    mondayLunchIn: string;
    mondayEnd: string;
    mondayHours: number;

    tuesdayStart: string;
    tuesdayLunchOut: string;
    tuesdayLunchIn: string;
    tuesdayEnd: string;
    tuesdayHours: number;

    wednesdayStart: string;
    wednesdayLunchOut: string;
    wednesdayLunchIn: string;
    wednesdayEnd: string;
    wednesdayHours: number;

    thursdayStart: string;
    thursdayLunchOut: string;
    thursdayLunchIn: string;
    thursdayEnd: string;
    thursdayHours: number;

    fridayStart: string;
    fridayLunchOut: string;
    fridayLunchIn: string;
    fridayEnd: string;
    fridayHours: number;

    saturdayStart: string;
    saturdayLunchOut: string;
    saturdayLunchIn: string;
    saturdayEnd: string;
    saturdayHours: number;
    
    sundayStart: string;
    sundayLunchOut: string;
    sundayLunchIn: string;
    sundayEnd: string;
    sundayHours: number;
}
