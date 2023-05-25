import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BackendServiceHelper } from 'src/app/core/Helpers/backend-service.helper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('paginator')
  paginator!: MatPaginator;
  users: User[] = []
  dataSource = new MatTableDataSource(this.users);
  pageSize = 10;
  length = 0;
  pageIndex = 0;
  pageEvent!: PageEvent;

  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'email',
    'actions'
  ];


  constructor(private userService: UserService, private route: Router) { }
  ngOnInit(): void {
    this.getUsers();
    BackendServiceHelper.finisAllEventsFromLocalStorage(this.userService).subscribe(data => {
      this.getUsers();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.dataSource.data = this.users;
    });
  }

  edit(user: User) {
    this.route.navigate(['users/edit', user.id]);
  }

  gotoEvents(user: User) {
    this.route.navigate(['users/event', user.id]);
  }

  addUser() {
    this.route.navigate(['users/add']);
  }

  delete(user: User) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.id).subscribe(data => {
          if (data) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getUsers();
          }
        });
      }
    })
  }
}
