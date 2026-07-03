import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-my-certificates',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding:2rem;">
      <h1 style="font-size:1.75rem;font-weight:700;color:var(--gray-900);margin-bottom:2.5rem;">Meus Certificados</h1>

      @if (certificates.length > 0) {
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.75rem;">
          @for (cert of certificates; track cert.code) {
            <div style="background:white;border:1px solid var(--gray-200);border-radius:14px;padding:1.75rem;transition:transform 0.2s,box-shadow 0.2s;">
              <div style="display:flex;gap:1.25rem;">
                <div style="width:64px;height:64px;background:#fef3c7;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#d97706">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806"/>
                  </svg>
                </div>
                <div style="flex:1;">
                  <h3 style="font-weight:700;color:var(--gray-900);margin-bottom:0.25rem;font-size:1.1rem;">{{ cert.name }}</h3>
                  <p style="font-size:0.9rem;color:var(--gray-500);margin-bottom:0.75rem;">{{ cert.course }}</p>
                  <div style="display:flex;gap:1rem;font-size:0.8rem;color:var(--gray-400);margin-bottom:1rem;">
                    <span>Emitido em <strong>{{ cert.issueDate }}</strong></span>
                    <span>Válido até <strong>{{ cert.validUntil }}</strong></span>
                  </div>
                  <div style="font-size:0.75rem;font-family:monospace;color:var(--primary);background:var(--gray-50);padding:0.375rem 0.75rem;border-radius:6px;display:inline-block;">{{ cert.code }}</div>
                </div>
              </div>
              <div style="display:flex;gap:0.75rem;margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid var(--gray-100);">
                <button class="btn btn-primary btn-sm" style="flex:1;justify-content:center;">Download PDF</button>
                <button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center;">Compartilhar</button>
              </div>
            </div>
          }
        </div>
      } @else {
        <div style="background:white;border:1px dashed var(--gray-300);border-radius:16px;padding:5rem 2rem;text-align:center;max-width:600px;margin:0 auto;">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="var(--gray-300)" style="margin:0 auto 1.5rem;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806"/>
          </svg>
          <h3 style="font-size:1.35rem;font-weight:700;color:var(--gray-700);margin-bottom:0.5rem;">Nenhum certificado</h3>
          <p style="color:var(--gray-500);max-width:400px;margin:0 auto;">Complete cursos para obter certificados de conclusão.</p>
        </div>
      }
    </div>
  `
})
export class MyCertificatesComponent implements OnInit {
  certificates: any[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit() {
    const user = this.storage.getCurrentUser();
    if (user) {
      this.certificates = this.storage.getCertificates();
    }
  }
}