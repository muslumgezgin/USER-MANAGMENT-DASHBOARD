import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BackendServiceHelper } from 'src/app/core/Helpers/backend-service.helper';
import { UserLocalStorageDto } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-event-user-list',
  templateUrl: './event-user-list.component.html',
  styleUrls: ['./event-user-list.component.scss']
})
export class EventUserListComponent implements OnInit {
  userID: number;
  UserListEvents: UserLocalStorageDto[] = [];
  @ViewChild('paginator')
  paginator!: MatPaginator;
  dataSource = new MatTableDataSource(this.UserListEvents);
  pageSize = 10;
  length = 0;
  pageIndex = 0;
  pageEvent!: PageEvent;

  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'email',
    'eventType'
  ];

  constructor(private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('id');
    this.userID = Number(id);
  }

  ngOnInit(): void {
    this.UserListEvents = BackendServiceHelper.getUserEventsFromLocalStorage(this.userID);
    this.dataSource.data = this.UserListEvents;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

}
