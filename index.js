document.getElementById('simulador-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const valor = parseFloat(document.getElementById('valor').value);
  const prazo = parseInt(document.getElementById('prazo').value);
  const jurosMensal = 0.02;
  const parcela = (valor * jurosMensal) / (1 - Math.pow(1 + jurosMensal, -prazo));
  const total = parcela * prazo;

  const resumo = `Você pagará ${prazo} parcelas de R$ ${parcela.toFixed(2)}, totalizando R$ ${total.toFixed(2)}.`;
  document.getElementById('resumo').innerText = resumo;
  document.getElementById('resultado').style.display = 'block';

  // Webhook - Exemplo
  fetch('https://seu-webhook-url.com/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ valor, prazo, parcela: parcela.toFixed(2), total: total.toFixed(2) })
  });

  // WhatsApp redirect com mensagem
  const mensagem = encodeURIComponent(`Simulação de Empréstimo:\n${resumo}`);
  const numeroWhats = '5599999999999'; // Substitua pelo seu número com DDI
  document.getElementById('whatsapp-link').href = `https://wa.me/${numeroWhats}?text=${mensagem}`;
});