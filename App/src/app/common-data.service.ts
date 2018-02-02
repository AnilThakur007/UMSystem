import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class CommonDataService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:4000/api/';  
  loggedUser = [];
  GetData(username:string,password:string)
  {
    const endPoint = 'CheckUserLogin?username=' + username +'&password='+password;
    let params = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);
    return this.http.get(this.apiUrl + endPoint).subscribe(data => {
      //console.log(data[0]["Userid"])
    });
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
