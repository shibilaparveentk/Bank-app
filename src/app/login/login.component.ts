import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //login form
  loginForm = this.fb.group({
    accno: [''],
    psswd: ['']
  })


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  login() {
    let accno = this.loginForm.value.accno
    let psswd = this.loginForm.value.psswd
    console.log(accno);
    console.log(psswd);
    alert('login clicked')
  }
}

