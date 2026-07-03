import { Routes } from '@angular/router';

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
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'recuperar-senha',
    loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'area-do-aluno',
    loadComponent: () => import('./pages/student-area/student-area.component').then(m => m.StudentAreaComponent)
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
    path: 'termos',
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'privacidade',
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
