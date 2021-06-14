export class DeclineTimesheetRequest {
    timesheetId: number;
    weekEnding: Date;
    contractorId: number;
    contractorName: string;
    approverName: string;
    reason: string;
    approveTime: string;
    approverId: number;
}