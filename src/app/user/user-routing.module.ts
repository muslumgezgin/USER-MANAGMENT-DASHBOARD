import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EventUserListComponent } from './event-user-list/event-user-list.component';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent,
    },
    {
        path: 'add',
        component: AddUserComponent
    },
    {
        path: 'edit/:id',
        component: EditUserComponent
    },
    {
        path: 'event/:id',
        component: EventUserListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }