```
my-app/
├── public/                # Arquivos estáticos públicos
├── src/
│   ├── api/               # Chamadas de API e funções relacionadas a dados
│   │   ├── api.js
│   │   └── ...
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.css
│   │   │   └── Button.test.jsx
│   │   └── ...
│   ├── features/          # Funcionalidades agrupadas
│   │   ├── Auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── authSlice.js
│   │   └── ...
│   ├── hooks/             # Hooks customizados
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   ├── layouts/           # Estruturas de layout principais
│   │   ├── MainLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── pages/             # Páginas organizadas por rotas
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   └── About.css
│   │   └── ...
│   ├── routes/            # Configuração de rotas
│   │   ├── index.jsx
│   │   └── privateRoutes.jsx
│   ├── store/             # Gerenciamento de estado (Redux, Zustand, etc.)
│   │   ├── index.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       └── ...
│   ├── styles/            # Estilos globais e temas
│   │   ├── variables.css
│   │   ├── global.css
│   │   └── ...
│   ├── utils/             # Funções utilitárias (formatadores, validações, etc.)
│   │   ├── formatDate.js
│   │   ├── validateInput.js
│   │   └── ...
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Ponto de entrada principal
│   └── index.css          # Estilos globais
├── .env                   # Variáveis de ambiente
├── package.json           # Dependências e scripts
├── vite.config.js         # Configuração do Vite
└── README.md              # Documentação
```
