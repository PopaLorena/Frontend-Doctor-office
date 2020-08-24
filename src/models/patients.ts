export class Patient {

    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public birthDate?: string,
        public cnp?: string,
        public city?: string,
        public country?: string,
        public phoneNumber?: string,
        public sex: Sex = Sex.UNDEFINED,
    ) { }
}

export enum Sex {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    UNDEFINED = 'UNDEFINED'


}