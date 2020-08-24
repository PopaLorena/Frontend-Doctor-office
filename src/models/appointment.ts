import { Patient } from './patients';
export class Appointment {

    constructor(
        public id: number = 0,
        public startTime?: string,
        public endTime?: string,
        public description?: string,
        public patient?: Patient,
        public patientId?: number,
        public type: AppointmentType = AppointmentType.REGULAR,
        public status: AppointmentStatus =AppointmentStatus.CREATED,
        ) { }
}

export enum AppointmentType {
    REGULAR = 'REGULAR',
    HOLIDAY = 'HOLIDAY',
    VACATION = 'VACATION',
    GROUP='GROUP'


}
export enum AppointmentStatus {
    CREATED = 'CREATED',
    PLANNED = 'PLANNED',
    CONFIRMED = 'CONFIRMED',
    CLOSED='CLOSED',
    CANCELED='CANCELED'


}