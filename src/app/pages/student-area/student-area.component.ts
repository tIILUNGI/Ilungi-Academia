import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-student-area',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    @if (!isLoggedIn) {
      <div class="auth-wrapper" style="background:linear-gradient(135deg,#f5f3ff,#ede9fe 40%,#e0e7ff);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;">
        <div style="max-width:420px;width:100%;background:white;padding:2.5rem;border-radius:12px;box-shadow:0 20px 60px rgba(124,58,237,0.15);">
          <div style="text-align:center;margin-bottom:2rem;">
            <a routerLink="/" style="text-decoration:none;">
              <span class="logo-text" style="font-size:1.75rem;font-weight:800;color:var(--gray-900);">Ilungi<span style="color:var(--primary)">-Academia</span></span>
            </a>
          </div>
          <div style="width:64px;height:64px;background:linear-gradient(135deg,var(--primary),var(--primary-dark));border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h2 style="font-size:1.5rem;font-weight:700;color:var(--gray-900);margin-bottom:0.5rem;text-align:center;">Área Restrita</h2>
          <p style="color:var(--gray-500);font-size:0.95rem;margin-bottom:2.5rem;text-align:center;">Faça login para aceder à sua área de aluno e continuar a sua formação.</p>
          <a routerLink="/login" class="btn btn-primary btn-lg" style="width:100%;justify-content:center;height:44px;border-radius:8px;">Fazer Login</a>
          <p style="margin-top:1rem;font-size:0.87rem;color:var(--gray-400);text-align:center;">
            Não tem conta? <a routerLink="/registro" style="color:var(--primary);font-weight:600;">Registar-se</a>
          </p>
        </div>
      </div>
    } @else {
      <!-- Logged In - Dashboard Layout -->
      <div class="dashboard-layout" style="display:flex;min-height:100vh;background:var(--gray-50);">
        <!-- Sidebar -->
        <aside [class.sidebar-collapsed]="sidebarCollapsed" class="sidebar" style="background:white;border-right:1px solid var(--gray-200);display:flex;flex-direction:column;transition:all 0.3s ease;width:260px;">
          <div style="padding:1.5rem 1.25rem;border-bottom:1px solid var(--gray-100);display:flex;align-items:center;justify-content:space-between;">
            @if (!sidebarCollapsed) {
              <a routerLink="/" style="text-decoration:none;">
                <span class="logo-text" style="font-size:1.25rem;font-weight:800;color:var(--gray-900);">Ilungi<span style="color:var(--primary)">-Academia</span></span>
              </a>
            }
            <button (click)="toggleSidebar()" style="background:white;border:1px solid var(--gray-200);border-radius:6px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--gray-600)">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
          <nav style="flex:1;padding:1rem 0;">
            <a routerLink="/area-do-aluno" routerLinkActive="active" style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1.25rem;color:var(--gray-600);text-decoration:none;font-size:0.9rem;border-left:3px solid transparent;margin:0.125rem 0;">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2 7-7 9 9-11 11-6-6z"/></svg>
              @if (!sidebarCollapsed) { <span>Painel Principal</span> }
            </a>
            <a routerLink="/area-do-aluno/cursos" style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1.25rem;color:var(--gray-600);text-decoration:none;font-size:0.9rem;border-left:3px solid transparent;margin:0.125rem 0;">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"/></svg>
              @if (!sidebarCollapsed) { <span>Meus Cursos</span> }
            </a>
            <a routerLink="/area-do-aluno/certificados" style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1.25rem;color:var(--gray-600);text-decoration:none;font-size:0.9rem;border-left:3px solid transparent;margin:0.125rem 0;">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806"/></svg>
              @if (!sidebarCollapsed) { <span>Certificados</span> }
            </a>
            <a routerLink="/area-do-aluno/comunidade" style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1.25rem;color:var(--gray-600);text-decoration:none;font-size:0.9rem;border-left:3px solid transparent;margin:0.125rem 0;">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5zM12 4a4 4 0 100 8 4 4 0 000-8zM5 20h5v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5z"/></svg>
              @if (!sidebarCollapsed) { <span>Comunidade</span> }
            </a>
          </nav>

          <!-- User Profile & Logout at bottom -->
          <div style="padding:1rem;border-top:1px solid var(--gray-100);">
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">
              <img [src]="userPicture || 'https://ui-avatars.com/api/?name=' + userName + '&background=7c3aed&color=fff'" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">
              @if (!sidebarCollapsed) {
                <div style="flex:1;">
                  <div style="font-weight:600;color:var(--gray-900);font-size:0.9rem;">{{ userName }}</div>
                  <div style="font-size:0.75rem;color:var(--gray-500);">{{ userEmail }}</div>
                </div>
              }
            </div>
            <button (click)="logout()" style="display:flex;align-items:center;gap:0.5rem;width:100%;padding:0.5rem 0.75rem;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;color:#dc2626;cursor:pointer;font-size:0.85rem;">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              @if (!sidebarCollapsed) { <span>Sair</span> }
            </button>
          </div>
        </aside>

        <!-- Main Content -->
        <div style="flex:1;display:flex;flex-direction:column;">
          <!-- Top Bar -->
          <header style="background:white;border-bottom:1px solid var(--gray-200);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;">
            <div style="flex:1;max-width:500px;">
              <div style="position:relative;">
                <input type="search" placeholder="Pesquisar cursos, certificados..." style="width:100%;padding:0.6rem 1rem 0.6rem 2.75rem;border:1px solid var(--gray-200);border-radius:8px;font-size:0.875rem;outline:none;">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--gray-400)" style="position:absolute;left:0.75rem;top:50%;transform:translateY(-50%);">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:1rem;">
              <button (click)="toggleLanguage()" style="padding:0.5rem 0.875rem;border:1px solid var(--gray-200);border-radius:8px;background:white;cursor:pointer;font-size:0.85rem;color:var(--gray-600);font-weight:500;">
                {{ currentLang === 'pt' ? 'EN' : 'PT' }}
              </button>
              <button (click)="openNotifications()" style="width:38px;height:38px;border-radius:50%;background:var(--gray-50);border:none;cursor:pointer;position:relative;display:flex;align-items:center;justify-content:center;">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--gray-600)">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-5 5v-5zM10.5 5.5C7.462 5.5 5 7.962 5 11v5l2.5 2.5V11c0-1.657 1.343-3 3-3s3 1.343 3 3v7c0 1.657-1.343 3-3 3h-2"/>
                </svg>
                @if (notifications > 0) {
                  <span style="position:absolute;top:6px;right:6px;width:10px;height:10px;background:#ef4444;border-radius:50;border:2px solid white;"></span>
                }
              </button>
            </div>
          </header>

          <!-- Router Outlet for child pages -->
          <router-outlet></router-outlet>
        </div>
      </div>
    }
  `,
  styles: [`
    .sidebar a.active {
      background: var(--gray-50);
      color: var(--primary);
      border-left-color: var(--primary);
    }
    .sidebar-collapsed {
      width: 72px !important;
    }
    .sidebar-collapsed .sidebar a {
      padding: 0.75rem;
      justify-content: center;
    }
    @media (max-width: 768px) {
      .dashboard-layout { flex-direction: column; }
      .sidebar { width: 100% !important; }
    }
  `]
})
export class StudentAreaComponent implements OnInit {
  isLoggedIn = false;
  userName = '';
  userEmail = '';
  userPicture = '';
  sidebarCollapsed = false;
  notifications = 2;
  currentLang = 'pt';

  constructor(
    private router: Router,
    private storage: StorageService
  ) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.setActiveRoute();
    });
  }

  ngOnInit() {
    const user = this.storage.getCurrentUser();
    if (user) {
      this.isLoggedIn = true;
      this.userName = user.name || user.firstName || 'Aluno';
      this.userEmail = user.email || '';
      this.userPicture = user.picture || '';
    }
  }

  setActiveRoute() {
    const currentUrl = this.router.url;
    document.querySelectorAll('.sidebar a').forEach(el => el.classList.remove('active'));
    const activeLink = document.querySelector(`[href="${currentUrl}"]`) as HTMLElement;
    if (activeLink) activeLink.classList.add('active');
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'pt' ? 'en' : 'pt';
  }

  openNotifications() {
    this.notifications = 0;
  }

  logout() {
    this.storage.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}