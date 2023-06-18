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
                <td id="quantidade">{{ car.quantidade }}</td>
                <td>
                  <button @click="openSellModal(car)" class="button_vender">Vender</button>
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
  <div class="modal-content" id="modalvenda">
    <span class="close" @click="closeSellModal">&times;</span>
    <h2>Venda de Veículo</h2>
    <form>
      <label for="model">Modelo:</label>
      <input type="text" id="model" v-model="selectedCar.modelo" readonly>
      <label for="price">Preço:</label>
      <input type="text" id="price" v-model="selectedCar.preco" readonly>
      <label for="clientSelect">Cliente:</label>
      <select id="clientSelect" v-model="selectedClient">
        <option value="">Selecione um cliente</option>
        <option v-for="client in clients" :value="client.id">{{ client.clientes }}</option>
      </select>
      <label for="dealerSelect">Concessionária:</label>
      <select id="dealerSelect" v-model="selectedDealer">
        <option value="">Selecione uma concessionária</option>
        <option v-for="dealer in dealers" :value="dealer.id">{{ dealer.concessionaria }}</option>
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
  border-radius: 12px;
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
  background-color: #ffffff;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #707070;
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
.modal-content{
  border-radius: 20px;
  background-color: white;
}
#modalvenda{
  width: 500px;
}
/*Estilização do modal vendas, inputs e textos*/
p{
  text-align: center;
  font-size: 1.5rem;
  margin-top: 50px;
}
h2{
  align-items: center;
  display: flex;
  justify-content: center;
}
th {
  padding: 12px 15px;
  text-align: left;
  font-weight: bold;
  color: #000000;
  border-bottom: 1px solid #707070;
  font-size: 1.1rem;
  text-align: center;
}

td{
  font-size: 1rem;
  text-align: center;
}
#model{
  border: none;
  outline: none;
  background: none;
  border-bottom: 1px solid #000000;
  padding: 0;
  position:relative;
  font-size: 1rem;
}
label{
  font-size: 1.1rem;
}
#price{
  border: none;
  outline: none;
  background: none;
  border-bottom: 1px solid #000000;
  padding: 0;
  position:relative;
  font-size: 1rem;
}
#clientSelect{
  border: none;
  outline: none;
  background: none;
  border-bottom: 1px solid #000000;
  padding: 0;
  position:relative;
  font-size: 1rem;
}
#dealerSelect{
  border: none;
  outline: none;
  background: none;
  border-bottom: 1px solid #000000;
  padding: 0;
  position:relative;
  font-size: 1rem;
}
/*Estilização do modal vendas, inputs e textos FIM*/

tbody tr:nth-child(even) {
  background-color: #ffffff;
}

td {
  padding: 12px 15px;
  color: #000000;
  border-bottom: 1px solid #dddddd;
}
.button_vender{
  display: inline-block;
  width: 100%;
  height: 43px;
  background-color: #7814FF;
  color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 0.2rem;
  font-size: 0.8rem;
  transition: 2s;
}
.button_vender:hover{
  color: #ffffff;
  background-color: #000000;
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
  background-color: #7814FF;
  color: white;
  border: none;
  cursor: pointer;
  transition: 2s;
  border-radius: 10px;
}

#sellModal button:hover {
  background-color: #000000;
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
      selectedClient: null,
      selectedDealer: null,
      clients: [],
      dealers: [],
      selectedCar: '',
      
    };
  },
  mounted() {
    this.fetchPatios();
    this.fetchClients();
    this.fetchDealers();
  },
  methods: {
    fetchPatios() {
  const patios = [];

  for (let numero = 1; numero <= 10; numero++) {
    const patio = {
      area: numero,
      cor: ''
    };

    if (numero === 3 || numero === 5 || numero === 6) {
      patio.cor = 'branco';
      patios.push(patio);
    } else {
      this.getPatioQuantityFromDatabase(numero)
        .then(quantidade => {
          patio.cor = quantidade > 0 ? 'azul' : 'branco';
          patios.push(patio);

          if (patios.length === 10) {
            patios.sort((a, b) => a.area - b.area); // Ordena os pátios pela área
            this.patios = patios;
          }
        })
        .catch(error => {
          console.error(`Erro ao obter dados do pátio ${numero}:`, error);
          patio.cor = 'azul'; // Defina a cor como 'azul' por padrão em caso de erro
          patios.push(patio);

          if (patios.length === 10) {
            patios.sort((a, b) => a.area - b.area); // Ordena os pátios pela área
            this.patios = patios;
          }
        });
    }
  }
},
getPatioQuantityFromDatabase(numero) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/api/patios/${numero}`)
      .then(response => response.json())
      .then(data => resolve(data.quantidade))
      .catch(error => reject(error));
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

    fetchClients() {
    fetch('http://localhost:3000/api/clientes')
      .then(response => response.json())
      .then(data => {
        this.clients = data;
      })
      .catch(error => {
        console.error('Erro ao obter os dados dos clientes:', error);
      });
  },
  fetchDealers() {
    fetch('http://localhost:3000/api/concessionaria')
      .then(response => response.json())
      .then(data => {
        this.dealers = data;
      })
      .catch(error => {
        console.error('Erro ao obter os dados das concessionárias:', error);
      });
  },
    closeModal() {
      this.showModal = false;
      this.carData = [];
    },
    openSellModal(car) {
  this.selectedCar = Object.assign({}, car);
  this.showSellModal = true;
},


    closeSellModal() {
      this.showSellModal = false;
      this.buyerName = '';
      this.salePrice = '';
    },
    sellCar() {
      this.closeSellModal();
      if (this.selectedClient && this.selectedDealer) {
        Swal.fire(
          'Vendido',
          'O veículo foi vendido com sucesso',
          'success'
        ).then(() => {
          const automovelId = this.selectedCar.id;

          fetch(`http://localhost:3000/api/vendas/${automovelId}`, {
            method: 'PUT'
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              // Atualizar a quantidade do veículo no frontend
              const carIndex = this.carData.findIndex(car => car.id === automovelId);
              if (carIndex !== -1) {
                this.carData[carIndex].quantidade -= 1;
              }
            })
            .catch(error => {
              console.error("Erro ao atualizar a quantidade do automóvel:", error);
            });
        });
      } else {
        Swal.fire(
          'Erro!',
          'Selecione um cliente e uma concessionária antes de confirmar a venda',
          'error'
        );
      }
    },


  },
};
</script>