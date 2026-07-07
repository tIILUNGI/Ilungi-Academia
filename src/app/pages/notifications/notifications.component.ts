import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding:2rem;max-width:800px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;">
        <h1 style="font-size:1.75rem;font-weight:700;color:var(--gray-900);">Notificações</h1>
        @if (unreadCount > 0) {
          <button class="btn btn-ghost btn-sm" (click)="markAllAsRead()">Marcar todas como lidas</button>
        }
      </div>

      @if (notifications.length > 0) {
        <div style="display:flex;flex-direction:column;gap:1rem;">
          @for (notification of notifications; track notification.id) {
            <div style="background:white;border:1px solid var(--gray-200);border-radius:14px;padding:1.25rem 1.5rem;display:flex;gap:1rem;align-items:flex-start;transition:background 0.2s;"
                 [style.background]="!notification.read ? 'rgba(124,58,237,0.03)' : 'white'"
                 [style.border-left]="!notification.read ? '4px solid var(--primary)' : '1px solid var(--gray-200)'">
              <div style="width:40px;height:40px;border-radius:10px;background:{{ getNotificationColor(notification.type) }};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 17h5l-5 5v-5zM10.5 5.5C7.462 5.5 5 7.962 5 11v5l2.5 2.5V11c0-1.657 1.343-3 3-3s3 1.343 3 3v7c0 1.657-1.343 3-3 3h-2"/>
                </svg>
              </div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;">
                  <div>
                    <h3 style="font-weight:700;color:var(--gray-900);font-size:0.95rem;margin-bottom:0.25rem;">{{ notification.title }}</h3>
                    <p style="color:var(--gray-600);font-size:0.875rem;line-height:1.5;">{{ notification.message }}</p>
                    <p style="color:var(--gray-400);font-size:0.75rem;margin-top:0.5rem;">{{ formatDate(notification.createdAt) }}</p>
                  </div>
                  <div style="display:flex;gap:0.5rem;flex-shrink:0;">
                    @if (notification.link) {
                      <a [routerLink]="notification.link" class="btn btn-primary btn-sm">Ver</a>
                    }
                    @if (!notification.read) {
                      <button class="btn btn-ghost btn-sm" (click)="markAsRead(notification.id)">Marcar como lida</button>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      } @else {
        <div style="background:white;border:1px dashed var(--gray-300);border-radius:16px;padding:5rem 2rem;text-align:center;max-width:600px;margin:0 auto;">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="var(--gray-300)" style="margin:0 auto 1.5rem;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.25-2.75M15 17v-3m0 0a4 4 0 01-8 0m8 0c0-1.657-1.343-3-3-3s-3 1.343-3 3m6 0v3m-6 0a4 4 0 01-8 0m8 0c0-1.657-1.343-3-3-3s-3 1.343-3 3"/>
          </svg>
          <h3 style="font-size:1.35rem;font-weight:700;color:var(--gray-700);margin-bottom:0.5rem;">Sem notificações</h3>
          <p style="color:var(--gray-500);max-width:400px;margin:0 auto;">Quando houver novidades, elas aparecerão aqui.</p>
        </div>
      }
    </div>
  `
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  unreadCount = 0;

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notifications = this.storage.getNotifications();
    this.unreadCount = this.storage.getUnreadNotificationsCount();
  }

  markAsRead(id: string) {
    this.storage.markNotificationRead(id);
    this.loadNotifications();
  }

  markAllAsRead() {
    this.storage.markAllNotificationsRead();
    this.loadNotifications();
  }

  getNotificationColor(type: string): string {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      default:
        return '#7c3aed';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `Há ${minutes} minuto(s)`;
    if (hours < 24) return `Há ${hours} hora(s)`;
    if (days < 7) return `Há ${days} dia(s)`;
    return date.toLocaleDateString('pt-AO');
  }
}
