import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonDataService } from '../services/common-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient,private commondataService:CommonDataService) {}

  ngOnInit() {
    this.checkUserAuthentication();
  }

  checkUserAuthentication()
  {
    this.commondataService.checkUserSession();
  }

}
