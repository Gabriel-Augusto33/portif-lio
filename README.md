# Portfólio Web Dinâmico - Gabriel Augusto

Projeto desenvolvido para o processo seletivo Frontend da **Canes Solution** como Atividade Final do 4º Bimestre (Ensino Médio Técnico).

## 📌 Visão Geral
Aplicação web moderna, responsiva (Mobile First) e desenvolvida do zero sem o uso de construtores de sites. Apresenta trajetória acadêmica, projetos desenvolvidos, sínteses técnicas de tendências e áreas do conhecimento, além de um sistema autônomo de gerenciamento de contatos no lado do cliente (Client-Side).

## 🛠️ Tecnologias Utilizadas
- **HTML5 & CSS3** estruturados semanticamente.
- **Bootstrap 5.3** (layout responsivo com grid e componentes utilitários).
- **Bootstrap Icons** (ícones de interface).
- **JavaScript (ES6+)** nativo para lógica e manipulação do DOM.
- **LocalStorage API:** armazenamento das mensagens no formato JSON sem necessidade de banco relacional.
- **Formspree / Mail Automation:** automação e notificação de novos envios de formulário.

## 🚀 Como Executar Localmente
Não é necessária a instalação de servidores complexos como Apache ou Node.js:
1. Clone este repositório ou baixe o arquivo compactado:
   ```bash
   git clone https://github.com/Gabriel-Augusto33/portif-lio.git
   ```
2. Abra o arquivo `index.html` diretamente em qualquer navegador moderno (Google Chrome, Edge, Firefox).

---

## 🔐 Painel Administrativo Oculto (Etapa 02 - Armazenamento)

O sistema conta com um painel de gerenciamento exclusivo para o avaliador inspecionar as mensagens recebidas:

### Como Acessar o Painel Oculto:
1. No rodapé da página (Footer), há um ícone discreto de cadeado chamado **"Acesso Administrativo"**.
2. **Atalho via Teclado:** Pressione as teclas `Ctrl + Shift + A` a qualquer momento para abrir o modal administrativo diretamente.
3. Se for solicitado código de acesso, informe: `admin123`.

### Recursos do Painel:
- **Carga Automática de Teste (Mock):** Caso o LocalStorage do seu navegador esteja vazio no primeiro acesso, o script injeta automaticamente **20 mensagens de teste** detalhadas, com nomes, e-mails, assuntos, datas e status para permitir avaliação imediata.
- **Operações CRUD:**
  - **Criar (Create):** Envio pelo formulário principal ou novo registro manual.
  - **Ler (Read):** Tabela com busca, paginação simples e filtro por status (Não lida / Lida).
  - **Atualizar (Update):** Marcar como lida/não lida ou editar o registro.
  - **Deletar (Delete):** Exclusão individual de mensagens ou reset completo da base.
- **Exportação JSON:** Botão para baixar todos os registros em arquivo `.json`.

---

## 📬 Automação e Notificação de Formulário (Etapa 2.2)
Para a notificação real por e-mail, foi escolhida a integração com o serviço **Formspree** (ou EmailJS):
- **Justificativa técnica:** Solução segura e homologada para aplicações estáticas e JAMstack, pois encaminha os dados submetidos pelo formulário diretamente para a caixa de entrada sem expor credenciais SMTP no cliente.
- Caso o usuário esteja offline ou o envio externo falhe, a aplicação prioriza a persistência local no LocalStorage, garantindo tolerância a falhas.

## 👤 Autor
- **Aluno:** Gabriel Augusto
- **Curso:** Técnico em Informática (Ensino Médio Integrado)
