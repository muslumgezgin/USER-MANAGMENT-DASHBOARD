import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import Swal from "sweetalert2";


@Injectable()
export class ExceptionHandlerHttpInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {

                    if (error.status === 401) {
                        // redirect to the login route
                        // or show a modal
                    }

                    const errorMessage = error.error.message ? error.error.message : error.message;
                    this.fireSweetAlertError(errorMessage);


                    // do something with the error
                    const err = new Error('test');
                    return throwError(() => err);


                })
            );
    }

    fireSweetAlertError(message: string) {
        Swal.fire({
            icon: 'error',
            title: '<b>oops something went wrong</b>',
            html: '<b>' + message + '</b>',
            timer: 2000,
            timerProgressBar: true,
        })
    }

}