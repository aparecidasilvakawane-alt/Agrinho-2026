function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
} 

// Variáveis do Estado do Jogo
let tela = "inicio"; // inicio, jogar, vitoria, derrota
let moedas = 150;
let sustentabilidade = 10;

// Variáveis dos Botões de Ação
let botaoAcao1, botaoAcao2, botaoAcao3;

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  
  // Criando os botões para as escolhas ecológicas
  botaoAcao1 = createButton('Instalar Painéis Solares ($50)');
  botaoAcao1.position(60, 480);
  botaoAcao1.size(200, 50);
  botaoAcao1.mousePressed(comprarSolar);

  botaoAcao2 = createButton('Rotação de Culturas ($30)');
  botaoAcao2.position(290, 480);
  botaoAcao2.size(200, 50);
  botaoAcao2.mousePressed(comprarRotacao);

  botaoAcao3 = createButton('Adotar Drone de Precisão ($60)');
  botaoAcao3.position(520, 480);
  botaoAcao3.size(200, 50);
  botaoAcao3.mousePressed(comprarDrone);
}

function draw() {
  // Esconde os botões por padrão, eles só aparecem na tela "jogar"
  botaoAcao1.hide();
  botaoAcao2.hide();
  botaoAcao3.hide();

  if (tela === "inicio") {
    desenharInicio();
  } else if (tela === "jogar") {
    botaoAcao1.show();
    botaoAcao2.show();
    botaoAcao3.show();
    desenharJogo();
    checarFimDeJogo();
  } else if (tela === "vitoria") {
    desenharVitoria();
  } else if (tela === "derrota") {
    desenharDerrota();
  }
}

// --- FUNÇÕES DE DESENHO DAS TELAS ---

function desenharInicio() {
  background(34, 49, 63);
  
  fill(255);
  textSize(36);
  textStyle(BOLD);
  text("AgroTech: O Desafio Sustentável", width / 2, height / 2 - 60);
  
  textSize(18);
  textStyle(NORMAL);
  fill(200);
  text("Sua missão é tornar a fazenda 100% sustentável.\nGerencie seu dinheiro e faça as escolhas certas para o meio ambiente.", width / 2, height / 2 + 10);
  
  // Instrução para começar
  fill(100, 255, 100);
  textSize(20);
  textStyle(BOLD);
  text("CLIQUE NA TELA PARA INICIAR", width / 2, height - 100);
}

function desenharJogo() {
  // O cenário muda de cor dinamicamente conforme a sustentabilidade aumenta
  let r = map(sustentabilidade, 10, 100, 160, 60);
  let g = map(sustentabilidade, 10, 100, 120, 160);
  let b = map(sustentabilidade, 10, 100, 90, 90);
  
  // Céu
  background(135, 206, 235);
  // Solo dinâmico
  fill(r, g, b);
  noStroke();
  rect(0, 300, width, 300);

  // Painel de Status (HUD)
  fill(0, 0, 0, 150);
  rect(20, 20, 300, 100, 10);
  
  fill(255);
  textSize(18);
  textAlign(LEFT);
  text("💰 Moedas: $" + moedas, 40, 50);
  text("🌱 Sustentabilidade: " + sustentabilidade + "%", 40, 80);
  textAlign(CENTER);

  // Elementos visuais que aparecem conforme o progresso do jogador
  if (sustentabilidade >= 30) {
    // Desenha plantas mais verdes
    fill(40, 180, 40);
    rect(100, 280, 20, 30);
    rect(150, 280, 20, 30);
  } else {
    // Plantas secas iniciais
    fill(120, 90, 60);
    rect(100, 290, 15, 10);
  }

  if (sustentabilidade >= 50) {
    // Desenha Placa Solar
    fill(30, 60, 120);
    rect(600, 250, 60, 30);
    stroke(0);
    line(630, 280, 630, 300);
  }

  if (sustentabilidade >= 80) {
    // Desenha Turbina Eólica Animada
    stroke(255);
    strokeWeight(3);
    line(400, 300, 400, 180);
    push();
    translate(400, 180);
    rotate(frameCount * 0.07);
    line(0, 0, 0, -40);
    line(0, 0, 35, 20);
    line(0, 0, -35, 20);
    pop();
  }

  // Caixa de instrução do turno
  noStroke();
  fill(255, 255, 255, 200);
  rect(50, 370, width - 100, 80, 10);
  fill(0);
  textSize(16);
  text("Escolha quais tecnologias e práticas implementar na sua fazenda.\nCada ação custa moedas, mas aumenta a saúde do seu ecossistema!", width / 2, 410);
}

function desenharVitoria() {
  background(46, 204, 113);
  fill(255);
  textSize(40);
  textStyle(BOLD);
  text("Parabéns! Você Venceu! 🌾", width / 2, height / 2 - 30);
  textSize(20);
  textStyle(NORMAL);
  text("Sua fazenda agora é um modelo global de sustentabilidade e tecnologia.", width / 2, height / 2 + 30);
  text("Clique para jogar novamente", width / 2, height - 100);
}

function desenharDerrota() {
  background(192, 57, 43);
  fill(255);
  textSize(40);
  textStyle(BOLD);
  text("Fim de Jogo! ❌", width / 2, height / 2 - 30);
  textSize(20);
  textStyle(NORMAL);
  text("Seus recursos financeiros acabaram antes da transição ecológica.", width / 2, height / 2 + 30);
  text("Clique para tentar de novo", width / 2, height - 100);
}

// --- LÓGICA DE COMPRA ECONÔMICA ---

function comprarSolar() {
  if (moedas >= 50) {
    moedas -= 50;
    sustentabilidade += 30;
  }
}

function comprarRotacao() {
  if (moedas >= 30) {
    moedas -= 30;
    sustentabilidade += 20;
    // Rotação de culturas gera um pequeno retorno financeiro depois
    moedas += 10; 
  }
}

function comprarDrone() {
  if (moedas >= 60) {
    moedas -= 60;
    sustentabilidade += 40;
  }
}

function checarFimDeJogo() {
  if (sustentabilidade >= 100) {
    tela = "vitoria";
  } else if (moedas < 30 && sustentabilidade < 100) {
    // Se o jogador não tem dinheiro para a ação mais barata e não pontuou 100%
    tela = "derrota";
  }
}

// --- CONTROLE DE CLIQUES NAS TELAS ---

function mousePressed() {
  if (tela === "inicio") {
    tela = "jogar";
  } else if (tela === "vitoria" || tela === "derrota") {
    // Reinicia o jogo
    moedas = 150;
    sustentabilidade = 10;
    tela = "jogar";
  }
}