import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SanitizePipe } from './pipes/sanitize.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponentComponent } from './components/navbar.component/navbar.component.component';

import { MatIconModule} from "@angular/material/icon";
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatListModule} from "@angular/material/list";
import { MatButtonModule} from "@angular/material/button";
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
    declarations: [
        SanitizePipe,
        NavbarComponentComponent
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        SanitizePipe,
        NavbarComponentComponent
    ],
    providers: [
    ]
})
export class CoreModule { }