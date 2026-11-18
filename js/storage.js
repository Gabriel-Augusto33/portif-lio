/**
 * Gerenciamento de Armazenamento Local (Client-Side Storage)
 * Projeto Canes Solution - Atividade Final 4º Bimestre
 */

const STORAGE_KEY = 'canes_portfolio_mensagens';

// 20 Registros de teste para injeção automática no primeiro acesso
const MOCK_MENSAGENS = [
    { id: 1, nome: "Carlos Eduardo Silva", email: "carlos.silva@techcorp.com.br", assunto: "Oportunidade Desenvolvedor Júnior", mensagem: "Olá Gabriel, gostamos do seu portfólio e gostaríamos de agendar uma entrevista técnica.", data: "2026-11-01 10:15", lida: true },
    { id: 2, nome: "Mariana Souza Santos", email: "mariana.rh@inovatech.io", assunto: "Parceria em Projeto Open Source", mensagem: "Achei incrível a sua integração com Bootstrap. Vamos conversar sobre uma colaboração?", data: "2026-11-02 14:30", lida: true },
    { id: 3, nome: "Lucas Mendes de Lima", email: "lucas.mendes@empresa.com", assunto: "Proposta de Freelance - Landing Page", mensagem: "Preciso de uma página institucional responsiva com formulário integrado. Qual sua disponibilidade?", data: "2026-11-03 09:00", lida: false },
    { id: 4, nome: "Beatriz Oliveira", email: "beatriz.dev@startup.com", assunto: "Feedback sobre o projeto E-commerce", mensagem: "Parabéns pela arquitetura limpa do E-commerce em PHP!", data: "2026-11-04 11:45", lida: true },
    { id: 5, nome: "Fernando Henrique Cardoso", email: "f.cardoso@consultoria.com.br", assunto: "Dúvida sobre Edge Computing", mensagem: "Muito bom o seu resumo sobre computação em borda. Tem materiais extras para recomendar?", data: "2026-11-05 16:20", lida: false },
    { id: 6, nome: "Juliana Ribeiro Prado", email: "juliana.tech@recrutamento.com", assunto: "Vaga Frontend Canes Solution", mensagem: "Recebemos sua submissão para a vaga da Canes Solution. Código muito bem documentado.", data: "2026-11-06 08:35", lida: true },
    { id: 7, nome: "Rodrigo Antunes", email: "rodrigo.antunes@globo.com", assunto: "Contato Profissional", mensagem: "Gostaria de trocar ideias sobre práticas modernas de UI/UX.", data: "2026-11-07 13:10", lida: false },
    { id: 8, nome: "Aline Cristina Pereira", email: "aline.pereira@gmail.com", assunto: "Orçamento de Sistema Web", mensagem: "Você desenvolve sistemas com controle de estoque para pequenas lojas?", data: "2026-11-08 17:50", lida: true },
    { id: 9, nome: "Marcelo Tavares", email: "marcelo.tavares@banco.com.br", assunto: "Segurança da Informação", mensagem: "Excelente visão sobre Cibersegurança e Prepared Statements.", data: "2026-11-09 10:05", lida: false },
    { id: 10, nome: "Camila Guimarães", email: "camila.g@designstudio.art", assunto: "Convite para Palestra Técnica", mensagem: "Gostaríamos de convidá-lo para falar sobre a transição do ensino médio para a programação.", data: "2026-11-10 15:40", lida: true },
    { id: 11, nome: "Thiago Rocha Martins", email: "thiago.rocha@cloudservices.com", assunto: "Dúvida sobre LocalStorage", mensagem: "Como você tratou a persistência de 20 itens no primeiro carregamento?", data: "2026-11-11 11:25", lida: false },
    { id: 12, nome: "Vanessa Duarte", email: "vanessa.rh@digitaltalent.com", assunto: "Banco de Talentos 2026", mensagem: "Seu perfil foi adicionado ao nosso banco de talentos prioritário.", data: "2026-11-12 14:15", lida: true },
    { id: 13, nome: "Guilherme Albuquerque", email: "guilherme.alb@startupbr.io", assunto: "Convite para Hackathon", mensagem: "Formaremos um time de desenvolvimento frontend e gostaríamos de você na equipe.", data: "2026-11-13 18:00", lida: false },
    { id: 14, nome: "Patrícia Fagundes", email: "patricia.f@escola.edu.br", assunto: "Parabéns pelo Desempenho", mensagem: "A coordenação parabeniza você pela entrega impecável das atividades do 4º bimestre.", data: "2026-11-14 09:30", lida: true },
    { id: 15, nome: "Renato Silveira", email: "renato.silveira@gamestudio.com", assunto: "Design de Interfaces para Jogos", mensagem: "Gostei do contraste e da hierarquia visual adotada.", data: "2026-11-15 16:00", lida: false },
    { id: 16, nome: "Tatiane Barbosa", email: "tatiane.barbosa@consultoria.net", assunto: "Automação e Robótica", mensagem: "Ótimo ponto de vista sobre automação de processos industriais.", data: "2026-11-16 10:45", lida: false },
    { id: 17, nome: "Diego Nogueira", email: "diego.nogueira@techhub.org", assunto: "Interesse em Mentoria", mensagem: "Temos um programa de aceleração para jovens desenvolvedores.", data: "2026-11-17 12:20", lida: true },
    { id: 18, nome: "Letícia Vasconcelos", email: "leticia.v@agency.com.br", assunto: "Proposta Comercial", mensagem: "Buscamos um desenvolvedor para contratos sob demanda.", data: "2026-11-17 19:10", lida: false },
    { id: 19, nome: "Marcos Vinícius Costa", email: "marcos.costa@provedor.com", assunto: "Estruturação de Redes e Edge", mensagem: "Concordo totalmente com o resumo de Edge Computing.", data: "2026-11-18 08:00", lida: true },
    { id: 20, nome: "Sabrina Sato Ramos", email: "sabrina.ramos@canessolution.com", assunto: "Avaliação do Processo Seletivo", mensagem: "Prezado Gabriel, sua submissão está sendo auditada pelo corpo técnico da Canes Solution.", data: "2026-11-18 11:30", lida: false }
];

// Inicialização: Se estiver vazio, injeta os 20 registros obrigatórios
function inicializarStorage() {
    const dados = localStorage.getItem(STORAGE_KEY);
    if (!dados || JSON.parse(dados).length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_MENSAGENS));
        console.log("Injeção automática: 20 mensagens de teste carregadas no LocalStorage!");
    }
}

// Obter todas as mensagens
function obterMensagens() {
    inicializarStorage();
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
        return [];
    }
}

// Salvar todas as mensagens
function salvarMensagens(mensagens) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mensagens));
}

// Criar nova mensagem (Create)
function adicionarMensagem(nome, email, assunto, mensagem) {
    const mensagens = obterMensagens();
    const novoId = mensagens.length > 0 ? Math.max(...mensagens.map(m => m.id)) + 1 : 1;
    const agora = new Date();
    const dataFormatada = agora.toISOString().slice(0, 10) + " " + agora.toTimeString().slice(0, 5);

    const novoRegistro = {
        id: novoId,
        nome: nome,
        email: email,
        assunto: assunto,
        mensagem: mensagem,
        data: dataFormatada,
        lida: false
    };

    mensagens.unshift(novoRegistro);
    salvarMensagens(mensagens);
    return novoRegistro;
}

// Atualizar status de leitura (Update)
function alternarStatusLeitura(id) {
    const mensagens = obterMensagens();
    const msg = mensagens.find(m => m.id === id);
    if (msg) {
        msg.lida = !msg.lida;
        salvarMensagens(mensagens);
        return true;
    }
    return false;
}

// Excluir mensagem (Delete)
function excluirMensagem(id) {
    let mensagens = obterMensagens();
    mensagens = mensagens.filter(m => m.id !== id);
    salvarMensagens(mensagens);
}

// Restaurar para os 20 dados iniciais
function restaurarMocksIniciais() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_MENSAGENS));
}

// Executa verificação na carga do arquivo
inicializarStorage();
