import { Component, OnInit } from '@angular/core';
import { Account } from '../core/interfaces/accounts';
import { AccountsService } from '../core/services/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AuthComponent implements OnInit {

  idNum: number;
  username?: string;
  accName?: string;
  failedAtt?: boolean;

  constructor(
    private accService: AccountsService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  loginBtn() {
    this.accService.getAccountById(this.idNum).subscribe((account: Account) => {
        if (this.username === account.Name) {
          this.router.navigate(['home']);
          this.failedAtt = false;
        } else {
          this.failedAtt = true;
        }
    })
  }
}
