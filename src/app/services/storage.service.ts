import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly USERS_KEY = 'ailungi_users';
  private readonly CERTIFICATES_KEY = 'ailungi_certificates';
  private readonly CURRENT_USER_KEY = 'ailungi_current_user';
  private readonly ENROLLMENTS_KEY = 'ailungi_enrollments';

  constructor() {
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Initialize demo certificates if not exists
    if (!localStorage.getItem(this.CERTIFICATES_KEY)) {
      const demoCertificates = [
        {
          code: 'ILUNGI-2024-CI-000001',
          name: 'Certificado de Conclusão - Gestão de Projetos',
          holder: 'João Silva',
          issueDate: '2024-01-15',
          validUntil: '2027-01-15',
          course: 'Gestão de Projetos PMI',
          status: 'active'
        },
        {
          code: 'ILUNGI-2024-QP-000001',
          name: 'Certificado de Conclusão - Qualidade de Projetos',
          holder: 'Maria Santos',
          issueDate: '2024-02-20',
          validUntil: '2027-02-20',
          course: 'Qualidade em Projetos',
          status: 'active'
        },
        {
          code: 'ILUNGI-2024-EP-000001',
          name: 'Certificado de Conclusão - Gestão de Escritório de Projetos',
          holder: 'Pedro Oliveira',
          issueDate: '2024-03-10',
          validUntil: '2027-03-10',
          course: 'Escritório de Projetos (PMO)',
          status: 'active'
        }
      ];
      localStorage.setItem(this.CERTIFICATES_KEY, JSON.stringify(demoCertificates));
    }

    // Initialize demo enrollments if not exists
    if (!localStorage.getItem(this.ENROLLMENTS_KEY)) {
      const demoEnrollments = [
        {
          id: '1',
          course: 'Gestão de Projetos PMI',
          progress: 75,
          status: 'in_progress',
          startDate: '2024-01-01',
          nextLesson: 'Module 5: Gestão de Riscos'
        },
        {
          id: '2',
          course: 'Scrum Master',
          progress: 30,
          status: 'in_progress',
          startDate: '2024-02-15',
          nextLesson: 'Module 3: Sprint Planning'
        }
      ];
      localStorage.setItem(this.ENROLLMENTS_KEY, JSON.stringify(demoEnrollments));
    }
  }

  // User methods
  getUsers(): any[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  saveUser(user: any): boolean {
    const users = this.getUsers();
    const existingUser = users.find((u: any) => u.email === user.email && (!user.provider || u.provider === user.provider));
    if (existingUser) {
      return false;
    }
    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

  authenticateUser(email: string, password: string): any | null {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  }

  getCurrentUser(): any | null {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  setCurrentUser(user: any): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  // Certificate methods
  getCertificates(): any[] {
    const certs = localStorage.getItem(this.CERTIFICATES_KEY);
    return certs ? JSON.parse(certs) : [];
  }

  verifyCertificate(code: string): any | null {
    const certificates = this.getCertificates();
    return certificates.find(c => c.code === code) || null;
  }

  // Enrollment methods
  getEnrollments(): any[] {
    const enrollments = localStorage.getItem(this.ENROLLMENTS_KEY);
    return enrollments ? JSON.parse(enrollments) : [];
  }

  addEnrollment(enrollment: any): void {
    const enrollments = this.getEnrollments();
    enrollments.push(enrollment);
    localStorage.setItem(this.ENROLLMENTS_KEY, JSON.stringify(enrollments));
  }

  updateEnrollmentProgress(courseName: string, progress: number): void {
    const enrollments = this.getEnrollments();
    const enrollment = enrollments.find(e => e.course === courseName);
    if (enrollment) {
      enrollment.progress = progress;
      if (progress >= 100) {
        enrollment.status = 'completed';
      }
      localStorage.setItem(this.ENROLLMENTS_KEY, JSON.stringify(enrollments));
    }
  }
}
