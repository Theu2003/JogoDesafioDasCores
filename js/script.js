const cores = ['amarelo', 'vermelho', 'verde', 'azul', 'roxo', 'laranja', 'ciano', 'cinza', 'rosa'];
const coresHex = {
  amarelo: '#f1c40f',
  vermelho: '#e74c3c',
  verde: '#2ecc71',
  azul: '#3498db',
  roxo: '#9b59b6',
  laranja: '#e67e22',
  ciano: '#1abc9c',
  cinza: '#34495e',
  rosa: '#ff69b4'
};

let score = 0;
let tempo = 30;
let intervalo;
let corAlvo = '';
let nomeJogador = '';

const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const targetColorDisplay = document.getElementById('targetColor');
const grid = document.getElementById('grid');
const status = document.getElementById('status');

const inicio = document.getElementById('inicio');
const game = document.getElementById('game');
const fim = document.getElementById('fim');

const playerNameDisplay = document.getElementById('playerName');
const finalScoreDisplay = document.getElementById('finalScore');

document.getElementById('btnStart').addEventListener('click', () => {
  const nomeInput = document.getElementById('nome').value.trim();
  if (!nomeInput) return alert('Digite seu nome!');
  nomeJogador = nomeInput;
  iniciarJogo();
});

document.getElementById('btnRestart').addEventListener('click', () => {
  score = 0;
  tempo = 30;
  inicio.classList.remove('hidden');
  fim.classList.add('hidden');
  document.getElementById('nome').value = '';
});

function iniciarJogo() {
  inicio.classList.add('hidden');
  game.classList.remove('hidden');
  atualizarPontuacao();
  atualizarTempo();
  escolherNovaCor();
  gerarGrade();
  intervalo = setInterval(() => {
    tempo--;
    atualizarTempo();
    if (tempo <= 0) finalizarJogo();
  }, 1000);
}

function atualizarPontuacao() {
  scoreDisplay.textContent = score;
}

function atualizarTempo() {
  timeDisplay.textContent = tempo;
}

function escolherNovaCor() {
  corAlvo = cores[Math.floor(Math.random() * cores.length)];
  targetColorDisplay.textContent = corAlvo;
  const targetColorBox = document.getElementById('targetColorBox');
  if (targetColorBox) {
    targetColorBox.style.backgroundColor = coresHex[corAlvo];
  }
}

function gerarGrade() {
  grid.innerHTML = '';
  // Embaralhar as cores para garantir 1 de cada
  const coresEmbaralhadas = [...cores].sort(() => Math.random() - 0.5).slice(0, 9);
  for (let i = 0; i < 9; i++) {
    const cor = coresEmbaralhadas[i];
    const botao = document.createElement('button');
    botao.className = 'color-button';
    botao.style.backgroundColor = coresHex[cor];
    botao.onclick = () => tratarClique(cor);
    grid.appendChild(botao);
  }
}

function tratarClique(cor) {
  if (tempo <= 0) return;
  if (cor === corAlvo) {
    score += 10;
    status.textContent = 'Acertou!';
    status.style.color = 'green';
  } else {
    score -= 5;
    status.textContent = 'Errou!';
    status.style.color = 'red';
  }
  atualizarPontuacao();
  escolherNovaCor();
  gerarGrade();
}

function finalizarJogo() {
  clearInterval(intervalo);
  game.classList.add('hidden');
  fim.classList.remove('hidden');
  playerNameDisplay.textContent = nomeJogador;
  finalScoreDisplay.textContent = score;
  status.textContent = '';
}
