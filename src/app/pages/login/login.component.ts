import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="section-label">Acesso</span>
        <h1>Entrar</h1>
        <p>Acesse a sua conta para continuar.</p>
      </div>
    </div>

    <section class="section" style="padding:2rem 0 4rem;">
      <div class="container">
        <div class="card" style="max-width:420px; margin:0 auto; padding:2rem;">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" required />
            </div>
            <div class="form-group">
              <label for="password">Senha</label>
              <input id="password" type="password" formControlName="password" required />
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;" [disabled]="loading">
              {{ loading ? 'A entrar...' : 'Entrar' }}
            </button>
          </form>

          @if (error) {
            <p style="color:#dc2626; margin-top:1rem; text-align:center;">{{ error }}</p>
          }

          <p style="text-align:center; margin-top:1rem; font-size:0.85rem; color:var(--gray-500);">
            Ainda não tem conta? <a routerLink="/registro" style="color:var(--primary); font-weight:500;">Criar conta</a>
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .form-group { display:flex; flex-direction:column; gap:0.35rem; margin-bottom:1rem; }
    .form-group label { font-size:0.8rem; font-weight:600; color:var(--gray-700); }
    .form-group input { padding:0.65rem 0.75rem; border:1px solid var(--gray-200); border-radius:8px; font-size:0.875rem; outline:none; }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private storage: StorageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = null;

    const { email, password } = this.loginForm.value as LoginRequest;

    this.auth.login(email, password).subscribe({
      next: (res) => {
        this.storage.setToken(res.token);
        this.storage.setCurrentUser({
          email: res.username,
          nome: res.nome,
          role: res.role,
          id: res.id
        });

        const role = res.role;
        if (role === 'ADMIN') {
          window.location.href = 'http://localhost:3001';
        } else {
          window.location.href = 'http://localhost:3000';
        }
      },
      error: () => {
        this.error = 'Credenciais inválidas. Tente novamente.';
        this.loading = false;
      }
    });
  }
}
