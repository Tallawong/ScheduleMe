import { Component, inject } from '@angular/core';

import { AccountService } from '../../../services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  private accountService = inject(AccountService);
  account = this.accountService.accountValue;
}
