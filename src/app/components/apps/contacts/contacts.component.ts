import { Component, OnInit, ViewChild } from '@angular/core';
import { AddContactComponent } from "./modal/add-contact/add-contact.component";
import { AddCategoryComponent } from "./modal/add-category/add-category.component";
import { PrintContactComponent } from "./modal/print-contact/print-contact.component";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @ViewChild("addContact") AddContact: AddContactComponent;
  @ViewChild("addCategory") AddCategory: AddCategoryComponent;
  @ViewChild("print") Print: PrintContactComponent;

  public history: boolean = false;
  public editContact: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  showHistory() {
    this.history = !this.history;
  }

}
