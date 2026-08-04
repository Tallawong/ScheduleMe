import { AccountService } from '../../services';

export function initializeApp(accountService: AccountService) {
  return () =>
    new Promise((resolve: any) => {
      // attempt to refresh token on app start up to auto authenticate
      alert("Failed refreshing");
      accountService
        .refreshToken()
        .subscribe({
          next: (value: any) => {
            console.log(
              'initializeApp successful: ' + value.firstName,
              value.lastName,
              value.email,
            );
          },
          error: (error: string) => {
            console.log('Error in initializeApp');
          },
        })
        .add(resolve);
    })
      .then((message) => {
        console.log('initializeApp in then');
      })
      .catch((message) => {
        console.log('Error in initializeApp in catch');
      });
}

