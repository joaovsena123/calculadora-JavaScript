const visor = document.getElementById("visor");
const teclas = document.querySelector(".teclas");

let atual = "0";
let anterior = null;
let operadorAtual = null;
function digitar(n) {
  if (n === "." && atual.includes(".")) return;
  if (atual === "0" && n !== ".") atual = n;
  else if (atual === "Erro") atual = n;
  else atual += n;
}

function escolherOperador(op) {
  anterior = atual;
  operadorAtual = op;
  atual = "0";
}

function calcular() {
  if (operadorAtual === null) return;

  const a = parseFloat(anterior);
  const b = parseFloat(atual);
  let resultado;

  switch (operadorAtual) {
    case "+": resultado = a + b; break;
    case "-": resultado = a - b; break;
    case "*": resultado = a * b; break;
    case "/": resultado = b == 0 ? "Erro" : a / b; break;
  }


  atual = resultado === "Erro" ? "Erro" : String(parseFloat(resultado.toFixed(10)));
  anterior = null;
  operadorAtual = null;
}

function limpar() {
  atual = "0";
  anterior = null;
  operadorAtual = null;
}

function apagar() {
  atual = atual.length > 1 ? atual.slice(0, -1) : "0";
}
function atualizarVisor() {
    visor.textContent = atual;
}
teclas.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button");
  if (!botao) return;
  
  const numero = botao.dataset.numero;
  const operador = botao.dataset.operador;
  const acao = botao.dataset.acao;
  if (numero !== undefined) digitar(numero);
  if (operador !== undefined) escolherOperador(operador);
  if (acao === "limpar") limpar();
  if (acao === "apagar") apagar();
  if (acao === "igual") calcular();

  atualizarVisor();
});
atualizarVisor();