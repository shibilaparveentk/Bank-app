import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  eMsg = ""
  user = ""

  withdrawForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    accno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    psswd: ['', [Validators.required, Validators.pattern('[a-zA-z0-9]*')]]

  })

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    if (localStorage.getItem("username")) {
      this.user = localStorage.getItem("username") || ''
    }
  }
  withdraw() {
    if (this.withdrawForm.valid) {
      let accno = this.withdrawForm.value.accno
      let psswd = this.withdrawForm.value.psswd
      let amount = this.withdrawForm.value.amount
      //asynchronous
      this.api.withdraw(accno, psswd, amount)
        .subscribe(
          //response 200
          (result: any) => {
            console.log(result);
            alert(result.message)
          },
          //response 4xx
          (result: any) => {
            this.eMsg = result.error.message
            setTimeout(() => {
              this.eMsg = ""
            }, 2000)
          }
        )
    }
    else {
      alert('Invalid form')
    }
  }
}
