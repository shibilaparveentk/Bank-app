import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  eMsg = ""
  //msg = ""
  user = ""


  depositForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    accno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    psswd: ['', [Validators.required, Validators.pattern('[a-zA-z0-9]*')]]

  })

  constructor(private fb: FormBuilder, private api: ApiService) {
    //auto refresh
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }


  ngOnInit(): void {
    if (localStorage.getItem("username")) {
      this.user = localStorage.getItem("username") || ''
    }
  }
  deposit() {
    if (this.depositForm.valid) {
      let accno = this.depositForm.value.accno
      let psswd = this.depositForm.value.psswd
      let amount = this.depositForm.value.amount
      //asynchronous
      this.api.deposit(accno, psswd, amount)
        .subscribe(
          //response 2xx
          (result: any) => {
            console.log(result);
            //this.msg = result.message
            //setTimeout(() => {
            //this.msg = ""
            alert(result.message)
            //auto refresh
            //this.depositForm.reset()
          },
          //response 4xx
          (result: any) => {
            this.eMsg = result.error.message
          },
        )
    }
    else {
      alert('Invalid form')
    }
  }
}


