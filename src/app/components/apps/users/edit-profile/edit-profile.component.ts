import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public myProfile: FormGroup;
  public editProfile: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myProfile = this.fb.group({
      bio: [''],
      email: ['', [Validators.email]],
      password: [''],
      website: [],
    });
    this.editProfile = this.fb.group({
      company: [''],
      userName: [''],
      email: ['', Validators.email],
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      zipCode: [null],
      country: [''],
      about: ['']
    })
  }

}
