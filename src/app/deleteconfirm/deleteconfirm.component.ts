import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-deleteconfirm',
  templateUrl: './deleteconfirm.component.html',
  styleUrls: ['./deleteconfirm.component.css']
})
export class DeleteconfirmComponent implements OnInit {

  //to recieve values from parent use input in child
  @Input() item: string | undefined
  @Input() serverMsg: string | undefined

  //to send values from child to parent use output in child
  //onCancel=user defined event
  @Output() onCancel = new EventEmitter()

  @Output() onDelete = new EventEmitter()


  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    //occur the onCancel event here using emit()
    this.onCancel.emit()
  }

  deletechild() {
    let deleteConfirm = true
    this.onDelete.emit([this.item, deleteConfirm])
    this.item = ""
  }

}
