import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <!-- Page Hero -->
    <div class="page-hero">
      <div class="container">
        <span class="section-label">Certificações</span>
        <h1>Certificações Profissionais</h1>
        <p>Obtenha certificações reconhecidas que impulsionam a sua carreira no mercado angolano e internacional.</p>
      </div>
    </div>

    <!-- Certifications List -->
    <section class="section" style="padding-top: 3rem; padding-bottom: 3rem;">
      <div class="container">
        <div class="cert-grid">
          @for (cert of certifications; track cert.id) {
            <div class="card cert-card">
              <div class="cert-icon" [style.background]="cert.bg">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" [style.color]="cert.color">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <div class="cert-body">
                <span class="badge badge-primary" style="margin-bottom:0.5rem;">{{ cert.level }}</span>
                <h3 class="cert-title">{{ cert.name }}</h3>
                <p class="cert-desc">{{ cert.description }}</p>
                <ul class="cert-features">
                  @for (f of cert.features; track f) {
                    <li>
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20" style="color:var(--primary); flex-shrink:0;">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      {{ f }}
                    </li>
                  }
                </ul>
                <div class="cert-footer">
                  <span class="cert-price">{{ cert.price }}</span>
                  <a href="#" class="btn btn-primary btn-sm">Inscrever-se</a>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section-alt" style="margin-bottom: 4rem;">
      <div class="container">
        <div class="cta-section">
          <h2>Obtenha a sua certificação</h2>
          <p>Inscreva-se num curso e conquiste a sua certificação profissional com a Ilungi-Academia.</p>
          <div class="cta-actions">
            <a routerLink="/cursos" class="btn btn-white btn-lg">Ver Cursos Disponíveis</a>
            <a routerLink="/registro" class="btn btn-outline-white btn-lg">Criar Conta</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cert-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2.25rem;
    }
    .cert-card {
      display: flex;
      gap: 1.25rem;
      align-items: flex-start;
      padding: 2rem;
    }
    .cert-icon {
      width: 56px;
      height: 56px;
      border-radius: 0.875rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .cert-body { flex: 1; }
    .cert-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--gray-900);
      margin: 0.375rem 0 0.5rem;
      transition: color 0.2s;
    }
    .cert-card:hover .cert-title { color: var(--primary); }
    .cert-desc {
      font-size: 0.875rem;
      color: var(--gray-500);
      line-height: 1.65;
      margin-bottom: 1rem;
    }
    .cert-features {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      margin-bottom: 1.25rem;
    }
    .cert-features li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: var(--gray-600);
    }
    .cert-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
      border-top: 1px solid var(--gray-100);
    }
    .cert-price {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--primary);
    }
    @media (max-width: 768px) {
      .cert-grid { grid-template-columns: 1fr; }
      .cert-card { flex-direction: column; }
    }
  `]
})
export class CertificationsComponent {
  certifications = [
    {
      id: 1,
      name: 'Certificado Profissional em Gestão de Projetos',
      description: 'Certificação que valida as suas competências em planeamento, execução e controlo de projectos.',
      level: 'Avançado',
      price: 'AOA 25.000',
      bg: '#ede9fe', color: '#7c3aed',
      features: ['Reconhecido no mercado nacional', 'Inclui exame final', 'Válido por 3 anos', 'Suporte pós-certificação']
    },
    {
      id: 2,
      name: 'Certificado em Desenvolvimento Web',
      description: 'Certificação que atesta as suas habilidades em desenvolvimento web front-end e back-end.',
      level: 'Intermédio',
      price: 'AOA 30.000',
      bg: '#dbeafe', color: '#2563eb',
      features: ['Portfolio de projectos incluído', 'Avaliação prática', 'Acesso vitalício ao material', 'Mentoria individual']
    },
    {
      id: 3,
      name: 'Certificado de Liderança e Gestão',
      description: 'Certificação para líderes que pretendem elevar as suas competências de gestão de equipas.',
      level: 'Avançado',
      price: 'AOA 22.000',
      bg: '#d1fae5', color: '#059669',
      features: ['Workshops presenciais', 'Casos de estudo reais', 'Acesso à comunidade leader', 'Coaching de carreira']
    },
    {
      id: 4,
      name: 'Certificado em Marketing Digital',
      description: 'Certificação especializada em marketing digital, redes sociais e estratégias de crescimento.',
      level: 'Básico–Intermédio',
      price: 'AOA 20.000',
      bg: '#fce7f3', color: '#db2777',
      features: ['Ferramentas práticas incluídas', 'Projectos reais', 'Actualização contínua', 'Suporte por email']
    }
  ];
}
