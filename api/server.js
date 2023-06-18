import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3000;

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'saep'
});

// Verificação da conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

// Rota para testar a conexão com o banco de dados
app.get('/', (req, res) => {
  res.send('Conexão com o banco de dados estabelecida com sucesso!');
});

// Rota para puxar patios
// Rota para puxar patios
app.get('/api/alocacao', (req, res) => {
    const query = 'SELECT DISTINCT area, quantidade FROM alocacao ORDER BY area ASC';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao obter dados da tabela de alocação:', err);
        res.status(500).json({ error: 'Erro ao obter dados da tabela de alocação' });
      } else {
        const setores = results.map(row => ({
          area: row.area,
          cor: row.quantidade > 0 ? 'azul' : 'branco',
        }));
  
        res.json(setores);
      }
    });
  });
  

//Rota para puxar os dados dos veiculos
app.get('/api/automoveis/:alocacao', (req, res) => {
    const alocacao = req.params.alocacao;
    const query = `
    SELECT automoveis.modelo, automoveis.preco, alocacao.quantidade
    FROM automoveis
    JOIN alocacao ON automoveis.id = alocacao.id
    WHERE alocacao.area = ?
    `;

    connection.query(query, [alocacao], (error, results) => {
    if (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao consultar os veículos.' });
    } else {
        res.json(results);
    }
    });
});
//Rota para puxar os dados dos clientes
app.get('/api/clientes', (req, res) => {
    const query = 'SELECT * FROM clientes';

    connection.query(query, (error, results) => {
    if (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao consultar os clientes.' });
    } else {
        res.json(results);
    }
    });
});
//Rota para puxar os dados da concessionaria
app.get('/api/concessionaria', (req, res) => {
    const query = 'SELECT * FROM concessionaria';

    connection.query(query, (error, results) => {
    if (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao consultar a concessionaria.' });
    } else {
        res.json(results);
    }
    });
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
