export class User {
    constructor (
        public username?: string,
        public email?: string,
        public password?: string,
        public userAuthority: UserAuthority=UserAuthority.REGULER
    ) {}
}
export enum UserAuthority {
    
    ADMIN = 'ADMIN',

    REGULER = 'REGULER'
}