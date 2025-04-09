const axios = require("axios");

const BASE_URL = "http://localhost:3000";
const endpoints = ["/", "/excecao", "/demorado"];
const TOTAL_POR_ENDPOINT = 2000;

// Função que mede o tempo de uma requisição
async function testarEndpoint(endpoint, index) {
    const url = `${BASE_URL}${endpoint}`;
    const inicio = Date.now();
    try {
        const resposta = await axios.get(url);
        const duracao = Date.now() - inicio;
        console.log(`✅ [${endpoint} #${index}] - ${resposta.status} (${duracao}ms)`);
    } catch (erro) {
        const duracao = Date.now() - inicio;
        const status = erro.response?.status || "SEM RESPOSTA";
        console.log(`❌ [${endpoint} #${index}] - ERRO ${status} (${duracao}ms) - ${erro.message}`);
    }
}

// Dispara 10 requisições para cada rota em paralelo
async function testarTodos() {
    const todasRequisicoes = [];

    endpoints.forEach(endpoint => {
        for (let i = 1; i <= TOTAL_POR_ENDPOINT; i++) {
            todasRequisicoes.push(testarEndpoint(endpoint, i));
        }
    });

    await Promise.allSettled(todasRequisicoes);
    console.log("✅ Todos os testes concluídos.");
}

testarTodos();
