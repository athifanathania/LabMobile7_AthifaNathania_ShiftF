import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { filter, map, take } from 'rxjs';

export const autoLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.authenticationState.pipe(
    filter((val) => val !== null),
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigateByUrl('/home', { replaceUrl: true });
        return true;
      } else {
        return true;
      }
    }
    ))
};