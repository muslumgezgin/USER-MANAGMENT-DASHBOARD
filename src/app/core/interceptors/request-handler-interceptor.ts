import { Time } from "@angular/common";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class RequestHandlerInterceptor implements HttpInterceptor {
    constructor() { }
    apiStartTime: Time = { hours: 16, minutes: 0 }
    apiEndTime: Time = { hours: 0, minutes: 0 };

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request);
    }

    isBackendServiceAvailable(): boolean {
        let date = new Date();
        let hours = date.getHours();
        if (hours >= this.apiStartTime.hours && hours <= 23) {
            return true;
        } else {
            return false;
        }
    }
}