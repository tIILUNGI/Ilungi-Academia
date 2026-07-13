import { Routes } from '@angular/router';

// A simple external redirect route guard/function
const redirectExternal = (url: string) => {
  return () => {
    window.location.href = url;
    return false;
  };
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'cursos',
    loadComponent: () => import('./pages/courses/courses.component').then(m => m.CoursesComponent)
  },
  {
    path: 'certificacoes',
    loadComponent: () => import('./pages/certifications/certifications.component').then(m => m.CertificationsComponent)
  },
  {
    path: 'certificados/verificar',
    loadComponent: () => import('./pages/verify-certificate/verify-certificate.component').then(m => m.VerifyCertificateComponent)
  },
  {
    path: 'curso/:id',
    loadComponent: () => import('./pages/course-detail/course-detail.component').then(m => m.CourseDetailComponent)
  },
  {
    path: 'quiz/:courseId/:lessonId',
    loadComponent: () => import('./pages/quiz/quiz.component').then(m => m.QuizComponent)
  },
  {
    path: 'certificado/:courseId',
    loadComponent: () => import('./pages/certificate/certificate.component').then(m => m.CertificateComponent)
  },
  {
    path: 'termos',
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'privacidade',
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/redirect/redirect.component').then(m => m.RedirectComponent),
    canActivate: [redirectExternal('http://localhost:3000?view=register')]
  },
  {
    path: 'recuperar-senha',
    loadComponent: () => import('./pages/redirect/redirect.component').then(m => m.RedirectComponent),
    canActivate: [redirectExternal('http://localhost:3000?view=forgot-password')]
  },
  {
    path: 'area-do-aluno',
    loadComponent: () => import('./pages/redirect/redirect.component').then(m => m.RedirectComponent),
    canActivate: [redirectExternal('http://localhost:3000')]
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/redirect/redirect.component').then(m => m.RedirectComponent),
    canActivate: [redirectExternal('http://localhost:3001')]
  },
  {
    path: '**',
    redirectTo: ''
  }
];