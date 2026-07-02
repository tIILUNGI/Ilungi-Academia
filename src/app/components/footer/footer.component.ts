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
            <div class="logo-text">Ilungi<span>-Academia</span></div>
            <p>
              Plataforma de cursos online e certificações profissionais reconhecidas.
              Aprenda com os melhores especialistas e avance na sua carreira.
            </p>
          </div>

          <!-- Navegação -->
          <div class="footer-col">
            <h4>Plataforma</h4>
            <nav class="footer-links">
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
          <p>© {{ currentYear }} Ilungi-Academia. Todos os direitos reservados.</p>
          <a routerLink="/sitemap">Mapa do Site</a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
