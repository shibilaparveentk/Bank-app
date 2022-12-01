import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.post('', body)
  }
}
