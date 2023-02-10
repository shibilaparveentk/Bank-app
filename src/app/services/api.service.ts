import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders()
}



@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  // api call to login
  login(accno: any, psswd: any) {
    const body = {
      accno,
      psswd
    }
    return this.http.post('http://localhost:3000/login', body)
  }
  //api call for register
  register(accno: any, psswd: any, uname: any) {
    const body = {
      accno,
      psswd,
      uname
    }
    return this.http.post('http://localhost:3000/register', body)
  }

  //function to append token in the request headers
  appendToken() {
    const token = (localStorage.getItem("token"))
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append('x-access-token', token)
      options.headers = headers
    }
    return options
  }



  //api call for deposit
  deposit(accno: any, psswd: any, amount: any) {
    const body = {
      accno,
      psswd,
      amount
    }
    return this.http.post('http://localhost:3000/deposit', body, this.appendToken())
  }


  //api call for withdraw
  withdraw(accno: any, psswd: any, amount: any) {
    const body = {
      accno,
      psswd,
      amount
    }
    return this.http.post('http://localhost:3000/withdraw', body, this.appendToken())
  }

  //api call for getBalance
  balance(accno: any) {
    const body = {
      accno
    }
    return this.http.post('http://localhost:3000/getBalance', body, this.appendToken())
  }



  //api call for transaction
  transaction(accno: any) {
    const body = {
      accno
    }
    return this.http.post('http://localhost:3000/getTransaction', body, this.appendToken())
  }


  //api for accno deletion
  deleteAccount(accno: any) {
    return this.http.delete('http://localhost:3000/deleteAccount/' + accno, this.appendToken())
  }

}
