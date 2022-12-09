import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Membership } from 'src/app/common/membership';
import { SharedService } from 'src/app/services/shared.service';
import { MembershipDialog } from '../dialog copy/membership-dialog';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  membershipLengths: number[];
  membership: Membership = new Membership();
  user_id: number = 0;
  premium_id: number = 0;
  name: string;
  
  constructor(private sharedService: SharedService, public dialog: MatDialog) { 
    this.user_id = JSON.parse(sessionStorage.getItem('id'));
    this.premium_id = JSON.parse(sessionStorage.getItem('PremiumSale_id'));
    this.name = sessionStorage.getItem('name');

    this.sharedService.getVaildMembership(this.user_id).subscribe(data => {
      console.log("---------------------",typeof data.Purchase_date,typeof data.Expire_date);
      this.membership = data;
      /*if(this.membership.PremiumSale_id != 0){
        this.membership.User_id = data.User_id;
        this.membership.Purchase_date = data.Purchase_date;
        this.membership.Expire_date = data.Expire_date;
      }*/
    });

    this.membershipLengths = [7,14,30,100,300]

  }

  openDialog(num): void {
    this.dialog.open(MembershipDialog, {
      width: '250px'
    });
  }

  formatDate(strDate: string) {
    if(strDate && strDate.length > 10) {
      const temp: string = strDate.substring(0,10);
      const arrDate: string[] = temp.split("-");
      const strYear: string = arrDate[0];
      const strMonth: string = arrDate[1];
      const strDay: string = arrDate[2];
      this.addDate(strDate,14);
      return `${strMonth}/${strDay}/${strYear}`;
    }
    return strDate;

  }

  addDate(strDate: string,days: number) {
    if(strDate && strDate.length > 10) {
      const temp: string = strDate.substring(0,10);
      const arrDate: string[] = temp.split("-");
      const strYear: string = arrDate[0];
      const strMonth: string = arrDate[1];
      const strDay: string = arrDate[2];
      const date: Date = new Date(parseInt(strYear,10),parseInt(strMonth,10) - 1,parseInt(strDay,10));
      date.setDate(date.getDate() + days);
      return `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
      //const newDate: Date = new Date((new Date()).setDate(date.getDate() + days));
      //console.log(strDate,date);
    }
  }

  ngOnInit() {
  }

}
