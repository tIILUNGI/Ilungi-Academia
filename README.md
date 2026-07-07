# Landing Page — Academia Ilungi

Este repositório contém a página de apresentação pública, catálogo de cursos e portal institucional da **Academia Ilungi**.

## 🛠️ Tecnologias Utilizadas

- **Core**: Angular 17.3.0 (Componentes Standalone)
- **Roteamento**: Angular Router com mecanismos de redirecionamento para o ambiente interno do estudante (Vite/React).
- **Estilização**: SCSS Modular baseado em design tokens unificados de marca.

## 🚀 Como Iniciar Localmente

1. **Instalar Dependências**:
   ```bash
   npm install
   ```

2. **Iniciar Servidor de Desenvolvimento**:
   ```bash
   npm run start
   ```
   *Nota: O servidor ficará disponível por padrão em `http://localhost:4200`.*

3. **Compilar para Produção**:
   ```bash
   npm run build
   ```

## 📂 Organização das Rotas e Páginas

Toda a área restrita do aluno e o fluxo de autenticação foram migrados para o repositório **Ilungi-Academia-Apk** para simplificar e modularizar as aplicações.

As seguintes rotas públicas continuam ativas neste repositório:
- `/` (Página Inicial/Landing)
- `/cursos` (Catálogo Geral de Cursos)
- `/certificacoes` (Informações sobre certificações corporativas)
- `/certificados/verificar` (Validação de credenciais e certificados emitidos)

As rotas a seguir efetuam o redirecionamento automático para o Portal do Aluno hospedado no repositório APK:
- `/login` → Redireciona para o portal principal
- `/registro` → Redireciona para o formulário de cadastro do portal
- `/recuperar-senha` → Redireciona para o fluxo de redefinição do portal
- `/area-do-aluno` → Redireciona para a início da área logada
