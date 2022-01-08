import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbDate, NgbCalendar, NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  model: NgbDateStruct;
  date: { year: number, month: number };
  modelPopup
  modelDisabled : NgbDateStruct;
  disabled = true;
  modelCustom : NgbDateStruct;
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  modelFooter: NgbDateStruct;
  today = this.calendar.getToday();
  fromDateParse:any;
  toDateParse:any;
   public company = [
    {
      name: "StarBucks",
      leaper: "Ethel Price",
      email: "ethelprice@gmail.com",
      date: "22/12/2022",
    },
    {
      name: "StarBucks",
      leaper: "Ethel Price",
      email: "ethelprice@gmail.com",
      date: "22/12/2022",
    },
    {
      name: "StarBucks",
      leaper: "Ethel Price",
      email: "ethelprice@gmail.com",
      date: "22/12/2022",
    },
    {
      name: "StarBucks",
      leaper: "Ethel Price",
      email: "ethelprice@gmail.com",
      date: "22/12/2022",
    },
    {
      name: "StarBucks",
      leaper: "Ethel Price",
      email: "ethelprice@gmail.com",
      date: "22/12/2022",
    },
    {
      name: "StarBucks",
      leaper: "Ethel Price",
      email: "ethelprice@gmail.com",
      date: "22/12/2022",
    },
    {
      name: "StarBucks",
      leaper: "Ethel Price",
      email: "ethelprice@gmail.com",
      date: "22/12/2022",
    },
  ];
  // deals cards
  cards: any = [
    {
      img: "assets/1x/dealImg.jpeg",
      name: "Deal 01",
      details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      qty: 1,
      price: 3.9
    },
    {
      img: "assets/1x/dealImg.jpeg",
      name: "Deal 02",
      details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      qty: 1,
      price: 3.9
    },
    {
      img: "assets/1x/dealImg.jpeg",
      name: "Deal 03",
      details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      qty: 1,
      price: 3.9
    },
  ]
  constructor(private modalService: NgbModal, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
 // modal
 closeResult = '';
 open(content) {
   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }
 private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return `with: ${reason}`;
   }
 }
// date picker
onDateSelection(date: NgbDate, event) {
  if (!this.fromDate && !this.toDate) {
    this.fromDate = date;
  } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
    this.toDate = date;
  } else {
    this.toDate = null;
    this.fromDate = date;
  }
  // date conversion
  let fromYear = this.fromDate?.year;
  let fromMonth = this.fromDate?.month <= 9 ? '0' + this.fromDate?.month : this.fromDate?.month;;
  let fromDay = this.fromDate?.day <= 9 ? '0' + this.fromDate?.day : this.fromDate?.day;;
  let toYear = this.toDate?.year;
  let toMonth = this.toDate?.month <= 9 ? '0' + this.toDate?.month : this.toDate?.month;;
  let toDay = this.toDate?.day <= 9 ? '0' + this.toDate?.day : this.toDate?.day;;
   this.fromDateParse = fromYear + "-" + fromMonth + "-" + fromDay;
  this.toDateParse = toYear + "-" + toMonth + "-" + toDay;
}
isHovered(date: NgbDate) {
  return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
}

isInside(date: NgbDate) {
  return date.after(this.fromDate) && date.before(this.toDate);
}

isRange(date: NgbDate) {
  return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
}
validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
  const parsed = this.formatter.parse(input);
  return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
}
// print outside modal
saveDate(){
  $(".fromDate").html(this.fromDateParse)
  if(this.toDateParse == "undefined-undefined-undefined"){
    return;
  }
  else{
    $(".toDate").html(this.toDateParse)
  }
}
ngOnInit(): void {
}

}
