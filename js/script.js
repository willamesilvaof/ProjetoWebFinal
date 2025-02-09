const container = document.querySelector(".container");
const botaoReiniciar = document.querySelector("#reiniciar");
let cartas;
let primeiraCarta = null;
let segundaCarta = null;

// Lista de imagens e nomes
const itens = [
    { nome: "andrew", imgs: "imgs/andrew.jpg" },
    { nome: "arthur", imgs: "imgs/arthur.jpg" },
    { nome: "emilly", imgs: "imgs/emy.jpg" },
    { nome: "gabriel", imgs: "imgs/gab.jpg" },
    { nome: "julia", imgs: "imgs/julia.jpg" },
    { nome: "willame", imgs: "imgs/will.jpg" },
    { nome: "pedro", imgs: "imgs/pl.jpg" },
    { nome: "rayane", imgs: "imgs/ray.jpg" },
];

// Função para reiniciar o jogo
botaoReiniciar.addEventListener("click", reiniciarJogo);

function reiniciarJogo() {
    primeiraCarta = null;
    segundaCarta = null;
    cartas = document.querySelectorAll(".carta-virada");
    cartas.forEach(carta => carta.classList.remove("carta-virada"));
    criarCartas(); // Recria as cartas no tabuleiro
}

function criarCartas() {
    let cartasDuplicadas = [...itens, ...itens]; // Duplica as cartas
    cartasDuplicadas.sort(() => Math.random() - 0.5); // Embaralha

    container.innerHTML = ""; // Limpa o tabuleiro antes de recriar

    cartasDuplicadas.forEach((pessoa) => {
        container.innerHTML += `
            <div class="carta" data-carta="${pessoa.nome}">
                <div class="atras">?</div>
                <div class="frente">
                    <img src="${pessoa.imgs}" width="150px" height="150px" /> <!-- Ajuste do tamanho da imagem -->
                </div>
            </div>`;
    });

    // Adiciona evento de clique às cartas
    viraCarta();
}

function viraCarta() {
    cartas = document.querySelectorAll(".carta");

    cartas.forEach((carta) => {
        carta.addEventListener("click", () => {
            if (carta.classList.contains("carta-virada") || segundaCarta) return;

            carta.classList.add("carta-virada");

            if (!primeiraCarta) {
                primeiraCarta = carta;
            } else {
                segundaCarta = carta;
                checarCarta();
            }
        });
    });
}

function checarCarta() {
    const primeiraPessoa = primeiraCarta.getAttribute("data-carta");
    const segundaPessoa = segundaCarta.getAttribute("data-carta");

    if (primeiraPessoa === segundaPessoa) {
        // Mantém as cartas viradas
        primeiraCarta = null;
        segundaCarta = null;
    } else {
        // Vira as cartas de volta após 0.5s
        setTimeout(() => {
            primeiraCarta.classList.remove("carta-virada");
            segundaCarta.classList.remove("carta-virada");
            primeiraCarta = null;
            segundaCarta = null;
        }, 800);
    }
}

// Inicia o jogo ao carregar a página
criarCartas();
