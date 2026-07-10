import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseApiService, CertificationItem } from '../../services/course-api.service';
import { COURSES, CourseItem } from '../../data/courses.data';

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
              Transforme a sua carreira com os nossos cursos online e certificações.
              Aprenda com especialistas e conquiste o seu futuro com a <strong>Academia Ilungi</strong>.
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
              <div class="card-course-thumb">
                <img [src]="course.image" [alt]="course.title" style="width:100%; height:100%; object-fit:cover;">
              </div>
              <div class="card-course-body">
                <span class="badge badge-primary">{{ course.category }}</span>
                <h3 class="card-course-title">{{ course.title }}</h3>
                <p class="card-course-desc">{{ course.description }}</p>
                <div class="card-course-footer">
                  <div>
                    <span class="course-price">{{ course.price }}</span>
                    <p style="font-size:0.72rem;color:var(--gray-400);margin-top:2px;">{{ course.duration }}h de conteúdo</p>
                  </div>
                  <button (click)="openCourseModal(course)" class="btn btn-ghost btn-sm">Ver Detalhes</button>
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

    <!-- Featured Certifications -->
    <section class="section" style="padding-bottom: 5rem; margin-bottom: 3rem;">
      <div class="container">
        <div class="section-header animate-on-load">
          <span class="section-label">Certificações</span>
          <h2 class="section-title">Certificações Profissionais</h2>
          <p class="section-subtitle">Obtenha certificações que impulsionam a sua carreira no mercado angolano e internacional.</p>
        </div>

        <div class="cert-grid animate-on-load delay-2" style="gap: 2rem;">
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
                  <a routerLink="/certificacoes" class="btn btn-primary btn-sm">Ver Certificações</a>
                </div>
              </div>
            </div>
          }
        </div>

        <div style="text-align:center; margin-top:3rem;">
          <a routerLink="/certificacoes" class="btn btn-ghost animate-on-load delay-3">Ver Todas as Certificações &rarr;</a>
        </div>
      </div>
    </section>

 <!-- Course Details Modal -->
    @if (selectedCourse) {
      <div class="modal-overlay" (click)="closeCourseModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ selectedCourse.title }}</h2>
            <button (click)="closeCourseModal()" class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <span class="badge badge-primary">{{ selectedCourse.category }}</span>
            <p style="margin:1rem 0 1.5rem;">{{ selectedCourse.description }}</p>
            <div class="course-details-grid">
              <div class="detail-item">
                <span class="detail-label">Modalidade</span>
                <span class="detail-value">{{ selectedCourse.modality }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Duração</span>
                <span class="detail-value">{{ selectedCourse.duration }}h</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Carga Horária</span>
                <span class="detail-value">{{ selectedCourse.workload }}h</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Nível</span>
                <span class="detail-value">{{ selectedCourse.level }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Certificado</span>
                <span class="detail-value">{{ selectedCourse.certificate ? 'Incluído' : 'Não Incluído' }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Início</span>
                <span class="detail-value">{{ selectedCourse.startDate }}</span>
              </div>
            </div>
            <div class="modal-price">
              <span class="course-price">{{ selectedCourse.price }}</span>
            </div>
          </div>
        </div>
      </div>
    }

    <!-- Why Ilungi -->
    <section class="section section-alt" style="margin-top: 5rem; padding-top: 5rem; padding-bottom: 5rem; margin-bottom: 3rem;">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Por que nos escolher</span>
          <h2 class="section-title">O que nos diferencia</h2>
          <p class="section-subtitle">A Academia Ilungi oferece uma experiência de aprendizagem única e adaptada ao mercado angolano.</p>
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
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
    }
    .modal-content {
      background: white;
      border-radius: 1rem;
      max-width: 500px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--gray-200);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal-header h2 {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--gray-900);
      margin: 0;
    }
    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--gray-500);
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-body {
      padding: 1.5rem;
    }
    .course-details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin: 1rem 0 1.5rem;
    }
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
.detail-label {
       font-size: 0.75rem;
       font-weight: 600;
       color: var(--gray-500);
       text-transform: uppercase;
     }
     .detail-value {
       font-size: 0.875rem;
       color: var(--gray-900);
     }
     .modal-price {
       text-align: center;
       padding-top: 1rem;
       border-top: 1px solid var(--gray-200);
     }
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
     @media (max-width: 900px) {
       .features-grid { grid-template-columns: repeat(2, 1fr); }
       .cert-grid { grid-template-columns: 1fr; }
       .cert-card { flex-direction: column; }
     }
     @media (max-width: 600px) {
       .features-grid { grid-template-columns: 1fr; }
     }
   `]
})
export class HomeComponent implements OnInit {
  heroBadges = [
    { label: 'Cursos Certificados' },
    { label: 'Professores Especialistas' },
    { label: 'Certificado de Conclusão' },
  ];

  progressStats = [
    { label: 'Satisfação', pct: '80%' },
    { label: 'Conclusão', pct: '85%' },
  ];

  statsBar = [
    { value: '500+', label: 'Alumni' },
    { value: '30+', label: 'Cursos Disponíveis' },
    { value: '15+', label: 'Instrutores Especializados' },
    { value: '80%', label: 'Taxa de Satisfação' },
  ];

  selectedCourse: any = null;

  featuredCourses: any[] = [];
  certifications: CertificationItem[] = [];

  constructor(private courseApi: CourseApiService) {}

  ngOnInit(): void {
    this.courseApi.getCourses().subscribe({
      next: (data: CourseItem[]) => {
        const courses = data && data.length ? data : COURSES;
        this.featuredCourses = courses
          .filter(c => c.featured)
          .slice(0, 3)
          .map(c => ({ ...c, price: this.formatPrice(c.price) }));
      },
      error: () => {
        this.featuredCourses = COURSES
          .filter(c => c.featured)
          .slice(0, 3)
          .map(c => ({ ...c, price: this.formatPrice(c.price) }));
      }
    });

    this.courseApi.getCertifications().subscribe({
      next: (data: CertificationItem[]) => {
        this.certifications = data && data.length ? data.slice(0, 3) : [];
      },
      error: () => {
        this.certifications = [];
      }
    });
  }

  formatPrice(price: number): string {
    return 'AOA ' + price.toLocaleString('pt-AO');
  }

  features = [
    { title: 'Aprendizagem Flexível', desc: 'Estude no seu ritmo, de qualquer lugar e a qualquer hora com acesso 24/7.' },
    { title: 'Certificados Reconhecidos', desc: 'Certificações valorizadas pelo mercado de trabalho angolano e internacional.' },
    { title: 'Suporte Dedicado', desc: 'Equipa de suporte disponível para o ajudar durante toda a sua jornada.' },
    { title: 'Conteúdo Actualizado', desc: 'Material sempre actualizado com as últimas tendências do mercado.' },
    { title: 'Comunidade Activa', desc: 'Faça parte de uma comunidade vibrante de alunos e profissionais.' },
    { title: 'Acessibilidade', desc: 'Plataforma acessível a partir de qualquer dispositivo — computador, tablet ou smartphone.' },
  ];

  openCourseModal(course: any) {
    this.selectedCourse = course;
  }

  closeCourseModal() {
    this.selectedCourse = null;
  }
}