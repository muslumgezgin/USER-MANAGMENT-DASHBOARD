import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";



@Injectable({
    providedIn: 'root'
})
export class UserManagementApplication {
    constructor(private _snackBar: MatSnackBar) { }

    ShowNotification(message: string, action: string, duration: number) {
        this._snackBar.open(message, action, {
            duration: duration,
        });
    }

}

