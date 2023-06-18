<template>
  <div id="app">
    <div v-for="patio in patios" :key="patio.area" class="box" :class="{ occupied: patio.cor === 'azul', empty: patio.cor === 'branco' }" @click="showCarInformation(patio)">
      {{ patio.area }}
    </div>
    <!-- MODAL DE INFORMAÇÕES DO VEÍCULO -->
    <div id="carInformationModal" class="modal" :class="{ 'show-modal': showModal }">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Área {{ currentPatio.area }}</h2>
        <template v-if="carData.length > 0">
          <table>
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="car in carData" :key="car.modelo">
                <td>{{ car.modelo }}</td>
                <td>{{ car.preco }}</td>
                <td>{{ car.quantidade }}</td>
                <td>
                  <button @click="openSellModal(car)">Vender</button>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
        <p v-else>Nenhum veículo neste pátio.</p>
      </div>
    </div>

    <!-- MODAL DE VENDA -->
    <div id="sellModal" class="modal" :class="{ 'show-modal': showSellModal }">
  <div class="modal-content">
    <span class="close" @click="closeSellModal">&times;</span>
    <h2>Venda de Veículo</h2>
    <form>
      <label for="buyerName">Nome do Comprador:</label>
      <input type="text" id="buyerName" v-model="buyerName" required>
      <label for="salePrice">Preço da Venda:</label>
      <input type="number" id="salePrice" v-model="salePrice" required>
      <label for="clientSelect">Cliente:</label>
      <select id="clientSelect" v-model="selectedClient">
        <option value="">Selecione um cliente</option>
        <option v-for="client in clients" :value="client.id">{{ client.nome }}</option>
      </select>
      <label for="dealerSelect">Concessionária:</label>
      <select id="dealerSelect" v-model="selectedDealer">
        <option value="">Selecione uma concessionária</option>
        <option v-for="dealer in dealers" :value="dealer.id">{{ dealer.nome }}</option>
      </select>
      <button type="submit" @click.prevent="sellCar">Confirmar Venda</button>
    </form>
  </div>
</div>

  </div>
</template>

<style>
/* Estilos anteriores permanecem iguais */

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #4e4e4e;
  color: #ffffff;
}

.box {
  width: 100px;
  height: 100px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.occupied {
  background-color: #0000ff;
  color: #ffffff;
}

.empty {
  background-color: #ffffff;
  color: #000000;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  color: #000000;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: #000000;
}

#carInformation {
  margin-top: 20px;
}

.show-modal {
  display: block;
}


/* Estilização da tabela */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #f5f5f5;
}

th {
  padding: 12px 15px;
  text-align: left;
  font-weight: bold;
  color: #000000;
  border-bottom: 1px solid #dddddd;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

td {
  padding: 12px 15px;
  color: #000000;
  border-bottom: 1px solid #dddddd;
}

/* Estilização do modal de venda */
#sellModal form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#sellModal label {
  font-weight: bold;
}

#sellModal input {
  padding: 5px;
}

#sellModal button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

#sellModal button:hover {
  background-color: #45a049;
}

</style>

<script>
export default {
  data() {
    return {
      showModal: false,
      showSellModal: false,
      buyerName: '',
      salePrice: '',
      carData: [],
      currentPatio: {},
      patios: [],
    };
  },
  mounted() {
    this.fetchPatios();
  },
  methods: {
    fetchPatios() {
      fetch('http://localhost:3000/api/alocacao')
        .then(response => response.json())
        .then(data => {
          this.patios = data;
        })
        .catch(error => {
          console.error('Erro ao obter os dados dos patios:', error);
        });
    },
    showCarInformation(patio) {
      this.currentPatio = patio;
      const area = patio.area;

      fetch(`http://localhost:3000/api/automoveis/${area}`)
        .then(response => response.json())
        .then(data => {
          this.carData = data;
          this.showModal = true;
        })
        .catch(error => {
          console.error('Erro ao obter os dados dos veículos:', error);
        });
    },
    closeModal() {
      this.showModal = false;
      this.carData = [];
    },
    openSellModal(car) {
      this.selectedCar = car;
      this.showSellModal = true;
    },
    closeSellModal() {
      this.showSellModal = false;
      this.buyerName = '';
      this.salePrice = '';
    },
    sellCar() {
      const { modelo, preco, quantidade } = this.selectedCar;
      const sale = {
        modelo,
        preco,
        quantidade,
        comprador: this.buyerName,
        precoVenda: this.salePrice,
      };
      // Aqui você pode fazer a lógica para enviar os dados da venda para o backend
      console.log('Venda efetuada:', sale);
      this.closeSellModal();
    },
  },
};
</script>
