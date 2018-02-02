import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import "rxjs/add/operator/map";
import { MembershipUser } from './models/membership-user';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable()
export class CommonDataService {

  constructor(private http: HttpClient, private router: Router) { }

  private apiUrl = 'http://localhost:4000/api/';  
  
  public extractData(res: Response) {
    return res;
    //let body = res.json();
    //console.log(res);
    //return body || [];
  }

  checkUserLogin(username: string, password: string): Observable<MembershipUser[]> {
    const endPoint = 'CheckUserLogin?username=' + username + '&password=' + password;
    let params = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);
    return this.http.get(this.apiUrl + endPoint)
      .map(this.extractData)
      .catch(this.handleError);
  }

  checkUserSession()
  {
    if (localStorage.getItem('Username') != '' && localStorage.getItem('Username')!=null)
    {
      this.router.navigate(['dashboard']);
    }
    else {
      this.router.navigate(['']);
    }
  }

  private handleError(error: any) {
    return Observable.throw(error.statusText);
  }
  
  postDataApi()
  {
    const req = this.http.post('http://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1
    })
      .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      }
      );


  }

}
