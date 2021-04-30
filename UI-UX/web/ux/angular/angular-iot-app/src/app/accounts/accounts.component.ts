import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Account, UpdateAccount } from '../core/interfaces/accounts';
import { AccountsService } from '../core/services/accounts.service';

@Component({
  selector: 'app-acc',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccComponent implements OnInit {

  accounts: Account[];
  index: number;

  constructor(
    private accService: AccountsService
  ) { }

  ngOnInit() {
    // Pull and define all accounts in a list to be displayed to the current user
    this.accService.getAccounts().subscribe((accs: Account[]) => {
      this.accounts = accs;
    })
  }
  
  deleteBtn(index) {
    // Delete account by using the account from the list, we pull this by indexing our array of accounts
    this.accService.deleteAccount(this.accounts[index].Id).subscribe(() => {
      // Here we splice the object, this will remove it from the visible list without repulling data
      this.accounts.splice(index, 1);
    })
  }

  addAcc(acc: Account) {
    this.accounts.push(acc);
  }

}
