import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //to hold error msg
  eMsg = ""


  //register form group
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    accno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    psswd: ['', [Validators.required, Validators.pattern('[a-zA-z0-9]*')]]

  })

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      let accno = this.registerForm.value.accno
      let psswd = this.registerForm.value.psswd
      let uname = this.registerForm.value.username
      //asynchronous
      this.api.register(accno, psswd, uname)
        .subscribe(
          //response 200
          (result: any) => {
            console.log(result);
            alert(result.message)
            this.router.navigateByUrl('')
          },
          //response 4xx
          (result: any) => {
            this.eMsg = result.error.message
          }
        )
    }
    else {
      alert('Invalid form')
    }
  }
}


