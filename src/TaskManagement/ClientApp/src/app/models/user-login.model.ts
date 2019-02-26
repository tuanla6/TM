// ====================================================
// More Templates: https://taskmanagementsystem.net/templates
// Email: support@ebenmonney.com
// ====================================================

export class UserLogin {
    constructor(email?: string, password?: string, rememberMe?: boolean) {
        this.email = email;
        this.password = password;
        this.rememberMe = rememberMe;
    }

    email: string;
    password: string;
    rememberMe: boolean;
}
