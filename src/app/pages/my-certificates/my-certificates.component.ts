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

      @if (selectedCertificate) {
        <div class="cert-overlay" (click)="closeCertificate()">
          <div class="cert-modal" (click)="$event.stopPropagation()">
            <div class="cert-modal-header">
              <div>
                <div style="font-size:0.75rem;font-weight:800;color:var(--gray-500);text-transform:uppercase;">Certificado</div>
                <div style="font-size:1.2rem;font-weight:900;color:var(--gray-900);margin-top:0.25rem;">{{ selectedCertificate.name }}</div>
              </div>
              <button class="btn btn-ghost btn-sm" (click)="closeCertificate()">Fechar</button>
            </div>

            <div class="cert-modal-body">
              <div class="cert-preview">
                <div class="cert-badge">{{ selectedCertificate.code }}</div>
                <div class="cert-title">Certificado de Conclusão</div>
                <div class="cert-holder">{{ selectedCertificate.holder }}</div>
                <div class="cert-subtitle">Curso: <strong>{{ selectedCertificate.course }}</strong></div>
                <div class="cert-dates">
                  <div>Emitido em: <strong>{{ selectedCertificate.issueDate }}</strong></div>
                  <div>Válido até: <strong>{{ selectedCertificate.validUntil }}</strong></div>
                </div>
                <div class="cert-hint">(Use “Imprimir” para salvar em PDF no seu navegador)</div>
              </div>
            </div>

            <div class="cert-modal-footer">
              <button class="btn btn-ghost" style="flex:1;justify-content:center;" (click)="closeCertificate()">Cancelar</button>
              <button class="btn btn-primary" style="flex:1;justify-content:center;" (click)="downloadPdf(selectedCertificate)">Download PDF</button>
            </div>
          </div>
        </div>
      }

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
                <button class="btn btn-primary btn-sm" style="flex:1;justify-content:center;" (click)="viewCertificate(cert)">Ver</button>
                <button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center;" (click)="downloadPdf(cert)">Download PDF</button>
                <button class="btn btn-ghost btn-sm" (click)="shareCertificate(cert)" title="Partilhar">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.5 9 12c0-.5-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 111.024 5.196l-6.632 3.316m6.632-6l-6.632 3.316"/>
                  </svg>
                </button>
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
  selectedCertificate: any | null = null;

  constructor(private storage: StorageService) {}

  ngOnInit() {
    const user = this.storage.getCurrentUser();
    if (user) {
      this.certificates = this.storage.getCertificates();
    }
  }

  viewCertificate(cert: any) {
    this.selectedCertificate = cert;
  }

  closeCertificate() {
    this.selectedCertificate = null;
  }

  downloadPdf(cert: any) {
    this.viewCertificate(cert);
    setTimeout(() => {
      try {
        window.print();
      } catch {
        // ignore
      }
    }, 50);
  }

  shareCertificate(cert: any) {
    const shareData = {
      title: cert.name,
      text: `Confira o meu certificado: ${cert.course}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${cert.name} - ${cert.course}`).then(() => {
        alert('Link copiado para a área de transferência.');
      }).catch(() => {
        alert('Não foi possível partilhar.');
      });
    }
  }
}

