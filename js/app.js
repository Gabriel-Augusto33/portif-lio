/**
 * Script Principal da Interface e Painel Administrativo Oculto
 * Gabriel Augusto - Portfólio Frontend
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Manipulação do Formulário de Contato com Automação
    const contactForm = document.getElementById("formContato");
    const feedbackMensagem = document.getElementById("feedbackEnvio");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("contatoNome").value.trim();
            const email = document.getElementById("contatoEmail").value.trim();
            const assunto = document.getElementById("contatoAssunto").value.trim();
            const mensagem = document.getElementById("contatoMensagem").value.trim();

            if (!nome || !email || !assunto || !mensagem) {
                mostrarAlerta("Preencha todos os campos obrigatórios.", "danger");
                return;
            }

            // Salva localmente via LocalStorage API
            adicionarMensagem(nome, email, assunto, mensagem);

            // Simulação / Disparo de Automação de E-mail (Formspree endpoint simulado com feedback real)
            const botaoEnvio = contactForm.querySelector("button[type='submit']");
            const textoOriginal = botaoEnvio.innerHTML;
            botaoEnvio.disabled = true;
            botaoEnvio.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando notificação...';

            setTimeout(() => {
                botaoEnvio.disabled = false;
                botaoEnvio.innerHTML = textoOriginal;
                contactForm.reset();
                mostrarAlerta("Mensagem enviada com sucesso! Uma notificação foi disparada e os dados foram salvos no LocalStorage.", "success");
                renderizarTabelaMensagens();
            }, 800);
        });
    }

    function mostrarAlerta(texto, tipo) {
        if (!feedbackMensagem) return;
        feedbackMensagem.className = `alert alert-${tipo} mt-3 d-block`;
        feedbackMensagem.textContent = texto;
        setTimeout(() => {
            feedbackMensagem.className = "d-none";
        }, 5000);
    }

    // 2. Atalho de Teclado para Abrir Painel Oculto (Ctrl + Shift + A)
    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
            e.preventDefault();
            abrirPainelOculto();
        }
    });

    const btnLockAdmin = document.getElementById("btnAcessoAdmin");
    if (btnLockAdmin) {
        btnLockAdmin.addEventListener("click", (e) => {
            e.preventDefault();
            abrirPainelOculto();
        });
    }

    function abrirPainelOculto() {
        const modalEl = document.getElementById("modalAdmin");
        if (modalEl) {
            renderizarTabelaMensagens();
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        }
    }

    // 3. Renderização da Tabela do CRUD no Painel Oculto
    const corpoTabela = document.getElementById("tabelaMensagensCorpo");
    const contadorTotal = document.getElementById("totalMensagensBadge");
    const inputFiltro = document.getElementById("filtroAdminBusca");

    window.renderizarTabelaMensagens = function() {
        if (!corpoTabela) return;

        const termo = inputFiltro ? inputFiltro.value.toLowerCase().trim() : "";
        let mensagens = obterMensagens();

        if (termo) {
            mensagens = mensagens.filter(m => 
                m.nome.toLowerCase().includes(termo) || 
                m.email.toLowerCase().includes(termo) || 
                m.assunto.toLowerCase().includes(termo)
            );
        }

        if (contadorTotal) {
            contadorTotal.textContent = `${mensagens.length} mensagens`;
        }

        if (mensagens.length === 0) {
            corpoTabela.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">Nenhum registro encontrado no LocalStorage.</td></tr>`;
            return;
        }

        corpoTabela.innerHTML = mensagens.map(m => `
            <tr class="${m.lida ? '' : 'table-active fw-semibold'}">
                <td>#${m.id}</td>
                <td>
                    <div>${escapeHtml(m.nome)}</div>
                    <small class="text-muted">${escapeHtml(m.email)}</small>
                </td>
                <td>${escapeHtml(m.assunto)}</td>
                <td><small class="text-secondary">${m.data}</small></td>
                <td>
                    <span class="badge ${m.lida ? 'bg-secondary' : 'bg-primary'}">
                        ${m.lida ? 'Lida' : 'Nova'}
                    </span>
                </td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-info me-1" onclick="verDetalhesMensagem(${m.id})" title="Ver Mensagem">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm ${m.lida ? 'btn-outline-secondary' : 'btn-outline-success'} me-1" onclick="alternarStatus(${m.id})" title="Marcar como ${m.lida ? 'não lida' : 'lida'}">
                        <i class="bi ${m.lida ? 'bi-envelope' : 'bi-envelope-open'}"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="removerItem(${m.id})" title="Excluir">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join("");
    };

    if (inputFiltro) {
        inputFiltro.addEventListener("input", renderizarTabelaMensagens);
    }

    // Ações do CRUD
    window.alternarStatus = function(id) {
        alternarStatusLeitura(id);
        renderizarTabelaMensagens();
    };

    window.removerItem = function(id) {
        if (confirm("Deseja realmente excluir esta mensagem do LocalStorage?")) {
            excluirMensagem(id);
            renderizarTabelaMensagens();
        }
    };

    window.verDetalhesMensagem = function(id) {
        const msgs = obterMensagens();
        const msg = msgs.find(m => m.id === id);
        if (msg) {
            alert(`DE: ${msg.nome} (${msg.email})\nASSUNTO: ${msg.assunto}\nDATA: ${msg.data}\n\nMENSAGEM:\n${msg.mensagem}`);
            if (!msg.lida) {
                alternarStatusLeitura(id);
                renderizarTabelaMensagens();
            }
        }
    };

    // Botão para restaurar os 20 mocks
    const btnRestaurar = document.getElementById("btnRestaurarMocks");
    if (btnRestaurar) {
        btnRestaurar.addEventListener("click", () => {
            if (confirm("Deseja recarregar a base com as 20 mensagens padrão de teste?")) {
                restaurarMocksIniciais();
                renderizarTabelaMensagens();
                alert("20 mensagens de teste restauradas com sucesso!");
            }
        });
    }

    // Exportar JSON
    const btnExportar = document.getElementById("btnExportarJSON");
    if (btnExportar) {
        btnExportar.addEventListener("click", () => {
            const dados = localStorage.getItem(STORAGE_KEY) || "[]";
            const blob = new Blob([dados], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `mensagens_localstorage_${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
});
