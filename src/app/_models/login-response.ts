import { BaseApiResponse } from './base-reponse';

export class ApiLoginResponse extends BaseApiResponse {
    result: LoginResponse;
}

export class LoginResponse {
    accessToken: string;
    expireInMinutes: number;
    contractorName: string;
    contractorId: number;
    accessLevel: string;
}


