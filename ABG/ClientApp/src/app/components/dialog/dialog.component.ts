import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Friend } from 'src/app/common/friend';
import { User } from 'src/app/common/user';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{
  message: any = null;
  user: User = new User;
  friend: Friend = new Friend;
  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private service: SharedService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {message: string}
  ) {
    this.message = data ? data.message : '';
    this.getFriendsInfo(this.message.Friend_id);
  }

  closeAlert() {
    this.dialogRef.close();
  }

  deleteFriend(friendId){
    this.getFriendsInfo(friendId);
    this.deleteAction(this.friend);
    this._snackBar.open('Friend deleted.', '',{
      duration: 2000
    });
    this.dialogRef.close();
    window.location.reload();
  }

  deleteAction(f){
    this.service.deleteUserFriend(f).subscribe(data => {
    })
  }

  getFriendsInfo(id){
    this.service.validateUserInfoById(id).subscribe(data => {
      this.user = data;
      this.friend.Friend_id = this.user.User_id;
      this.friend.User_id = Number(sessionStorage.getItem('id'));

    })
  }
}
