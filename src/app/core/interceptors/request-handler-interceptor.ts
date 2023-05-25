import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { BackendServiceHelper } from "../Helpers/backend-service.helper";
import { UserService } from "../services/user.service";
import { Injectable } from "@angular/core";

@Injectable()
export class RequestHandlerHttpInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (BackendServiceHelper.isBackendServiceAvailable()) {
            console.log('BackendServiceHelper.isBackendServiceAvailable()');
            BackendServiceHelper.finisAllEventsFromLocalStorage(this.userService).subscribe(data => { });
        }
        return next.handle(req);
    }
}