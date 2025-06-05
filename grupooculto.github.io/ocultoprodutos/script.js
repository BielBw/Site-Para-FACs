const produtos = [
  { nome: "FIVE-SEVEN", limpo: 75000, limpoParceiro: 70000,  },
  { nome: "M1911", limpo: 75000, limpoParceiro: 70000,  },
  { nome: "REVOLVER", limpo: 80000, limpoParceiro: 74000,  },
  { nome: "SHOTGUN", limpo: 110000, limpoParceiro: 90000,  },
  { nome: "TEC-9", limpo: 90000, limpoParceiro: 80000,  },
  { nome: "UZI", limpo: 140000, limpoParceiro: 95000,  },
  { nome: "AUG", limpo: 160000, limpoParceiro: 100000,  },
  { nome: "EVO", limpo: 160000, limpoParceiro: 100000,  },
  { nome: "THOMPSON", limpo: 170000, limpoParceiro: 110000,  },
  { nome: "AKS74", limpo: 180000, limpoParceiro: 120000,  },
  { nome: "AK47", limpo: 230000, limpoParceiro: 140000,  },
  { nome: "G3", limpo: 280000, limpoParceiro: 200000,  },
  { nome: "PARAFAL", limpo: 300000, limpoParceiro: 200000,  },
  
];
const porcentagemVendedor = 0.10 //10%

const tbody = document.getElementById('produtos');
// const totalLimpo = document.getElementById('total-limpo');
// const totalSujo = document.getElementById('total-sujo');
// const totalLimpoParceiro = document.getElementById('total-limpo-parceiro');
// const totalSujoParceiro = document.getElementById('total-sujo-parceiro');

// Preencher a tabela com produtos
produtos.forEach((produto, index) => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${produto.nome}</td>
    <td class="limpo">R$ ${(produto.limpo * 0).toLocaleString('pt-BR')}</td>
    <td class="limpo-parceiro">R$ ${(produto.limpoParceiro * 0).toLocaleString('pt-BR')}</td>
    <td><input type="number" min="0" value="0" onchange="atualizaValor(${index}, this.value)"></td>
  `;
  tbody.appendChild(tr);
});

// Atualizar valores e totais
function atualizaValor(index, qtd) {
  const produto = produtos[index];
  const tr = tbody.children[index];

  const limpo = produto.limpo * qtd;
  const sujo = produto.sujo * qtd;
  const limpoParceiro = produto.limpoParceiro * qtd;
  const sujoParceiro = produto.sujoParceiro * qtd;

  tr.querySelector('.limpo').textContent = `R$ ${limpo.toLocaleString('pt-BR')}`;
  tr.querySelector('.limpo-parceiro').textContent = `R$ ${limpoParceiro.toLocaleString('pt-BR')}`;

  calcularTotais(document.querySelector("#mode-selector").value)
}

function formatBrl(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
// Calcular os totais
function calcularTotais(selector) {
  let totalLimpoValor = 0, totalSujoValor = 0, totalLimpoParceiroValor = 0, totalSujoParceiroValor = 0;
  const totais = document.querySelector("#totais");

  produtos.forEach((produto, index) => {
    const qtd = tbody.children[index].querySelector('input').value;
    totalLimpoValor += produto.limpo * qtd;
    totalSujoValor += produto.sujo * qtd;
    totalLimpoParceiroValor += produto.limpoParceiro * qtd;
    totalSujoParceiroValor += produto.sujoParceiro * qtd;
  });

  if (selector == "limpo" && totalLimpoValor > 0) {
    let totalVendedor = totalLimpoValor * porcentagemVendedor;
    totais.innerHTML = ` <p>Limpo: <span>${formatBrl(totalLimpoValor)}</span></p> </p>`
    
  } else if (selector == "limpo-parc" && totalLimpoParceiroValor > 0) {
    let totalVendedor = totalLimpoParceiroValor * porcentagemVendedor;
    totais.innerHTML = ` <p>Limpo Parceiro: <span>${formatBrl(totalLimpoParceiroValor)}
    `
  } else if (selector == '') {
    totais.innerHTML = "Nenhum valor atribuido"
  }

}


document.querySelector("#mode-selector").addEventListener('change', (e) => {
  console.log("ALTERANDO SELETOR")
  calcularTotais(e.target.value)
})
calcularTotais('')
