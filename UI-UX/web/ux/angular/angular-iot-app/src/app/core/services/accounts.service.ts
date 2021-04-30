import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account, NewAccount, UpdateAccount } from '../interfaces/accounts';

@Injectable({
  providedIn: 'root'
})

export class AccountsService {
  uri = 'http://10.0.0.177:3000';
  constructor(private http: HttpClient) {
  }

  getAccounts() {
    return this.http.get<Account[]>(`${this.uri}/accounts`);
  }

  getAccountById(id: number) {
    return this.http.get<Account>(`${this.uri}/accounts/${id}`);
  }

  addAccount(data: NewAccount) {
    return this.http.post<NewAccount>(`${this.uri}/accounts/add`, data);
  }

  updateAccount(data: UpdateAccount) {
    return this.http.post<UpdateAccount>(`${this.uri}/accounts/update`, data);
  }

  deleteAccount(id: number) {
    return this.http.delete<Account>(`${this.uri}/accounts/delete/${id}`);
  }
}
