import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-grid">
          <!-- Content -->
          <div class="hero-content">
            <span class="hero-label animate-on-load">
              Plataforma de Excelência em Angola
            </span>

            <h1 class="animate-on-load delay-1">Aprenda sem <span class="text-gradient">fronteiras</span></h1>

            <p class="hero-description animate-on-load delay-2">
              Transforme a sua carreira com os nossos cursos online e certificações reconhecidas.
              Aprenda com especialistas e conquiste o seu futuro com a <strong>Ilungi-Academia</strong>.
            </p>

            <div class="hero-actions animate-on-load delay-3">
              <a routerLink="/cursos" class="btn btn-primary btn-lg">Ver Cursos Disponíveis</a>
              <a routerLink="/registro" class="btn btn-secondary btn-lg">Criar Conta Grátis</a>
            </div>

            <div class="hero-badges animate-on-load delay-4">
              @for (badge of heroBadges; track badge.label) {
                <div class="hero-badge">
                  <span>{{ badge.label }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Visual -->
          <div class="hero-visual hero-visual-container" style="--delay: 200ms;">
            <div class="hero-card">
              <img src="assets/ilungi_logo.jpg" alt="Ilungi Logo" style="width: 100%; max-width: 200px; margin: 0 auto 1rem; display: block;">

              <div style="margin-top:1.5rem; display:flex; flex-direction:column; gap:0.75rem;">
                @for (s of progressStats; track s.label) {
                  <div style="display:flex; align-items:center; justify-content:space-between; gap:0.75rem;">
                    <span style="font-size:0.78rem; color:var(--gray-500); white-space:nowrap;">{{ s.label }}</span>
                    <div style="flex:1; height:6px; background:var(--gray-100); border-radius:9999px; overflow:hidden;">
                      <div [style.width]="s.pct" style="height:100%; background:var(--gradient); border-radius:9999px;"></div>
                    </div>
                    <span style="font-size:0.75rem; font-weight:700; color:var(--primary); min-width:2.5rem; text-align:right;">{{ s.pct }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section style="background:var(--gray-50); padding:2rem 0; margin-bottom: 4rem;">
      <div class="container">
        <div class="stats-bar animate-on-load delay-3" style="gap: 2rem;">
          @for (s of statsBar; track s.label) {
            <div class="stat-item">
              <span class="stat-number">{{ s.value }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Featured Courses -->
    <section class="section" style="padding-bottom: 5rem; margin-bottom: 3rem;">
      <div class="container">
        <div class="section-header animate-on-load">
          <span class="section-label">Destaques</span>
          <h2 class="section-title">Cursos em Destaque</h2>
          <p class="section-subtitle">Descubra os nossos cursos mais populares e comece a aprender hoje mesmo.</p>
        </div>

        <div class="grid-courses animate-on-load delay-2" style="gap: 2rem;">
          @for (course of featuredCourses; track course.id) {
            <div class="card card-course">
              <div class="card-course-thumb"></div>
              <div class="card-course-body">
                <span class="badge badge-primary">{{ course.category }}</span>
                <h3 class="card-course-title">{{ course.title }}</h3>
                <p class="card-course-desc">{{ course.description }}</p>
                <div class="card-course-footer">
                  <div>
                    <span class="course-price">{{ course.price }}</span>
                    <p style="font-size:0.72rem;color:var(--gray-400);margin-top:2px;">{{ course.duration }}h de conteúdo</p>
                  </div>
                  <a [routerLink]="['/cursos', course.id]" class="btn btn-ghost btn-sm">Ver Detalhes</a>
                </div>
              </div>
            </div>
          }
        </div>

        <div style="text-align:center; margin-top:3rem;">
          <a routerLink="/cursos" class="btn btn-ghost animate-on-load delay-3">Ver Todos os Cursos &rarr;</a>
        </div>
      </div>
    </section>

    <!-- Why Ilungi -->
    <section class="section section-alt" style="margin-top: 5rem; padding-top: 5rem; padding-bottom: 5rem; margin-bottom: 3rem;">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Por que nos escolher</span>
          <h2 class="section-title">O que nos diferencia</h2>
          <p class="section-subtitle">A Ilungi-Academia oferece uma experiência de aprendizagem única e adaptada ao mercado angolano.</p>
        </div>
        <div class="features-grid">
          @for (f of features; track f.title) {
            <div class="feature-card">
              <h3 class="feature-title">{{ f.title }}</h3>
              <p class="feature-desc">{{ f.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section" style="margin-top: 5rem; padding-top: 6rem; padding-bottom: 6rem; margin-bottom: 4rem;">
      <div class="container">
        <div class="cta-section">
          <h2>Pronto para começar a aprender?</h2>
          <p>Crie a sua conta agora e tenha acesso a todos os nossos cursos e certificações.</p>
          <div class="cta-actions">
            <a routerLink="/registro" class="btn btn-white btn-lg">Criar Conta Grátis</a>
            <a routerLink="/login" class="btn btn-outline-white btn-lg">Já tenho conta</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2.5rem;
    }
    .feature-card {
      background: white;
      border-radius: 1rem;
      padding: 2.5rem 1.75rem;
      border: 1px solid var(--gray-200);
      border-top: 4px solid var(--primary);
      transition: box-shadow 0.25s, transform 0.25s;
      text-align: center;
    }
    .feature-card:hover {
      box-shadow: 0 10px 25px -5px rgba(0,0,0,.1);
      transform: translateY(-3px);
    }
    .feature-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--gray-900);
      margin-bottom: 0.5rem;
    }
    .feature-desc {
      font-size: 0.875rem;
      color: var(--gray-500);
      line-height: 1.65;
    }
    @media (max-width: 900px) {
      .features-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .features-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent {
  heroBadges = [
    { label: 'Cursos Certificados' },
    { label: 'Professores Especialistas' },
    { label: 'Certificado de Conclusão' },
  ];

  progressStats = [
    { label: 'Satisfação', pct: '98%' },
    { label: 'Conclusão', pct: '85%' },
    { label: 'Empregabilidade', pct: '92%' },
  ];

  statsBar = [
    { value: '500+', label: 'Alunos Matriculados' },
    { value: '30+', label: 'Cursos Disponíveis' },
    { value: '15+', label: 'Instrutores Especializados' },
    { value: '98%', label: 'Taxa de Satisfação' },
  ];

  featuredCourses = [
    { id: 1, title: 'Gestão de Projetos', description: 'Aprenda as melhores práticas de gestão de projetos do zero ao avançado.', category: 'Gestão', price: 'AOA 15.000', duration: 40 },
    { id: 2, title: 'Desenvolvimento Web', description: 'Domine HTML, CSS, JavaScript e frameworks modernos.', category: 'Tecnologia', price: 'AOA 20.000', duration: 60 },
    { id: 3, title: 'Liderança e Gestão de Equipas', description: 'Desenvolva habilidades de liderança e gestão de equipas eficazes.', category: 'Liderança', price: 'AOA 18.000', duration: 30 },
  ];

  features = [
    { title: 'Aprendizagem Flexível', desc: 'Estude no seu ritmo, de qualquer lugar e a qualquer hora com acesso 24/7.' },
    { title: 'Certificados Reconhecidos', desc: 'Certificações valorizadas pelo mercado de trabalho angolano e internacional.' },
    { title: 'Suporte Dedicado', desc: 'Equipa de suporte disponível para o ajudar durante toda a sua jornada.' },
    { title: 'Conteúdo Actualizado', desc: 'Material sempre actualizado com as últimas tendências do mercado.' },
    { title: 'Comunidade Activa', desc: 'Faça parte de uma comunidade vibrante de alunos e profissionais.' },
    { title: 'Acessibilidade', desc: 'Plataforma acessível a partir de qualquer dispositivo — computador, tablet ou smartphone.' },
  ];
}
