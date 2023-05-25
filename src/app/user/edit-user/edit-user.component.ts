import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageEventType, User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { DEFAULT_USER } from '../user-contant';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { BackendServiceHelper } from 'src/app/core/Helpers/backend-service.helper';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditUserComponent,
      multi: true
    }
  ]
})
export class EditUserComponent implements OnInit {

  user: User = DEFAULT_USER;
  userID: number;
  public myForm: FormGroup;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    let id = this.route.snapshot.paramMap.get('id');
    this.userID = Number(id);
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      surname: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userID).subscribe(data => {
      this.user = data;
      this.myForm.setValue({ name: data.name, surname: data.surname, email: data.email });

    })

  }

  cancel(){
    this.router.navigate(['users']);
  }
  updateUser() {
    this.user.name = this.myForm.value.name;
    this.user.surname = this.myForm.value.surname;
    this.user.email = this.myForm.value.email;
    if (BackendServiceHelper.isBackendServiceAvailable()) {
      this.userService.updateUser(this.user).subscribe(data => {
        this.user = data;
        if (data) {
          this.router.navigate(['users']);

        }
      })

    } else {
      BackendServiceHelper.addUserEventToLocalStorage({ user: this.user, eventType: StorageEventType.Update });
      // this.router.navigate(['users']);
    }

  }

  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }



}
