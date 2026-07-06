import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-verify-certificate',
  standalone: true,
  imports: [FormsModule],
  template: `
    <!-- Page Hero -->
    <div class="page-hero">
      <div class="container">
        <span class="section-label">Autenticidade</span>
        <h1>Verificar Certificado</h1>
        <p>Confirme a autenticidade de qualquer certificado emitido pela Academia Ilungi.</p>
      </div>
    </div>

    <section class="section" style="padding:3rem 0 4rem;">
      <div class="container">
        <div class="verify-layout">

          <!-- Form -->
          <div class="verify-main">
            <div class="card" style="padding:2rem;">
              <div style="margin-bottom:1.5rem;">
                <h2 style="font-size:1.25rem;font-weight:700;color:var(--gray-900);margin-bottom:0.375rem;">Introduza o Código</h2>
                <p style="font-size:0.875rem;color:var(--gray-500);">O código encontra-se no certificado físico ou digital emitido pela academia.</p>
              </div>

              <form (ngSubmit)="onSubmit()">
                <div class="form-group">
                  <label for="certificateCode">Código do Certificado</label>
                  <input
                    id="certificateCode"
                    [(ngModel)]="code"
                    name="code"
                    type="text"
                    required
                    placeholder="Ilungi-2024-XXX-000000"
                    style="font-family:monospace; letter-spacing:0.05em;">
                  <span style="font-size:0.78rem;color:var(--gray-400);margin-top:0.375rem;display:block;">
                    Exemplo: Ilungi-2024-CI-000001
                  </span>
                </div>
                <button type="submit" class="btn btn-primary" style="width:100%;">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  Verificar Certificado
                </button>
              </form>

              <!-- Result -->
              @if (hasResult) {
                <div style="margin-top:1.75rem;">
                  @if (isValid && result) {
                    <div class="verify-result valid">
                      <div class="verify-result-icon valid-icon">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <div>
                        <h3 style="font-weight:700;color:#065f46;margin-bottom:0.75rem;">Certificado Válido</h3>
                        <div class="result-fields">
                          <div class="result-field"><span class="result-label">Titular</span><span class="result-value">{{ result.holder }}</span></div>
                          <div class="result-field"><span class="result-label">Curso</span><span class="result-value">{{ result.course }}</span></div>
                          <div class="result-field"><span class="result-label">Data de Emissão</span><span class="result-value">{{ result.issueDate }}</span></div>
                          <div class="result-field"><span class="result-label">Válido Até</span><span class="result-value">{{ result.validUntil }}</span></div>
                          <div class="result-field"><span class="result-label">Código</span><span class="result-value" style="font-family:monospace;">{{ result.code }}</span></div>
                          <div class="result-field"><span class="result-label">Estado</span><span class="result-value" style="color:#059669;font-weight:700;">{{ result.status }}</span></div>
                        </div>
                      </div>
                    </div>
                  } @else {
                    <div class="verify-result invalid">
                      <div class="verify-result-icon invalid-icon">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </div>
                      <div>
                        <h3 style="font-weight:700;color:#991b1b;margin-bottom:0.5rem;">Certificado Não Encontrado</h3>
                        <p style="font-size:0.875rem;color:#7f1d1d;line-height:1.6;">
                          O código introduzido não foi encontrado na nossa base de dados. Por favor, verifique o código e tente novamente.
                        </p>
                        <p style="font-size:0.78rem;color:#b91c1c;margin-top:0.75rem;padding:0.5rem;background:rgba(254,202,202,0.4);border-radius:0.5rem;">
                          <strong>Códigos de demonstração:</strong><br>
                           Ilungi-2024-CI-000001 · Ilungi-2024-QP-000001 · Ilungi-2024-EP-000001
                        </p>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>

            <p style="margin-top:1rem;text-align:center;font-size:0.8rem;color:var(--gray-400);">
              Para assistência, contacte
              <a href="mailto:solucoes&#64;ilungi.ao" style="color:var(--primary);font-weight:500;">solucoes&#64;ilungi.ao</a>
            </p>
          </div>

          <!-- Sidebar Info -->
          <div class="verify-sidebar">
            <div class="card" style="padding:1.5rem;margin-bottom:1rem;">
              <h3 style="font-size:0.95rem;font-weight:700;color:var(--gray-900);margin-bottom:1rem;">Como encontrar o código?</h3>
              <ol class="how-to-list">
                <li><span>1</span>Abra o seu certificado digital (PDF) ou físico</li>
                <li><span>2</span>Procure o QR Code ou código alfanumérico no rodapé</li>
                 <li><span>3</span>O código tem o formato <code>Ilungi-AAAA-XX-000000</code></li>
                <li><span>4</span>Introduza o código acima e clique em verificar</li>
              </ol>
            </div>
            <div class="card" style="padding:1.5rem;background:linear-gradient(135deg,#ede9fe,#dbeafe);">
              <h3 style="font-size:0.95rem;font-weight:700;color:var(--primary);margin-bottom:0.5rem;">Porquê verificar?</h3>
              <p style="font-size:0.82rem;color:var(--gray-600);line-height:1.65;">
                A verificação garante que o certificado é autêntico e emitido oficialmente pela Academia Ilungi, protegendo empregadores e o titular.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .verify-layout {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 2.25rem;
      align-items: flex-start;
    }
    .verify-result {
      border-radius: 0.875rem;
      padding: 1.25rem;
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }
    .verify-result.valid { background:#f0fdf4; border:1.5px solid #bbf7d0; }
    .verify-result.invalid { background:#fef2f2; border:1.5px solid #fecaca; }
    .verify-result-icon {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .valid-icon { background:#d1fae5; color:#059669; }
    .invalid-icon { background:#fee2e2; color:#dc2626; }
    .result-fields { display:flex; flex-direction:column; gap:0.5rem; }
    .result-field { display:flex; gap:0.75rem; align-items:baseline; }
    .result-label { font-size:0.78rem; font-weight:600; color:#065f46; min-width:110px; flex-shrink:0; }
    .result-value { font-size:0.85rem; color:#065f46; }
    .how-to-list { list-style:none; display:flex; flex-direction:column; gap:0.75rem; }
    .how-to-list li { display:flex; align-items:flex-start; gap:0.75rem; font-size:0.82rem; color:var(--gray-600); line-height:1.5; }
    .how-to-list li span {
      width:22px; height:22px; border-radius:50%; background:var(--primary); color:white;
      font-size:0.7rem; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0;
    }
    code { font-family:monospace; background:var(--gray-100); padding:0.1rem 0.35rem; border-radius:0.25rem; font-size:0.78rem; }
    @media (max-width: 900px) {
      .verify-layout { grid-template-columns: 1fr; }
      .verify-sidebar { order: -1; }
    }
  `]
})
export class VerifyCertificateComponent {
  code = '';
  hasResult = false;
  isValid = false;
  result: any = null;

  constructor(private storage: StorageService) {}

  onSubmit() {
    this.hasResult = true;
    const certificate = this.storage.verifyCertificate(this.code.toUpperCase());
    if (certificate) {
      this.isValid = true;
      this.result = certificate;
    } else {
      this.isValid = false;
      this.result = null;
    }
  }
}