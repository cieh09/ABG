import { Component, OnInit } from '@angular/core';
import { Membership } from 'src/app/common/membership';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  membership: Membership = new Membership();
  user_id: number = 0;
  
  constructor(private sharedService: SharedService) { 
    this.user_id = JSON.parse(localStorage.getItem('id'));

    this.sharedService.getVaildMembership(this.user_id).subscribe(data => {
      this.membership = data;
      if(this.membership.PremiumSale_id != 0){
        this.membership.User_id = data.User_id;
        this.membership.Purchase_date = data.Purchase_date;
        this.membership.Expire_date = data.Expire_date;
      }
    });
  }

  ngOnInit() {
  }

}
