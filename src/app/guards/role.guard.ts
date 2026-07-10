import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(allowedRoles: string[]) {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const role = this.auth.getUserRole();
    if (!role || !allowedRoles.includes(role)) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
