function calcular() {
  const horas = parseFloat(document.getElementById('horas').value);
  const resultado = document.getElementById('resultado');
  if (isNaN(horas)) {
    resultado.textContent = 'Por favor, insira um número válido.';
    return;
  }
  const h = Math.floor(horas);
  const m = Math.round((horas - h) * 60);
  resultado.textContent = `Você trabalhou ${h}h ${m}min hoje.`;
  salvarHistorico(horas);
}

function salvarHistorico(horas) {
  let hist = JSON.parse(localStorage.getItem('historico')) || [];
  hist.push(`${horas}h`);
  localStorage.setItem('historico', JSON.stringify(hist));
  mostrarHistorico();
}

function mostrarHistorico() {
  const lista = document.getElementById('listaHistorico');
  if (!lista) return;
  const hist = JSON.parse(localStorage.getItem('historico')) || [];
  lista.innerHTML = hist.map(h => `<li>${h}</li>`).join('');
}

function ativarPro() {
  localStorage.setItem('proUser', 'true');
  alert('Versão PRO ativada com sucesso!');
}

window.onload = () => {
  mostrarHistorico();
  const btnShare = document.getElementById('btnShare');
  if (btnShare && navigator.share) {
    btnShare.onclick = () => navigator.share({title: 'Minha Jornada CLT', text: 'Veja meu resultado na calculadora CLT!', url: location.href});
  }
};
