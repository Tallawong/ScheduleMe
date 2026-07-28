import { CommonModule } from '@angular/common';
import { Component, NgModule, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Account, Role } from './entities';
import { AccountService } from './services';
import { TestService } from './services/test/test.service';
import { AlertComponent } from './core/components/alert';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('scheduleme.client');

  isLoaded: boolean = false;

  // Expose the Enum to the HTML template
  Role = Role;

  account: Account | null = null;

  constructor(
    private accountService: AccountService,
    /* @Inject(USERS_SERVICE_TOKEN) */ private usersService: TestService,
  ) {
    this.accountService.account.subscribe((x: Account | null) => {
      this.account = x;
      this.isLoaded = true;
    });

    // TODO JD TEST
    console.log('usersService', usersService);
    usersService.getProductInfo();
  }
  logout() {
    this.accountService.logout();
  } // TODO JD TEST END
}
