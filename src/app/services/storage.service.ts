import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly USERS_KEY = 'ailungi_users';
  private readonly CERTIFICATES_KEY = 'ailungi_certificates';
  private readonly CURRENT_USER_KEY = 'ailungi_current_user';

  private readonly ENROLLMENTS_KEY = 'ailungi_enrollments';
  private readonly ENROLLMENTS_BY_USER_KEY = 'ailungi_enrollments_by_user';
  private readonly ENROLLMENTS_VERSION_KEY = 'ailungi_enrollments_version';

  private readonly NOTIFICATIONS_KEY = 'ailungi_notifications';
  private readonly COMMUNITY_POSTS_KEY = 'ailungi_community_posts';
  private readonly TOKEN_KEY = 'ailungi_token';

  constructor() {
  }

  private initializeDemoData() {
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

    if (!localStorage.getItem(this.NOTIFICATIONS_KEY)) {
      const demoNotifications = [
        {
          id: 'n1',
          title: 'Novo curso disponível',
          message: 'Desenvolvimento Web Fullstack já está disponível para inscrição.',
          type: 'info',
          read: false,
          link: '/cursos',
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'n2',
          title: 'Aula ao vivo amanhã',
          message: 'Não se esqueça da aula de Liderança às 14h.',
          type: 'warning',
          read: false,
          link: '/area-do-aluno/cursos',
          createdAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 'n3',
          title: 'Certificado emitido',
          message: 'O seu certificado de Gestão de Projetos está pronto.',
          type: 'success',
          read: true,
          link: '/area-do-aluno/certificados',
          createdAt: new Date(Date.now() - 259200000).toISOString()
        }
      ];
      localStorage.setItem(this.NOTIFICATIONS_KEY, JSON.stringify(demoNotifications));
    }

    if (!localStorage.getItem(this.COMMUNITY_POSTS_KEY)) {
      const demoPosts = [
        {
          id: 'p1',
          author: 'Ana Pereira',
          avatar: 'https://ui-avatars.com/api/?name=Ana+Pereira&background=7c3aed&color=fff',
          content: 'Acabei de concluir o curso de Gestão de Projetos! Foi uma experiência incrível. Alguém mais está fazendo?',
          likes: 12,
          likedBy: [],
          comments: [
            { author: 'Carlos Mendes', text: 'Parabéns! Vou começar o mês que vem.', createdAt: new Date(Date.now() - 86400000).toISOString() }
          ],
          shares: 3,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'p2',
          author: 'Miguel Costa',
          avatar: 'https://ui-avatars.com/api/?name=Miguel+Costa&background=3b82f6&color=fff',
          content: 'Dica de estudo: use a técnica Pomodoro para manter o foco nos cursos. Funciona muito bem para mim!',
          likes: 28,
          likedBy: [],
          comments: [],
          shares: 7,
          createdAt: new Date(Date.now() - 172800000).toISOString()
        }
      ];
      localStorage.setItem(this.COMMUNITY_POSTS_KEY, JSON.stringify(demoPosts));
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
    localStorage.removeItem(this.TOKEN_KEY);
  }

  setCurrentUser(user: any): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Certificate methods
  getCertificates(): any[] {
    const certs = localStorage.getItem(this.CERTIFICATES_KEY);
    return certs ? JSON.parse(certs) : [];
  }

  // Normaliza certificados emitidos pelo painel AIA e pelo portal do aluno,
  // garantindo um formato único e sincronizado para a verificação.
  private normalizeCertificate(c: any): any {
    const code = (c.code || c.verificationCode || '').toString().trim();
    return {
      code,
      verificationCode: code,
      name: c.name || (c.courseName ? `Certificado de Conclusão - ${c.courseName}` : ''),
      holder: c.holder || c.recipientName || '',
      recipientEmail: c.recipientEmail || '',
      course: c.course || c.courseName || '',
      courseId: c.courseId || '',
      workloadHours: c.workloadHours != null ? c.workloadHours : null,
      instructorName: c.instructorName || '',
      issueDate: c.issueDate || '',
      completionDate: c.completionDate || c.issueDate || '',
      validUntil: c.validUntil || '',
      status: c.status === 'revogado' || c.status === 'revoked' ? 'revoked' : (c.status || 'active')
    };
  }

  verifyCertificate(code: string): any | null {
    const normalized = this.getCertificates().map(c => this.normalizeCertificate(c));
    const search = (code || '').toString().trim().toUpperCase();
    if (!search) return null;
    return normalized.find(c => c.code.toUpperCase() === search) || null;
  }

  // Enrollment methods (sistema interno por usuário)
  private getEnrollmentsByUser(userEmail: string): any[] {
    const raw = localStorage.getItem(this.ENROLLMENTS_BY_USER_KEY);
    if (!raw) return [];
    const all = JSON.parse(raw) as Record<string, any[]>;
    return all[userEmail] ? all[userEmail] : [];
  }

  private setEnrollmentsByUser(userEmail: string, enrollments: any[]): void {
    const raw = localStorage.getItem(this.ENROLLMENTS_BY_USER_KEY);
    const all = raw ? (JSON.parse(raw) as Record<string, any[]>) : {};
    all[userEmail] = enrollments;
    localStorage.setItem(this.ENROLLMENTS_BY_USER_KEY, JSON.stringify(all));
  }

  private migrateLegacyEnrollmentsIfNeeded(): void {
    const rawByUser = localStorage.getItem(this.ENROLLMENTS_BY_USER_KEY);
    if (rawByUser) return;

    const currentUser = this.getCurrentUser();
    if (!currentUser?.email) return;

    const legacy = localStorage.getItem(this.ENROLLMENTS_KEY);
    if (!legacy) {
      localStorage.setItem(this.ENROLLMENTS_BY_USER_KEY, JSON.stringify({ [currentUser.email]: [] }));
      return;
    }

    const legacyEnrollments = JSON.parse(legacy);
    this.setEnrollmentsByUser(currentUser.email, legacyEnrollments);
    localStorage.setItem(this.ENROLLMENTS_VERSION_KEY, 'migrated');
  }

  getEnrollments(): any[] {
    const currentUser = this.getCurrentUser();
    if (!currentUser?.email) return [];
    this.migrateLegacyEnrollmentsIfNeeded();
    return this.getEnrollmentsByUser(currentUser.email);
  }

  addEnrollment(enrollment: any): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser?.email) return;
    this.migrateLegacyEnrollmentsIfNeeded();
    const enrollments = this.getEnrollmentsByUser(currentUser.email);
    enrollments.push(enrollment);
    this.setEnrollmentsByUser(currentUser.email, enrollments);
  }

  updateEnrollmentProgress(courseName: string, progress: number): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser?.email) return;
    this.migrateLegacyEnrollmentsIfNeeded();
    const enrollments = this.getEnrollmentsByUser(currentUser.email);
    const enrollment = enrollments.find(e => e.course === courseName);
    if (enrollment) {
      enrollment.progress = progress;
      if (progress >= 100) enrollment.status = 'completed';
      this.setEnrollmentsByUser(currentUser.email, enrollments);
    }
  }

  // Notifications
  getNotifications(): any[] {
    const raw = localStorage.getItem(this.NOTIFICATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  saveNotifications(notifications: any[]): void {
    localStorage.setItem(this.NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }

  markNotificationRead(notificationId: string): void {
    const notifications = this.getNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveNotifications(notifications);
    }
  }

  markAllNotificationsRead(): void {
    const notifications = this.getNotifications();
    notifications.forEach(n => n.read = true);
    this.saveNotifications(notifications);
  }

  getUnreadNotificationsCount(): number {
    return this.getNotifications().filter(n => !n.read).length;
  }

  // Community Posts
  getCommunityPosts(): any[] {
    const raw = localStorage.getItem(this.COMMUNITY_POSTS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  saveCommunityPosts(posts: any[]): void {
    localStorage.setItem(this.COMMUNITY_POSTS_KEY, JSON.stringify(posts));
  }

  addCommunityPost(post: any): void {
    const posts = this.getCommunityPosts();
    posts.unshift(post);
    this.saveCommunityPosts(posts);
  }

  toggleLikePost(postId: string, userEmail: string): void {
    const posts = this.getCommunityPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
      if (!post.likedBy) post.likedBy = [];
      const index = post.likedBy.indexOf(userEmail);
      if (index === -1) {
        post.likedBy.push(userEmail);
        post.likes++;
      } else {
        post.likedBy.splice(index, 1);
        post.likes--;
      }
      this.saveCommunityPosts(posts);
    }
  }

  addCommentToPost(postId: string, comment: any): void {
    const posts = this.getCommunityPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
      if (!post.comments) post.comments = [];
      post.comments.push(comment);
      this.saveCommunityPosts(posts);
    }
  }

  sharePost(postId: string): void {
    const posts = this.getCommunityPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.shares++;
      this.saveCommunityPosts(posts);
    }
  }

  getQuizResult(courseId: string | number): any {
    const key = `quizResult_${courseId}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }

  setQuizResult(courseId: string | number, result: any): void {
    const key = `quizResult_${courseId}`;
    localStorage.setItem(key, JSON.stringify(result));
  }
}
