import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CommonDataService } from '../common-data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  post: any;                     // A property for our submitted form
  description: string = '';
  name: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dataService: CommonDataService) { 

    // For our form, we’ll just have two fields and we’ll require both of them to be filled out before the form can be submitted
    //this.loginForm = fb.group({
    //  'email': [null, Validators.required],
    //  'password': [null, Validators.required],
    //})

    //this.rForm = fb.group({
    //  'name': [null, Validators.required],
    //  'description': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
    //  'validate': ''
    //});

    
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Username: [null, Validators.required],
      Password: [null, Validators.required]
    });
  }

  addPost(post) {
    this.description = post.description;
    this.name = post.name;
  }

  //submitForm(value: any) {
  //  console.log(value.email);
  //  console.log(value.password);
  //  // Once the form is submitted and we get the users email and password we’ll format our request based on the Auth0 API.
  //  //let form = {
  //  //  'client_id': 'YOUR-AUTH0-CLIENTID',
  //  //  'username': value.email,
  //  //  'password': value.password,
  //  //  'connection': 'Username-Password-Authentication',
  //  //  'grant_type': 'password',
  //  //  'scope': 'openid name email'
  //  //}
  //  // Once we have our data formed, we’ll send the request using the Angular 2 HTTP library.
  //  //this.http.post('https://YOUR-AUTH0-DOMAIN.auth0.com/oauth/ro', form).subscribe(
  //  //  (res: any) => {
  //  //    // We’ll subscribe to the request and capture the response
  //  //    let data = res.json();
  //  //    // If we get an id_token, we’ll know the request is successful so we’ll store the token in localStorage. We won’t handle the error use case for this tutorial.
  //  //    if (data.id_token) {
  //  //      localStorage.setItem('jwt', data.id_token);
  //  //      // Finally, we’ll call our getUserInfo function which will get the user details from Auth0
  //  //      this.getUserInfo(data);
  //  //    }
  //  //  }
  //  //)
  //}

  //// Here we are similarly calling the Auth0 API, this time the /tokeninfo endpoint which will return the users data we requested. All we’ll need to pass to the request is our JSON Web Token.
  //getUserInfo(data: any) {
  //  let form = {
  //    'id_token': data.id_token
  //  }
  //  this.http.post('https://reviewgen.auth0.com/tokeninfo', form).subscribe(
  //    (res: any) => {
  //      let data = res.json();
  //      this.profile = data;
  //      localStorage.setItem('profile', JSON.stringify(data));
  //      this.authenticated = true;
  //      // We’ll use the reset() method to reset the form. So if a user logs out they will need to enter their credentials again. If we did not do this, the previous values would still be displayed.
  //      this.loginForm.reset();
  //    }
  //  )
  //}

  //// We’ll implement a logout function that removes the jwt and user profile from localStorage and sets the authenticated boolean to false which will cause the component to display the login form.
  //logout() {
  //  localStorage.removeItem('jwt');
  //  localStorage.removeItem('profile');
  //  this.authenticated = false;
  //}

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      var result = this.dataService.GetData(this.form.value.Username, this.form.value.Password);
      console.log("result  " + result[0]["Userid"]);
          } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  reset() {
    this.form.reset();
  }


}
