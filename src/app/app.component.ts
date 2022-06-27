import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from './_models/users';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'FE-Dev';
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.setCurrentUser();
  }
  setCurrentUser() {
    if ('user' in sessionStorage) {
      const user: User = JSON.parse(sessionStorage.getItem('user')!);
      this.accountService.setCurrentUser(user);
    }
  }
}
