import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MembershipUser } from '../models/membership-user';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDataService } from '../services/common-data.service';
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
  loading = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dataService: CommonDataService, private router: Router) { }

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
  
  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  private _membershipUser: MembershipUser[] = [];
  private errorMessage: any = '';
  onLogin() {
    //console.log(this.form);
    this.loading = true;
    if (this.form.valid) {
    this.loading = false;
      this.dataService.checkUserLogin(this.form.value.Username, this.form.value.Password)
        .subscribe(
        _membershipUser => {
          this._membershipUser = _membershipUser;
          if (this._membershipUser.length > 0) {
            //var _Userid = this._membershipUser[0].UserId.toLocaleString();
            //localStorage.setItem('UserId',_Userid);
            localStorage.setItem('Username', this._membershipUser[0].Username);
            this.router.navigate(['dashboard']);
            //console.log(_Userid);
          }
          else {
            //$('#spnWrongCred').text("Wrong Username/Password");
            //console.log("No Data");
          }
        },
        error => this.errorMessage = <any>error);
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
