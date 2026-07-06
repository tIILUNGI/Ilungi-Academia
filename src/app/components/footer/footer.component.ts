import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-brand">
            <div class="logo-text">Academia<span>-Ilungi</span></div>
            <p>
              Plataforma de cursos online e certificações profissionais.
              Aprenda com os melhores especialistas e avance na sua carreira.
            </p>
          </div>

          <!-- Navegação -->
          <div class="footer-col">
            <h4>Plataforma</h4>
            <nav class="footer-links">
              <a routerLink="/">Início</a>
              <a routerLink="/cursos">Catálogo de Cursos</a>
              <a routerLink="/certificacoes">Certificações</a>
              <a routerLink="/certificados/verificar">Verificar Certificados</a>
            </nav>
          </div>

          <!-- Conta -->
          <div class="footer-col">
            <h4>Conta</h4>
            <nav class="footer-links">
              <a routerLink="/login">Entrar</a>
              <a routerLink="/registro">Criar Conta</a>
              <a routerLink="/area-do-aluno">Área do Aluno</a>
            </nav>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© {{ currentYear }} Academia Ilungi. Todos os direitos reservados.</p>
          <a routerLink="/sitemap">Mapa do Site</a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
