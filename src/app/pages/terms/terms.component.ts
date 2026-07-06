import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="section-label">Legal</span>
        <h1>Termos de Serviço</h1>
        <p>Última atualização: 03 de Julho de 2026</p>
      </div>
    </div>

    <section class="section section-alt" style="padding:3rem 0 5rem;">
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto; background: var(--white); padding: 2.5rem 2rem; border-radius: var(--radius-lg); border: 1px solid var(--gray-200); box-shadow: var(--shadow-sm); line-height: 1.7; color: var(--gray-700);">
          <a routerLink="/registro" class="btn btn-secondary" style="display:inline-flex; margin-bottom:1.5rem; border-radius:var(--radius-sm); border:1px solid var(--gray-200); height:40px; padding:0 1.25rem; font-size:0.875rem; font-weight:500; align-items:center; gap:0.5rem; text-decoration:none; color:var(--gray-700);">
            &larr; Voltar
          </a>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">1. Aceitação dos Termos</h2>
          <p style="margin-bottom: 1.5rem;">Ao aceder e utilizar a plataforma Academia Ilungi, você concorda em cumprir e ficar vinculado a estes Termos de Serviço. Caso não concorde, não utilize a plataforma.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">2. Descrição do Serviço</h2>
          <p style="margin-bottom: 1.5rem;">A Academia Ilungi oferece cursos online, certificações profissionais e serviços de educação à distância em Angola. Os conteúdos são disponibilizados para fins de formação profissional.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">3. Conta do Utilizador</h2>
          <p style="margin-bottom: 1.5rem;">Você é responsável por manter a confidencialidade das suas credenciais e por todas as atividades realizadas na sua conta. Notifique-nos imediatamente sobre qualquer uso não autorizado.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">4. Pagamentos e Reembolsos</h2>
          <p style="margin-bottom: 1.5rem;">Os pagamentos são processados de acordo com os preços apresentados no catálogo. Reembolsos podem ser solicitados no prazo de 7 dias após a compra, desde que nenhum certificado tenha sido emitido.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">5. Propriedade Intelectual</h2>
          <p style="margin-bottom: 1.5rem;">Todo o conteúdo da plataforma — textos, vídeos, imagens e marcas — é propriedade da Academia Ilungi. É proibida a reprodução ou distribuição sem autorização prévia por escrito.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">6. Limitação de Responsabilidade</h2>
          <p style="margin-bottom: 1.5rem;">A Academia Ilungi não se responsabiliza por danos diretos ou indiretos resultantes do uso da plataforma. O serviço é fornecido "como está", sem garantias de resultados profissionais específicos.</p>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">7. Contacto</h2>
          <p style="margin-bottom: 0;">Para questões sobre estes Termos, contacte-nos em <a href="mailto:solucoes&#64;ilungi.ao" style="color: var(--primary); font-weight: 600;">solucoes&#64;ilungi.ao</a>.</p>
        </div>
      </div>
    </section>
  `
})
export class TermsComponent {}
