document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('productForm');
  const tableBody = document.getElementById('inventoryTable');

  // Recupera dados salvos no navegador ou inicia lista vazia
  let inventory = JSON.parse(localStorage.getItem('oliveira_estoque')) || [];

  // Função para renderizar a tabela
  function renderTable() {
    tableBody.innerHTML = '';

    if (inventory.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Nenhum produto cadastrado.</td></tr>`;
      return;
    }

    inventory.forEach((item, index) => {
      const row = document.createElement('tr');

      // Converte o preço para o formato R$ 2.000,00
      const formattedPrice = Number(item.price).toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
      });

      row.innerHTML = `
        <td>#${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.quantity}</td>
        <td>${formattedPrice}</td>
        <td>
          <button class="btn-delete" onclick="deleteProduct(${index})">Excluir</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  // Adicionar produto
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura os elementos do formulário
    const nameInput = document.getElementById('name');
    const categorySelect = document.getElementById('category');
    const quantityInput = document.getElementById('quantity');
    const priceInput = document.getElementById('price');

    // Cria o objeto com os valores digitados/selecionados
    const newProduct = {
      name: nameInput.value,
      category: categorySelect.value, // Pega a opção exata selecionada no formulário
      quantity: quantityInput.value,
      price: priceInput.value
    };

    inventory.push(newProduct);
    saveAndRender();
    form.reset(); // Limpa o formulário
  });

  // Salvar no localStorage e atualizar a tela
  function saveAndRender() {
    localStorage.setItem('oliveira_estoque', JSON.stringify(inventory));
    renderTable();
  }

  // Função global para deletar itens
  window.deleteProduct = function(index) {
    if (confirm('Deseja realmente remover este produto?')) {
      inventory.splice(index, 1);
      saveAndRender();
    }
  };

  // Renderização inicial
  renderTable();
});

/*
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('productForm');
  const tableBody = document.getElementById('inventoryTable');

  // Recupera dados salvos no navegador ou inicia lista vazia
  let inventory = JSON.parse(localStorage.getItem('oliveira_estoque')) || [];

  // Função para renderizar a tabela
  function renderTable() {
    tableBody.innerHTML = '';

    if (inventory.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Nenhum produto cadastrado.</td></tr>`;
      return;
    }
/
    inventory.forEach((item, index) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>#${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.quantity}</td>
        <td>R$ ${parseFloat(item.price).toFixed(2)}</td>
        <td>
          <button class="btn-delete" onclick="deleteProduct(${index})">Excluir</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  // Adicionar produto
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = {
      name: document.getElementById('name').value,
      category: document.getElementById('category').value,
      quantity: document.getElementById('quantity').value,
      price: document.getElementById('price').value
    };

    inventory.push(newProduct);
    saveAndRender();
    form.reset();
  });

  // Salvar no localStorage e atualizar a tela
  function saveAndRender() {
    localStorage.setItem('oliveira_estoque', JSON.stringify(inventory));
    renderTable();
  }

  // Função global para deletar itens
  window.deleteProduct = function(index) {
    if (confirm('Deseja realmente remover este produto?')) {
      inventory.splice(index, 1);
      saveAndRender();
    }
  };

  // Renderização inicial
  renderTable();
});
*/