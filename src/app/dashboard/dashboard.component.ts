import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapse = true
  user = ""
  balance = ""
  isLogout: boolean = false;
  accno = ""
  deleteMsg = ""
  eMsg = ""
  confirmMsg = false

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("username")) {
      this.user = localStorage.getItem("username") || ''
    }

    //preventing goin back to dashboard after logout
    if (!localStorage.getItem("token")) {
      alert('Please Log in ')
      this.router.navigateByUrl('')
    }
  }


  collapse() {
    this.isCollapse = !this.isCollapse
    //this.isExpand=true
  }
  expand() {
    //this.isExpand=!this.isExpand
  }

  getBalance() {
    if (localStorage.getItem("currentAcno")) {
      let accno = localStorage.getItem("currentAcno")
      this.api.balance(accno)
        .subscribe(
          //response 2xx
          (result: any) => {
            this.balance = result.message
          },
          //response 4xx
          (result: any) => {
            this.balance = result.error.message
          }

        )
    }
  }

  //logout function
  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("currentAcno")
    this.isLogout = true
    setTimeout(() => {
      this.router.navigateByUrl('')
    }, 2000);
  }



  //deleteAcno()
  deleteAcno() {
    if (localStorage.getItem('currentAcno')) {
      this.accno = localStorage.getItem('currentAcno') || ''
    }
  }

  cancel() {
    this.accno = ""
  }

  //deleteParent($event)
  deleteParent(event: any) {

    //event is accno that should be deleted
    this.confirmMsg = event[1]
    this.api.deleteAccount(event[0])
      .subscribe(
        //response 2xx
        (result: any) => {
          this.accno = ""
          localStorage.removeItem("token")
          localStorage.removeItem("username")
          localStorage.removeItem("currentAcno")
          this.deleteMsg = result.message
          //alert(this.deleteMsg)
          setTimeout(() => {
            this.router.navigateByUrl('')
          }, 2000
          )

        },


        //response 4xx
        (result: any) => {
          this.eMsg = result.error.message
        }
      )
  }
}
