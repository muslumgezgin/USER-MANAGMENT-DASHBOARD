import { Time } from "@angular/common";
import { StorageEventType, User, UserLocalStorageDto } from "../models/user.model";
import { EventType } from "@angular/router";
import { UserService } from "../services/user.service";
import { Observable, of } from "rxjs";

export class BackendServiceHelper {
    static getBaseUrl() {
        return "http://localhost:3000/";
    }

    static apiStartTime: Time = { hours: 19, minutes: 0 }
    static apiEndTime: Time = { hours: 0, minutes: 0 };

    static isBackendServiceAvailable(): boolean {
        let date = new Date();
        let hours = date.getHours();
        if (hours >= this.apiStartTime.hours && hours <= 23) {
            return true;
        } else {
            return false;
        }
    }

    static addUserEventToLocalStorage(data: UserLocalStorageDto) {
        let key = "user-" + data.user.id;
        let currenItem = localStorage.getItem(key)
        let events: UserLocalStorageDto[] = []
        if (currenItem) {
            events = JSON.parse(currenItem);
        }
        events.push(data);
        localStorage.setItem(key, JSON.stringify(events));
    }

    static getAllEventsFromLocalStorage(): { events: UserLocalStorageDto[], shouldRemoveKeys: string[] } {
        let events: UserLocalStorageDto[] = []
        let shouldRemoveKeys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key?.includes("user")) {
                let currenItem = localStorage.getItem(key)
                if (currenItem) {
                    let currentItemEvents = JSON.parse(currenItem);
                    // this should be disccused with the team
                    console.log(currentItemEvents)
                    console.log(currentItemEvents[currentItemEvents.length - 1])
                    events.push(currentItemEvents[currentItemEvents.length - 1]);
                    shouldRemoveKeys.push(key);
                }
            }
        }
        return { events, shouldRemoveKeys }
    };



    static finisAllEventsFromLocalStorage(userService: UserService): Observable<any> {
        const { events, shouldRemoveKeys } = this.getAllEventsFromLocalStorage();

        if (events.length > 0) {
            for (const event of events) {
                if (event.eventType == StorageEventType.Add) {
                    userService.createUser(event.user).subscribe(data => { });
                } else if (event.eventType == StorageEventType.Update) {
                    userService.updateUser(event.user).subscribe(data => { });
                } else if (event.eventType == StorageEventType.Delete) {
                    userService.deleteUser(event.user.id).subscribe(data => { });
                }
            }
            for (const key of shouldRemoveKeys) {
                localStorage.removeItem(key);
            }
        }

        return of({});
    }

    static getUserEventsFromLocalStorage(id: number): UserLocalStorageDto[] {
        let key = "user-" + id;
        let currenItem = localStorage.getItem(key)
        let events: UserLocalStorageDto[] = []
        if (currenItem) {
            events = JSON.parse(currenItem);
        }
        return events;
    }
}