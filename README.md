# Projeto: Around The U.S. (Edição React)

Uma aplicação web interativa e responsiva baseada em React que permite aos utilizadores explorar fotos de lugares dos Estados Unidos, adicionar novos cartões, curtir fotos, editar as informações de perfil, alterar a foto do avatar e remover os cartões criados com confirmação prévia. O projeto foi portado de JavaScript puro para JSX e consome uma API externa assíncrona para persistência total dos dados de forma reativa.

## 🔗 Demonstração do Projeto

Aceda ao projeto publicado aqui: [https://marcosandre14.github.io/web_project_around_react/](https://marcosandre14.github.io/web_project_around_react/)

---

## 🛠️ Tecnologias e Conceitos Utilizados

- **React (Vite):** Estrutura de SPA reativa, modular e de alto desempenho para o ecossistema frontend.
- **Hooks do React:** Uso intensivo de `useState`, `useEffect`, `useContext` e `useRef` para gestão de estados de ciclo de vida e manipulação direta de elementos do DOM.
- **Context API (`CurrentUserContext`):** Elevação, centralização e fornecimento do estado global do utilizador atual para os componentes inscritos, eliminando a prática de Prop Drilling.
- **Programação Assíncrona (Fetch/API):** Integração completa com API externa para persistência de curtidas, sincronização de dados cadastrais e listagem/deleção de cartões no servidor remoto.
- **Metodologia BEM:** Arquitetura CSS estrita e escalável integrada à marcação JSX para componentização independente de blocos, elementos e modificadores.
- **Validação de Formulários (UX Avançada):** Bloqueio reativo de botões de submissão e injeção dinâmica de classes visuais de erro com strings nativas do HTML5 em tempo real.

---

## ✨ Funcionalidades Principais Implementadas

1. **Gestão do Perfil do Utilizador:** Alteração dinâmica de Nome, Sobre Mim e foto de Avatar diretamente no servidor. Os formulários carregam automaticamente as informações vigentes do utilizador ao serem abertos.
2. **Grade de Cartões Dinâmica:** Renderização, criação e inserção em tempo real de novos locais na grade de cartões recebidos da API.
3. **Sistema de Curtidas:** Feedback visual reativo instantâneo para adicionar ou remover likes de forma síncrona com o banco de dados.
4. **Remoção de Cartões com Confirmação:** Recurso seguro para excluir cartões do usuário através de um popup de confirmação dedicado (`RemoveCard`).
5. **Popups Inteligentes Avançados:**
   - Fechamento global e acessível através do clique na área escura de fundo (overlay).
   - Fechamento instantâneo de qualquer modal ativo (incluindo visualização expandida de fotos) ao pressionar a tecla `Escape (ESC)` do teclado.
6. **Feedbacks Visuais e Estados de Carregamento (UX):**
   - Inputs com aplicação de bordas e textos de erro em vermelho instantâneos para campos inválidos ou vazios.
   - Modificação textual dinâmica nos botões de submissão para `"Salvando..."` ou `"Deletando..."` durante o curso de requisições assíncronas assinalando o estado ativo à API.

---

## 📁 Estrutura de Diretórios do Projeto

A arquitetura de arquivos segue rigorosamente os padrões de componentização modular estabelecidos nas diretrizes do projeto:

```text
web_project_around_react/
├── src/
│   ├── components/
│   │   ├── Card/             # Componente individual de cada imagem/cartão
│   │   ├── EditAvatar/       # Formulário para atualização da foto de perfil
│   │   ├── EditProfile/      # Formulário para edição de dados pessoais
│   │   ├── Footer/           # Rodapé estático da aplicação
│   │   ├── Header/           # Cabeçalho com o logotipo da aplicação
│   │   ├── ImagePopup/       # Visualização expandida e responsiva de imagens
│   │   ├── Main/             # Conteúdo principal da página (Perfil e Grade)
│   │   ├── NewCard/          # Formulário de inclusão de novos locais
│   │   ├── Popup/            # Componente base estrutural global para modais
│   │   ├── RemoveCard/       # Popup de confirmação para exclusão de cards
│   │   └── App.jsx           # Componente raiz com lógica de estados, efeitos e API
│   ├── contexts/
│   │   └── currentUserContext.js # Provedor e exportação do contexto global do usuário
│   ├── images/               # Ativos estáticos, vetores e ícones da aplicação
│   ├── utils/                # Configurações de cabeçalhos e métodos da classe Api
│   ├── vendor/               # Arquivos e fontes de terceiros gerenciados
│   ├── index.css             # Folha de estilo e estilos globais unificados
│   └── main.jsx              # Ponto de entrada e renderização do React no DOM
├── .gitignore                # Arquivo de restrições para ocultar node_modules e builds
├── eslint.config.js          # Configurações de padronização e linting de código
├── index.html                # Estrutura HTML base do Vite
├── package-lock.json         # Árvore de dependências trancada do npm
├── package.json              # Scripts do projeto e metadados de dependências
├── README.md                 # Documentação oficial do projeto
└── vite.config.js            # Arquivo de configuração e base do bundler Vite
```
