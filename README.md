# ByteBank 🏦

Este projeto é o resultado do Tech Challenge da Fase 01 da pós-graduação em Front-End Engineer. Ele consiste no desenvolvimento do **frontend de uma aplicação de gerenciamento financeiro** utilizando **Next.js** e **Design System**, com aplicação dos conceitos de **Programação Orientada a Objetos (POO)**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/8ad10374-7bb4-4b18-b20d-5a0f5b2a874b" alt="image1" width="610"/>
  <img src="https://github.com/user-attachments/assets/8058223f-6ceb-4244-bfd6-a262e143ae4b" alt="image2" width="600"/>


</p>


## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15.3.2** - Framework React para aplicações web
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Tailwind CSS 4.1.6** - Framework CSS utilitário para estilização

### Gerenciamento de Estado e Formulários
- **React Hook Form 7.56.4** - Biblioteca para gerenciamento de formulários
- **Zod 3.25.8** - Validação de esquemas TypeScript-first
- **React Context API** - Gerenciamento de estado global da aplicação

### UI/UX
- **Phosphor React 1.4.1** - Biblioteca de ícones
- **React Toastify 11.0.5** - Notificações toast
- **Design System customizado** - Baseado no Figma oficial

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para qualidade de código
- **PostCSS** - Processador CSS
- **Autoprefixer** - Prefixos CSS automáticos

## ✨ Funcionalidades

### 💰 Gerenciamento de Saldo
- Visualização do saldo atual da conta
- Opção de ocultar/exibir saldo por segurança
- Atualização automática do saldo conforme transações

### ➕ Nova Transação
- Formulário para adicionar transações
- Tipos suportados: Depósito, Transferência, Pagamento de Boleto
- Validação de valores e tipos de transação
- Feedback visual com notificações

### ✏️ Edição de Transação
- Modal para editar transações existentes
- Recálculo automático do saldo
- Validação de dados editados

### 🗑️ Exclusão de Transação
- Modal de confirmação para exclusão
- Recálculo automático do saldo após exclusão
- Prevenção de exclusões acidentais

### 📊 Extrato Detalhado
- Histórico completo de transações
- Agrupamento por mês/ano
- Ordenação cronológica (mais recentes primeiro)
- Formatação de valores em moeda brasileira (BRL)

### 💾 Persistência de Dados
- Armazenamento local no localStorage
- Dados persistem entre sessões
- Tratamento de erros de parsing

## 🎨 Design System

O design system foi criado com base no [layout Figma oficial do projeto](https://www.figma.com/design/ns5TC3X5Xr8V7I3LYKg9KA/Projeto-Financeiro?node-id=503-4264), garantindo consistência visual e reutilização de componentes:

### Componentes Reutilizáveis
- **Botões** - Múltiplas variantes (primary, secondary, outline, icon, danger)
- **Inputs** - Campos de entrada com validação
- **Select** - Seleção de opções
- **Labels** - Rótulos padronizados
- **Modal** - Janelas modais reutilizáveis
- **Links** - Links estilizados

### Tokens de Design
- **Cores** - Paleta consistente com variáveis CSS customizadas
- **Tipografia** - Tamanhos e pesos padronizados
- **Espaçamentos** - Sistema de grid responsivo
- **Breakpoints** - Design responsivo para mobile e desktop

## 🏗️ Arquitetura e Conceitos POO

### Decorators
- [`@ValidaDebito`](src/decorators/validaDebito.ts) - Validação de operações de débito
- [`@ValidaDeposito`](src/decorators/validaDeposito.ts) - Validação de operações de depósito

### Classes e Modelos
- [`Conta`](src/controllers/Conta.ts) - Classe principal para gerenciamento da conta
- [`Armazenador`](src/controllers/Armazenador.ts) - Classe para persistência de dados

### Padrões Utilizados
- **Singleton** - Instância única da conta
- **Context Pattern** - Compartilhamento de estado global
- **Observer Pattern** - Reatividade na atualização de dados

## 🧱 Organização do Código

```
src/
├── app/                    # Páginas da aplicação (Next.js App Router)
│   ├── services/          # Páginas dos serviços bancários
│   ├── home/              # Página inicial
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base do design system
│   ├── banking/          # Componentes específicos do domínio bancário
│   └── layout/           # Componentes de layout
├── config/               # Configurações e dados mock
├── contexts/             # Contextos React
├── controllers/          # Classes e lógica de negócio
├── decorators/           # Decorators para validação
└── utils/                # Utilitários e helpers
styles/                   # Estilos globais e tokens do design system
```

## 🔧 Configuração do Ambiente

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Variáveis de Ambiente
O projeto utiliza configuração local, sem necessidade de variáveis de ambiente específicas.

## 🛠️ Como Rodar Localmente

1. **Clone o repositório:**
```bash
git clone https://github.com/LeticiaRosa/ByteBank.git
cd ByteBank
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o projeto em modo desenvolvimento:**
```bash
npm run dev
```

4. **Acesse no navegador:** 
   - http://localhost:3000

### Scripts Disponíveis
```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa verificação de código
```

## 📱 Responsividade

A aplicação foi desenvolvida com abordagem **mobile-first** e é totalmente responsiva:

- **Mobile** (até 480px)
- **Tablet** (481px - 768px) 
- **Desktop** (769px+)

## 🧪 Qualidade de Código

- **TypeScript** para tipagem estática
- **ESLint** com configuração Next.js
- **Zod** para validação runtime
- **React Hook Form** com validação integrada

## 📄 Licença

Este projeto foi desenvolvido como parte do Tech Challenge da FIAP e é destinado para fins educacionais.

## 👨‍💻 Autoria

Desenvolvido por [Letícia Rosa](https://github.com/LeticiaRosa)

**Curso:** Pós-Tech - Front-End Engineer | FIAP  
**Fase:** 01 - Tech Challenge

---

### 📞 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato através do GitHub.
