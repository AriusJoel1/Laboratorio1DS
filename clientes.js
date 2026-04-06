// Ejercicio 2: Cliente más fiel por socio

// Ejemplo de Entrada: 
const rawInput = `4 5 7
1 100
1 200
2 300
3 400
3 500
1501 100
1502 100
1501 200
1503 300
1501 400
1502 400
1502 500`;

// Si por alguna razón está vacío, no hacemos nada
if (!rawInput.trim()) {
  console.log("No hay datos");
}

// Convertimos todo en líneas
const input = rawInput.trim().split("\n");

let index = 0;

// Cantidad de socios, terminales y transacciones
const [N, M, S] = input[index++].split(" ").map(Number);



// 1. Relacionar terminal - socio


// Aquí guardamos a qué socio pertenece cada terminal
const terminalToSocio = {};

// Leemos los terminales
for (let i = 0; i < M; i++) {
  const [socio, terminal] = input[index++].split(" ").map(Number);
  terminalToSocio[terminal] = socio;
}

// 2. Contar compras de cada cliente por socio

const compras = {};

// Creamos los socios vacíos
for (let i = 1; i <= N; i++) {
  compras[i] = {};
}

// Leemos las transacciones
for (let i = 0; i < S; i++) {
  const [cliente, terminal] = input[index++].split(" ").map(Number);

  // Buscamos a qué socio pertenece ese terminal
  const socio = terminalToSocio[terminal];

  // Si algo raro pasa, lo ignoramos
  if (!socio) continue;

  // Si el cliente aún no existe, lo iniciamos
  if (!compras[socio][cliente]) {
    compras[socio][cliente] = 0;
  }

  // Sumamos una compra
  compras[socio][cliente]++;
}


// 3. Encontrar el cliente más fiel por socio

for (let socio = 1; socio <= N; socio++) {
  const clientes = compras[socio];

  let mejorCliente = -1;
  let maxCompras = 0;

  // Revisamos todos los clientes de ese socio
  for (const clienteStr in clientes) {
    const cliente = Number(clienteStr);
    const cantidad = clientes[clienteStr];

    // gana el que tiene más compras
    // y si empatan, gana el ID más pequeño
    if (
      cantidad > maxCompras ||
      (cantidad === maxCompras && cliente < mejorCliente)
    ) {
      maxCompras = cantidad;
      mejorCliente = cliente;
    }
  }

  // Mostramos resultado
  console.log(socio + " " + mejorCliente);
}