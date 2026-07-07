import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding:2rem;max-width:900px;">

      <h1 style="font-size:1.75rem;font-weight:700;color:var(--gray-900);margin-bottom:2.5rem;">Meu Perfil</h1>

      <!-- Profile Card -->
      <div style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:2.5rem;margin-bottom:1.75rem;">
        <div style="display:flex;align-items:center;gap:1.75rem;margin-bottom:2.5rem;">
          <div style="position:relative;">
            <img [src]="userPicture" (error)="onImgError()" style="width:96px;height:96px;border-radius:50%;object-fit:cover;border:3px solid var(--gray-100);">
            <button style="position:absolute;bottom:0;right:0;width:32px;height:32px;background:var(--primary);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;" (click)="changePhoto()">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </button>
          </div>
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

      <!-- Learning Stats -->
      <div style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:2.5rem;margin-bottom:1.75rem;">
        <h3 style="font-size:1.1rem;font-weight:700;color:var(--gray-900);margin-bottom:1.5rem;">Estatísticas de Aprendizado</h3>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;">
          <div style="background:var(--gray-50);border-radius:12px;padding:1.25rem;text-align:center;">
            <div style="font-size:1.5rem;font-weight:800;color:var(--primary);">{{ stats.coursesEnrolled }}</div>
            <div style="font-size:0.8rem;color:var(--gray-500);margin-top:0.25rem;">Cursos</div>
          </div>
          <div style="background:var(--gray-50);border-radius:12px;padding:1.25rem;text-align:center;">
            <div style="font-size:1.5rem;font-weight:800;color:var(--primary);">{{ stats.completed }}</div>
            <div style="font-size:0.8rem;color:var(--gray-500);margin-top:0.25rem;">Concluídos</div>
          </div>
          <div style="background:var(--gray-50);border-radius:12px;padding:1.25rem;text-align:center;">
            <div style="font-size:1.5rem;font-weight:800;color:var(--primary);">{{ stats.hours }}</div>
            <div style="font-size:0.8rem;color:var(--gray-500);margin-top:0.25rem;">Horas</div>
          </div>
          <div style="background:var(--gray-50);border-radius:12px;padding:1.25rem;text-align:center;">
            <div style="font-size:1.5rem;font-weight:800;color:var(--primary);">{{ stats.certificates }}</div>
            <div style="font-size:0.8rem;color:var(--gray-500);margin-top:0.25rem;">Certificados</div>
          </div>
        </div>
      </div>

      <!-- Settings Card -->
      <div style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:2.5rem;margin-bottom:1.75rem;">
        <h3 style="font-size:1.1rem;font-weight:700;color:var(--gray-900);margin-bottom:1.5rem;">Configurações</h3>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.75rem;">
          <div>
            <label style="display:block;font-size:0.875rem;font-weight:600;color:var(--gray-700);margin-bottom:0.5rem;">Idioma</label>
            <select [(ngModel)]="settings.language" style="width:100%;padding:0.75rem 1rem;border:1px solid var(--gray-200);border-radius:10px;font-size:0.95rem;outline:none;">
              <option value="pt">Português</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <label style="display:block;font-size:0.875rem;font-weight:600;color:var(--gray-700);margin-bottom:0.5rem;">Tema</label>
            <select [(ngModel)]="settings.theme" style="width:100%;padding:0.75rem 1rem;border:1px solid var(--gray-200);border-radius:10px;font-size:0.95rem;outline:none;">
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
            </select>
          </div>
          <div style="grid-column:span 2;">
            <label style="display:flex;align-items:center;gap:0.75rem;cursor:pointer;">
              <input type="checkbox" [(ngModel)]="settings.emailNotifications" style="width:18px;height:18px;">
              <span style="font-size:0.95rem;color:var(--gray-700);">Receber notificações por email</span>
            </label>
          </div>
          <div style="grid-column:span 2;">
            <label style="display:flex;align-items:center;gap:0.75rem;cursor:pointer;">
              <input type="checkbox" [(ngModel)]="settings.pushNotifications" style="width:18px;height:18px;">
              <span style="font-size:0.95rem;color:var(--gray-700);">Receber notificações push</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Password Card -->
      <div style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:2.5rem;margin-bottom:1.75rem;">
        <h3 style="font-size:1.1rem;font-weight:700;color:var(--gray-900);margin-bottom:1.5rem;">Alterar Palavra-passe</h3>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.75rem;">
          <div>
            <label style="display:block;font-size:0.875rem;font-weight:600;color:var(--gray-700);margin-bottom:0.5rem;">Palavra-passe Atual</label>
            <input type="password" [(ngModel)]="password.current" style="width:100%;padding:0.75rem 1rem;border:1px solid var(--gray-200);border-radius:10px;font-size:0.95rem;outline:none;">
          </div>
          <div>
            <label style="display:block;font-size:0.875rem;font-weight:600;color:var(--gray-700);margin-bottom:0.5rem;">Nova Palavra-passe</label>
            <input type="password" [(ngModel)]="password.new" style="width:100%;padding:0.75rem 1rem;border:1px solid var(--gray-200);border-radius:10px;font-size:0.95rem;outline:none;">
          </div>
          <div style="grid-column:span 2;">
            <button class="btn btn-ghost" style="padding:0.75rem 2rem;border-radius:10px;" (click)="changePassword()">Atualizar Palavra-passe</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  userName = '';
  userEmail = '';
  userPicture = '';
  settings: any = { language: 'pt', theme: 'light', emailNotifications: true, pushNotifications: true };
  password: any = { current: '', new: '' };
  stats: any = { coursesEnrolled: 0, completed: 0, hours: 0, certificates: 0 };

  constructor(private storage: StorageService) {}

  ngOnInit() {
    const user = this.storage.getCurrentUser();
    if (user) {
      this.userName = user.name || user.firstName || 'Usuário';
      this.userEmail = user.email || '';
      this.userPicture = user.picture || '';
      this.settings = user.settings || { language: 'pt', theme: 'light', emailNotifications: true, pushNotifications: true };
    }

    const enrollments = this.storage.getEnrollments();
    this.stats.coursesEnrolled = enrollments.length;
    this.stats.completed = enrollments.filter((e: any) => e.status === 'completed').length;
    this.stats.hours = enrollments.reduce((sum: number, e: any) => sum + (e.duration || 0), 0);
    this.stats.certificates = this.storage.getCertificates().length;
  }

  saveProfile() {
    const currentUser = this.storage.getCurrentUser();
    if (currentUser) {
      currentUser.name = this.userName;
      currentUser.email = this.userEmail;
      currentUser.settings = this.settings;
      this.storage.setCurrentUser(currentUser);
    }
  }

  changePhoto() {
    this.userPicture = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(this.userName) + '&background=7c3aed&color=fff&size=128';
    const currentUser = this.storage.getCurrentUser();
    if (currentUser) {
      currentUser.picture = this.userPicture;
      this.storage.setCurrentUser(currentUser);
    }
  }

  changePassword() {
    const currentUser = this.storage.getCurrentUser();
    if (!currentUser) return;
    if (this.password.current !== currentUser.password) {
      alert('Palavra-passe atual incorrecta.');
      return;
    }
    if (!this.password.new || this.password.new.length < 6) {
      alert('A nova palavra-passe deve ter pelo menos 6 caracteres.');
      return;
    }
    currentUser.password = this.password.new;
    this.storage.setCurrentUser(currentUser);
    this.password = { current: '', new: '' };
    alert('Palavra-passe actualizada com sucesso!');
  }

  onImgError() {
    this.userPicture = 'https://ui-avatars.com/api/?name=' + this.userName + '&background=7c3aed&color=fff';
  }
}
