import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding:2rem;max-width:800px;">
      <h1 style="font-size:1.75rem;font-weight:700;color:var(--gray-900);margin-bottom:2.5rem;">Meu Perfil</h1>

      <div style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:2.5rem;margin-bottom:1.75rem;">
        <div style="display:flex;align-items:center;gap:1.75rem;margin-bottom:2.5rem;">
          <img [src]="userPicture" (error)="onImgError()" style="width:96px;height:96px;border-radius:50%;object-fit:cover;border:3px solid var(--gray-100);">
          <div>
            <h2 style="font-size:1.35rem;font-weight:700;color:var(--gray-900);">{{ userName }}</h2>
            <p style="color:var(--gray-500);font-size:1rem;">{{ userEmail }}</p>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.75rem;">
          <div>
            <label style="display:block;font-size:0.875rem;font-weight:600;color:var(--gray-700);margin-bottom:0.5rem;">Nome Completo</label>
            <input [(ngModel)]="userName" style="width:100%;padding:0.75rem 1rem;border:1px solid var(--gray-200);border-radius:10px;font-size:0.95rem;outline:none;">
          </div>
          <div>
            <label style="display:block;font-size:0.875rem;font-weight:600;color:var(--gray-700);margin-bottom:0.5rem;">Email</label>
            <input [(ngModel)]="userEmail" type="email" style="width:100%;padding:0.75rem 1rem;border:1px solid var(--gray-200);border-radius:10px;font-size:0.95rem;outline:none;">
          </div>
          <div style="grid-column:span 2;">
            <button class="btn btn-primary" (click)="saveProfile()" style="padding:0.75rem 2rem;border-radius:10px;">Salvar Alterações</button>
          </div>
        </div>
      </div>

      <!-- Subscription -->
      <div style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:2rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <h3 style="font-size:1.1rem;font-weight:700;color:var(--gray-900);">Assinatura</h3>
          <span class="badge badge-primary">Grátis</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <p style="font-weight:500;color:var(--gray-800);">Plano Grátis</p>
            <p style="font-size:0.9rem;color:var(--gray-500);">Acesso aos cursos básicos</p>
          </div>
          <a routerLink="/planos" class="btn btn-ghost btn-sm">Ver Planos</a>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  userName = '';
  userEmail = '';
  userPicture = '';

  constructor(private storage: StorageService) {}

  ngOnInit() {
    const user = this.storage.getCurrentUser();
    if (user) {
      this.userName = user.name || user.firstName || 'Usuário';
      this.userEmail = user.email || '';
      this.userPicture = user.picture || '';
    }
  }

  saveProfile() {
    const currentUser = this.storage.getCurrentUser();
    if (currentUser) {
      currentUser.name = this.userName;
      currentUser.email = this.userEmail;
      this.storage.setCurrentUser(currentUser);
    }
  }

  onImgError() {
    this.userPicture = 'https://ui-avatars.com/api/?name=' + this.userName + '&background=7c3aed&color=fff';
  }
}