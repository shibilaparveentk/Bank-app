import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //login form group
  loginForm = this.fb.group({
    accno: ['', [Validators.required, Validators.pattern('[0-9]*')]],

    psswd: ['', [Validators.required, Validators.pattern('[a-zA-z0-9]*')]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      let accno = this.loginForm.value.accno
      let psswd = this.loginForm.value.psswd
      console.log(accno);
      console.log(psswd);
      alert('login clicked')
    }
    else {
      alert('invalid form')
    }
  }
}

