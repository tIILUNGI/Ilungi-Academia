import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
  nome: string;
  id: string;
}

export interface UserInfo {
  id: string;
  nome: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:4001/api';

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, { email, password });
  }

  me() {
    const token = this.storage.getToken();
    if (!token) {
      return null;
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserInfo>(`${this.API_URL}/auth/me`, { headers });
  }

  logout() {
    this.storage.clearToken();
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!this.storage.getToken();
  }

  getUserRole(): string | null {
    const user = this.storage.getCurrentUser();
    return user?.role || null;
  }

  validateRoleForPortal(allowedRoles: string[]): boolean {
    const role = this.getUserRole();
    if (!role) return false;
    return allowedRoles.includes(role);
  }

  requireRole(allowedRoles: string[]) {
    if (!this.validateRoleForPortal(allowedRoles)) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
