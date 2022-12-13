import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  user = ""
  transactions: any;
  acno = ""
  searchKey: string = "";

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    if (localStorage.getItem("username")) {
      this.user = localStorage.getItem("username") || ''
    }

    if (localStorage.getItem("currentAcno")) {
      this.acno = localStorage.getItem("currentAcno") || ''
    }


    this.api.transaction(this.acno)
      .subscribe(
        //response 2xx
        (result: any) => {
          this.transactions = result.transaction
          console.log(this.transactions);
        },

        //response 4xx
        (result: any) => {
          alert(result.error.message)
        }
      )
  }

  search(event: any) {
    this.searchKey = event.target.value
  }


  generatePdf() {
    var pdf = new jspdf();
    let col = ['Transaction Type', 'Amount']
    let row: any = []

    pdf.setFontSize(16);
    pdf.text('Transaction History', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);

    /*following array of object as response from the api request*/
    var itemNew = this.transactions
    itemNew.forEach(element => {
      var temp = [element.type, element.amount];
      row.push(temp);
    });

    (pdf as any).autoTable(col, row, { startY: 10 })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('table.pdf');
  }
}
