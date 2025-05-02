// Datos iniciales proporcionados para la prueba
const clients = [
    { id: 1, taxNumber: '86620855', name: 'HECTOR ACUÑA BOLAÑOS' },
    { id: 2, taxNumber: '7317855K', name: 'JESUS RODRIGUEZ ALVAREZ' },
    { id: 3, taxNumber: '73826497', name: 'ANDRES NADAL MOLINA' },
    { id: 4, taxNumber: '88587715', name: 'SALVADOR ARNEDO MANRIQUEZ' },
    { id: 5, taxNumber: '94020190', name: 'VICTOR MANUEL ROJAS LUCAS' },
    { id: 6, taxNumber: '99804238', name: 'MOHAMED FERRE SAMPER' }
  ];
  
  const accounts = [
    { clientId: 6, bankId: 1, balance: 15000 },
    { clientId: 1, bankId: 3, balance: 18000 },
    { clientId: 5, bankId: 3, balance: 135000 },
    { clientId: 2, bankId: 2, balance: 5600 },
    { clientId: 3, bankId: 1, balance: 23000 },
    { clientId: 5, bankId: 2, balance: 15000 },
    { clientId: 3, bankId: 3, balance: 45900 },
    { clientId: 2, bankId: 3, balance: 19000 },
    { clientId: 4, bankId: 3, balance: 51000 },
    { clientId: 5, bankId: 1, balance: 89000 },
    { clientId: 1, bankId: 2, balance: 1600 },
    { clientId: 5, bankId: 3, balance: 37500 },
    { clientId: 6, bankId: 1, balance: 19200 },
    { clientId: 2, bankId: 3, balance: 10000 },
    { clientId: 3, bankId: 2, balance: 5400 },
    { clientId: 3, bankId: 1, balance: 9000 },
    { clientId: 4, bankId: 3, balance: 13500 },
    { clientId: 2, bankId: 1, balance: 38200 },
    { clientId: 5, bankId: 2, balance: 17000 },
    { clientId: 1, bankId: 3, balance: 1000 },
    { clientId: 5, bankId: 2, balance: 600 },
    { clientId: 6, bankId: 1, balance: 16200 },
    { clientId: 2, bankId: 2, balance: 10000 }
  ];
  
  const banks = [
    { id: 1, name: 'SANTANDER' },
    { id: 2, name: 'CHILE' },
    { id: 3, name: 'ESTADO' }
  ];
  


  //Pregunta 0: Retornar solamente los IDs de los clientes.

const listClientsIds = () => clients.map(client => client.id);

//Pregunta 1: Ordenar los IDs de clientes según su RUT (taxNumber) de forma ascendente.

const listClientsIdsSortByTaxNumber = () => 
    clients
      .slice()
      .sort((a, b) => a.taxNumber.localeCompare(b.taxNumber))
      .map(client => client.id);

//Pregunta 2: Debemos sumar todos los balances de cada cliente y luego ordenar de mayor a menor.
const sortClientsTotalBalances = () => {
    const totalBalances = clients.map(client => {
      const total = accounts
        .filter(account => account.clientId === client.id)
        .reduce((sum, acc) => sum + acc.balance, 0);
      return { name: client.name, total };
    });
  
    return totalBalances
      .sort((a, b) => b.total - a.total)
      .map(client => client.name);
  };

  //Pregunta 3: Agrupar los RUT por bancos, ordenando los clientes alfabéticamente por sus nombres.
  const banksClientsTaxNumbers = () => {
    const result = {};
    banks.forEach(bank => {
      const clientsOfBank = accounts
        .filter(account => account.bankId === bank.id)
        .map(account => account.clientId)
        .filter((id, index, arr) => arr.indexOf(id) === index)
        .map(clientId => clients.find(client => client.id === clientId))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(client => client.taxNumber);
  
      result[bank.name] = clientsOfBank;
    });
  
    return result;
  };

  // Pregunta 4: Obtener los balances mayores a 25000 del banco Santander y ordenarlos decrecientemente.
  const richClientsBalances = () => 
    accounts
      .filter(acc => acc.bankId === 1 && acc.balance > 25000)
      .map(acc => acc.balance)
      .sort((a, b) => b - a);
      
//Pregunta 5: Calcular el dinero total administrado por cada banco y ordenarlos en forma ascendente.

const banksRankingByTotalBalance = () => {
    const totalByBank = banks.map(bank => ({
      bankId: bank.id,
      total: accounts
        .filter(acc => acc.bankId === bank.id)
        .reduce((sum, acc) => sum + acc.balance, 0)
    }));
  
    return totalByBank
      .sort((a, b) => a.total - b.total)
      .map(bank => bank.bankId);
  };

//Pregunta 6: Contar clientes que tengan cuentas solo en un banco.
const banksFidelity = () => {
    const fidelity = {};
    banks.forEach(bank => {
      const clientsInBank = accounts
        .filter(acc => acc.bankId === bank.id)
        .map(acc => acc.clientId);
      
      const uniqueClients = clientsInBank.filter(clientId => {
        const banksClientHas = accounts
          .filter(acc => acc.clientId === clientId)
          .map(acc => acc.bankId);
        return new Set(banksClientHas).size === 1;
      });
  
      fidelity[bank.name] = new Set(uniqueClients).size;
    });
  
    return fidelity;
  };

  // Pregunta 7: Identificar al cliente con menor saldo total en cada banco.
  const banksPoorClients = () => {
    const result = {};
    banks.forEach(bank => {
      const clientsInBank = accounts
        .filter(acc => acc.bankId === bank.id)
        .map(acc => acc.clientId);
  
      const uniqueClients = [...new Set(clientsInBank)];
  
      let poorestClientId = null;
      let lowestBalance = Infinity;
  
      uniqueClients.forEach(clientId => {
        const total = accounts
          .filter(acc => acc.bankId === bank.id && acc.clientId === clientId)
          .reduce((sum, acc) => sum + acc.balance, 0);
  
        if (total < lowestBalance) {
          lowestBalance = total;
          poorestClientId = clientId;
        }
      });
  
      result[bank.name] = poorestClientId;
    });
  
    return result;
  };

  //Pregunta 8: Agregar nuevo cliente ficticio, añadir cuenta en banco ESTADO y determinar su posición en ranking de saldos (pregunta 2).
  const newClientRanking = () => {
    // Agregar cliente ficticio
    const newClient = {
      id: clients.length + 1,
      taxNumber: '12345678',
      name: 'CLIENTE FICTICIO'
    };
    clients.push(newClient);
  
    // Agregar cuenta ficticia al banco ESTADO (id:3)
    accounts.push({ clientId: newClient.id, bankId: 3, balance: 9000 });
  
    // Obtener nuevo ranking (pregunta 2)
    const ranking = sortClientsTotalBalances();
    return ranking.indexOf(newClient.name) + 1; // +1 porque el índice comienza en 0
  };

  //

  // Finalmente los console.logs para probar cada función:
  console.log('Pregunta 0:', listClientsIds());
  console.log('Pregunta 1:', listClientsIdsSortByTaxNumber());
  console.log('Pregunta 2:', sortClientsTotalBalances());
  console.log('Pregunta 3:', banksClientsTaxNumbers());
  console.log('Pregunta 4:', richClientsBalances());
  console.log('Pregunta 5:', banksRankingByTotalBalance());
  console.log('Pregunta 6:', banksFidelity());
  console.log('Pregunta 7:', banksPoorClients());
  console.log('Pregunta 8:', newClientRanking());
  