document.addEventListener('DOMContentLoaded', () => {
    // Variáveis globais para rastrear o estado do quiz
    let etapaAtual = 1;
    let escolhaPrincipal = null;
    let escolhaRestaurante = null;

    // Elementos principais
    const etapas = document.querySelectorAll('.etapa');
    const erro1 = document.getElementById('erro1');
    const erro2 = document.getElementById('erro2');
    const etapa3Div = document.getElementById('etapa3');
    const opcoesEtapa3 = document.getElementById('opcoes-etapa3');
    const mensagemFinal = document.getElementById('mensagemFinal');

    // Funções de controle de fluxo
    const mostrarEtapa = (numero) => {
        etapas.forEach(etapa => etapa.classList.remove('ativa'));
        document.getElementById(`etapa${numero}`).classList.add('ativa');
        etapaAtual = numero;
    };

    const iniciarEtapa3 = () => {
        document.getElementById('titulo-etapa3').textContent = 'Hora da Educação Positiva!';
        document.getElementById('pergunta-etapa3').textContent = 'Você prefere ir encontrar seus filhos fora da ilha ou prefere esperar eles voltarem para ilha e encontrá-los após o trabalho?';
        opcoesEtapa3.innerHTML = ''; // Limpa opções anteriores
        
        const escolhas = [
            { texto: "Ir encontrar seus filhos fora da ilha", valor: "fora" },
            { texto: "Esperar eles voltarem para ilha e encontrá-los após o trabalho", valor: "ilha" }
        ];

        escolhas.forEach(escolha => {
            const btn = document.createElement('button');
            btn.className = 'opcao-btn';
            btn.textContent = escolha.texto;
            btn.onclick = () => {
                escolhaPrincipal = escolha.valor;
                mostrarEtapa2Escolha(); // Vai para a etapa de escolha do restaurante
            };
            opcoesEtapa3.appendChild(btn);
        });
        mostrarEtapa(3);
    };

    const mostrarEtapa2Escolha = () => {
        document.getElementById('titulo-etapa3').textContent = 'Escolha do Local';
        opcoesEtapa3.innerHTML = ''; // Limpa opções anteriores
        
        let pergunta;
        let opcoes;
        
        if (escolhaPrincipal === 'fora') {
            pergunta = 'Qual destino gastronômico fora da ilha você prefere?';
            opcoes = ["Temakeria", "Japa da Quitanda", "Mamma Jamma", "OGGI", "Babbo"];
        } else if (escolhaPrincipal === 'ilha') {
            pergunta = 'Qual destino gastronômico na ilha você prefere?';
            opcoes = ["Lagostine Pizza", "Lagostine Japa", "Leirinha"];
        } else {
            // Se, por algum motivo, a escolha principal for nula, retorna
            iniciarEtapa3();
            return;
        }

        document.getElementById('pergunta-etapa3').textContent = pergunta;

        opcoes.forEach(opcao => {
            const btn = document.createElement('button');
            btn.className = 'opcao-btn';
            btn.textContent = opcao;
            btn.onclick = () => {
                // Remove a classe 'selecionada' de todos os botões
                document.querySelectorAll('.opcao-btn').forEach(b => b.classList.remove('selecionada'));
                // Adiciona a classe 'selecionada' no botão clicado
                btn.classList.add('selecionada'); 
                escolhaRestaurante = opcao; // <<-- ESSA LINHA ARMAZENA O RESTAURANTE
                mostrarEtapa(4); // Vai para a confirmação de certeza
            };
            opcoesEtapa3.appendChild(btn);
        });

        mostrarEtapa(3);
    };

    // --- Lógica da Etapa 1 ---
    document.getElementById('btnSim').addEventListener('click', () => {
        erro1.textContent = '';
        mostrarEtapa(2);
    });

    document.getElementById('btnNao').addEventListener('click', () => {
        erro1.textContent = "ERRO: Identidade não confirmada! A tradutora Juramentada é VOCÊ. Clique em SIM para prosseguir.";
    });

    // --- Lógica da Etapa 2 ---
    document.getElementById('formFilhos').addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = document.querySelectorAll('.input-filho');
        let todosPreenchidos = true;

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                todosPreenchidos = false;
            }
        });

        if (todosPreenchidos) {
            erro2.textContent = '';
            iniciarEtapa3(); // Inicia a etapa de escolha de restaurante
        } else {
            erro2.textContent = "Por favor, preencha o nome de todos os 5 filhos para prosseguir.";
        }
    });

    // --- Lógica da Etapa 4 (Confirmação de Certeza) ---
    document.getElementById('btnVoltar').addEventListener('click', () => {
        // Volta para a pergunta de "Educação Positiva"
        iniciarEtapa3();
    });

    document.getElementById('btnTenhoCerteza').addEventListener('click', () => {
        // Vai para a tela final
        mensagemFinal.innerHTML = `
            <span style="font-size: 1.5em; color: #dc3545; font-weight: bold;">Bela escolha, mamãe!</span><br><br>
            <span style="font-size: 1.8em; color: #007bff; font-weight: bold;">FELIZ DIA DOS TRADUTORES!!</span><br>
            Se arrume e fique mais bela ainda! 🎉<br><br>
            Te esperamos **20h** no local escolhido:<br>
            <span style="font-size: 2em; color: #ffc107; font-weight: bold;">${escolhaRestaurante}</span>!
        `;
        mostrarEtapa(5); // Etapa Final
    });

    // Inicia o site na primeira etapa
    mostrarEtapa(1);
});
