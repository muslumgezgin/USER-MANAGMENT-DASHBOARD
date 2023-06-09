import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageEventType, User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { DEFAULT_USER } from '../user-contant';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { BackendServiceHelper } from 'src/app/core/helpers/backend-service.helper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
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

  cancel() {
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

  updateUser() {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    this.user.name = this.myForm.value.name;
    this.user.surname = this.myForm.value.surname;
    this.user.email = this.myForm.value.email;
    if (BackendServiceHelper.isBackendServiceAvailable()) {
      this.userService.updateUser(this.user).subscribe(data => {
        this.user = data;
        if (data) {
          let message = this.user.name + " updated successfully";
          this.fireSweetAlert(message);
          this.router.navigate(['users']);
        }
      })
    } else {
      BackendServiceHelper.addUserEventToLocalStorage({ user: this.user, eventType: StorageEventType.Update });
      let message = this.user.name + " updated event saved local storage";
      this.fireSweetAlert(message);
      this.router.navigate(['users']);
    }
  }

  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }
}
