import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //to hold error msg
  eMsg = ""
  msg = ""

  //login form group
  loginForm = this.fb.group({
    accno: ['', [Validators.required, Validators.pattern('[0-9]*')]],

    psswd: ['', [Validators.required, Validators.pattern('[a-zA-z0-9]*')]]
  })

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      let accno = this.loginForm.value.accno
      let psswd = this.loginForm.value.psswd
      //asynchronous
      this.api.login(accno, psswd)
        .subscribe(
          //response 200
          (result: any) => {
            console.log(result);
            localStorage.setItem("username", result.username)
            localStorage.setItem("token", result.token)
            localStorage.setItem("currentAcno", result.currentAcno)
            //alert(result.message)
            this.msg = result.message
            setTimeout(() => {
              this.router.navigateByUrl('dashboard')
            }, 2000)
          },

          //response 4xx
          (result: any) => {
            this.eMsg = result.error.message
            //alert(result.error.message)
          }
        )
    }
    else {
      alert('Invalid form')
    }
  }
}
