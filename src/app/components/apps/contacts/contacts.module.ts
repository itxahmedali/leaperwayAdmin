import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ContactsRoutingModule } from './contacts-routing.module';

import { ContactsComponent } from './contacts.component';
import { AddContactComponent } from './modal/add-contact/add-contact.component';
import { AddCategoryComponent } from './modal/add-category/add-category.component';
import { PrintContactComponent } from './modal/print-contact/print-contact.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContactsRoutingModule
  ],
  declarations: [ContactsComponent, AddContactComponent, AddCategoryComponent, PrintContactComponent]
})
export class ContactsModule { }
