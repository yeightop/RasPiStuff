import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../core/interfaces/accounts';
import { AccComponent } from '../accounts.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class TagComponent implements OnInit {

  // "@Input()" will allow you to bind a data property or element to this value, 
  // thus allowing us to call this property in the new html.
  @Input() account: Account = null;
  @Input() index: number = -1;

  constructor(
    private home: AccComponent,
    private router: Router
  ) { }

  ngOnInit() {
  }

  deleteBtn() {
    this.home.deleteBtn(this.index);
  }

  updateBtn(Id: number) {
    this.router.navigate(['acc/', Id]);
  }

}
