import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageEventType, User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { DEFAULT_USER } from '../user-contant';
import { BackendServiceHelper } from 'src/app/core/helpers/backend-service.helper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user: User = DEFAULT_USER;
  public addUserForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.addUserForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      surname: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  cancel(){
    this.router.navigate(['users']);
  }

  fireSweetAlert(message: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  addUser() {

    this.user.name = this.addUserForm.value.name;
    this.user.surname = this.addUserForm.value.surname;
    this.user.email = this.addUserForm.value.email;

    if (BackendServiceHelper.isBackendServiceAvailable()) {
      this.userService.createUser(this.user).subscribe(data => {
        this.user = data;
        if (data) {
          let message = this.user.name +' added successfully';
          this.fireSweetAlert(message);
          this.router.navigate(['users']);
        }
      })
    } else {
      BackendServiceHelper.addUserEventToLocalStorage({ user: this.user, eventType: StorageEventType.Add });
      let message = this.user.name + " saved event saved local storage";
      this.fireSweetAlert(message)
      
      this.router.navigate(['users']);
    }
  }

  public myError = (controlName: string, errorName: string) => {
    return this.addUserForm.controls[controlName].hasError(errorName);
  }

}
