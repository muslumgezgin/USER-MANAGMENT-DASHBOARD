import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserService } from './core/services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExceptionHandlerHttpInterceptor } from './core/interceptors/exception-handler-interceptor';
import { RequestHandlerInterceptor } from './core/interceptors/request-handler-interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  providers:
    [
      UserService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ExceptionHandlerHttpInterceptor,
        multi: true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestHandlerInterceptor,
        multi: true
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
