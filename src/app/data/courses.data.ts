// Catálogo de cursos canónico da Academia Ilungi (AIA).
// Fonte única de verdade partilhada entre a landing page, o catálogo de cursos,
// as certificações, a área do aluno e o painel administrativo.

export interface CourseItem {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  workload: number;
  level: string;
  modality: string;
  certificate: boolean;
  startDate: string;
  featured: boolean;
  enrolled: boolean;
  image: string;
  // Metadados de certificação (derivados do mesmo curso)
  certName: string;
  certBg: string;
  certColor: string;
  certFeatures: string[];
}

export const COURSES: CourseItem[] = [
  {
    id: 1,
    title: 'Gestão de Projetos',
    description: 'Aprenda as melhores práticas de gestão de projetos do zero ao avançado.',
    category: 'Gestão',
    price: 15000,
    duration: 40,
    workload: 40,
    level: 'Beginner to Advanced',
    modality: 'Online',
    certificate: true,
    startDate: 'Next cohort: July 2026',
    featured: true,
    enrolled: false,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60',
    certName: 'Certificado Profissional em Gestão de Projetos',
    certBg: '#ede9fe',
    certColor: '#7c3aed',
    certFeatures: ['Reconhecido no mercado nacional', 'Inclui exame final', 'Válido por 3 anos', 'Suporte pós-certificação']
  },
  {
    id: 2,
    title: 'Desenvolvimento Web',
    description: 'Domine HTML, CSS, JavaScript e frameworks modernos.',
    category: 'Tecnologia',
    price: 20000,
    duration: 60,
    workload: 60,
    level: 'Intermediate',
    modality: 'Live Sessions',
    certificate: true,
    startDate: 'Next cohort: August 2026',
    featured: true,
    enrolled: false,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60',
    certName: 'Certificado em Desenvolvimento Web',
    certBg: '#dbeafe',
    certColor: '#2563eb',
    certFeatures: ['Portfolio de projectos incluído', 'Avaliação prática', 'Acesso vitalício ao material', 'Mentoria individual']
  },
  {
    id: 3,
    title: 'Liderança e Gestão de Equipas',
    description: 'Desenvolva habilidades de liderança e gestão de equipas eficazes.',
    category: 'Liderança',
    price: 18000,
    duration: 30,
    workload: 30,
    level: 'All Levels',
    modality: 'Hybrid',
    certificate: true,
    startDate: 'Next cohort: September 2026',
    featured: false,
    enrolled: false,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60',
    certName: 'Certificado de Liderança e Gestão',
    certBg: '#d1fae5',
    certColor: '#059669',
    certFeatures: ['Workshops presenciais', 'Casos de estudo reais', 'Acesso à comunidade leader', 'Coaching de carreira']
  },
  {
    id: 4,
    title: 'Marketing Digital',
    description: 'Aprenda estratégias de marketing digital para crescer a sua empresa.',
    category: 'Marketing',
    price: 12000,
    duration: 25,
    workload: 25,
    level: 'Beginner',
    modality: 'Online',
    certificate: true,
    startDate: 'Next cohort: October 2026',
    featured: false,
    enrolled: false,
    image: 'https://images.unsplash.com/photo-1432888622747-8eb15fd3f291?w=800&auto=format&fit=crop&q=60',
    certName: 'Certificado em Marketing Digital',
    certBg: '#fce7f3',
    certColor: '#db2777',
    certFeatures: ['Ferramentas práticas incluídas', 'Projectos reais', 'Actualização contínua', 'Suporte por email']
  },
  {
    id: 5,
    title: 'Análise de Dados',
    description: 'Domine Python, SQL e ferramentas de visualização de dados.',
    category: 'Tecnologia',
    price: 25000,
    duration: 50,
    workload: 50,
    level: 'Advanced',
    modality: 'Live Sessions',
    certificate: true,
    startDate: 'Next cohort: November 2026',
    featured: true,
    enrolled: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    certName: 'Certificado em Análise de Dados',
    certBg: '#dbeafe',
    certColor: '#2563eb',
    certFeatures: ['Projectos com dados reais', 'Dashboards profissionais', 'Mentoria de carreira', 'Certificado reconhecido']
  },
  {
    id: 6,
    title: 'Comunicação Empresarial',
    description: 'Melhore suas habilidades de comunicação no ambiente corporativo.',
    category: 'Soft Skills',
    price: 10000,
    duration: 20,
    workload: 20,
    level: 'All Levels',
    modality: 'Online',
    certificate: true,
    startDate: 'Next cohort: December 2026',
    featured: false,
    enrolled: false,
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc80b4f5?w=800&auto=format&fit=crop&q=60',
    certName: 'Certificado em Comunicação Empresarial',
    certBg: '#fef3c7',
    certColor: '#d97706',
    certFeatures: ['Simulações práticas', 'Feedback personalizado', 'Material vitalício', 'Acesso à comunidade']
  },
  {
    id: 7,
    title: 'Gestão Financeira',
    description: 'Aprenda a gerir finanças empresariais de forma eficaz.',
    category: 'Gestão',
    price: 17000,
    duration: 35,
    workload: 35,
    level: 'Intermediate',
    modality: 'Online',
    certificate: true,
    startDate: 'Next cohort: July 2026',
    featured: false,
    enrolled: false,
    image: 'https://images.unsplash.com/photo-1554224155-6726a3ffc667?w=800&auto=format&fit=crop&q=60',
    certName: 'Certificado em Gestão Financeira',
    certBg: '#ede9fe',
    certColor: '#7c3aed',
    certFeatures: ['Casos práticos empresariais', 'Planilhas incluídas', 'Avaliação final', 'Suporte pós-certificação']
  },
  {
    id: 8,
    title: 'SEO e Marketing de Conteúdo',
    description: 'Estratégias avançadas de SEO e marketing de conteúdo.',
    category: 'Marketing',
    price: 14000,
    duration: 28,
    workload: 28,
    level: 'Intermediate',
    modality: 'Online',
    certificate: true,
    startDate: 'Next cohort: August 2026',
    featured: true,
    enrolled: false,
    image: 'https://images.unsplash.com/photo-1439736632362-2d9d13eb0a7d?w=800&auto=format&fit=crop&q=60',
    certName: 'Certificado em SEO e Marketing de Conteúdo',
    certBg: '#fce7f3',
    certColor: '#db2777',
    certFeatures: ['Auditoria SEO incluída', 'Projectos reais', 'Actualização contínua', 'Suporte por email']
  },
  {
    id: 9,
    title: 'Python para Iniciantes',
    description: 'Introdução à programação com Python.',
    category: 'Tecnologia',
    price: 13000,
    duration: 30,
    workload: 30,
    level: 'Beginner',
    modality: 'Online',
    certificate: true,
    startDate: 'Next cohort: September 2026',
    featured: false,
    enrolled: false,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=800&auto=format&fit=crop&q=60',
    certName: 'Certificado em Python para Iniciantes',
    certBg: '#dbeafe',
    certColor: '#2563eb',
    certFeatures: ['Projects práticos', 'Acesso vitalício', 'Mentoria inicial', 'Certificado reconhecido']
  }
];
