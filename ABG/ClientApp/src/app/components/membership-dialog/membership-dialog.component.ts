import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Friend } from 'src/app/common/friend';
import { User } from 'src/app/common/user';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'membership-dialog',
  templateUrl: './membership-dialog.component.html',
  styleUrls: ['./membership-dialog.component.css']
})
export class MembershipDialogComponent{
  expireDate: any = null;
  user: User = new User;
  friend: Friend = new Friend;
  days: any = null
  
  constructor(
    public dialogRef: MatDialogRef<MembershipDialogComponent>,
    private service: SharedService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {expireDate: string, days: string}
  ) {
    this.days = data.days;
    this.expireDate = data.expireDate;
  }

  closeAlert() {
    this.dialogRef.close();
  }
}
