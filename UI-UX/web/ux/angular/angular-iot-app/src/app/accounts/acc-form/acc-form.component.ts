import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../core/interfaces/accounts';
import { AccountsService } from '../../core/services/accounts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-acc-form',
  templateUrl: './acc-form.component.html',
  styleUrls: ['./acc-form.component.scss']
})
export class AccFormComponent implements OnInit {

  title: string;
  updateInfo: boolean = false;

  newAcc: Account = {
    Id: -1,
    Name: '',
    Address: '',
    City: '',
    State: '',
    Zip: '',
    CreatedDate: '',
  };

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
  });

  constructor(
    private accService: AccountsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.newAcc.Id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.newAcc.Id > -1) {
      this.title = "UPDATE INFO";
      this.updateInfo = true;
      this.accService.getAccountById(this.newAcc.Id).subscribe((account: Account) => {
        this.newAcc = account;
      })
    } else {
      this.title = "CREATE ACCOUNT";
      this.updateInfo = false;
    }
  }

  submitBtn() {
    if (this.updateInfo) {
      this.accService.updateAccount(this.newAcc).subscribe(() => {
        this.router.navigate(['home']);
      })
    } else {
      delete this.newAcc.Id;
      this.accService.addAccount(this.newAcc).subscribe(() => {
        this.router.navigate(['login']);
      })
    }
  }

}
