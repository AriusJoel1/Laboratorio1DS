// Router tipo SPA 

// INPUT 
const rawInput = `3
/home HomePage
/user/:id UserPage
/about AboutPage
4
/home
/user/42
/about
/contact`;

// Separar la entrada por líneas
const input = rawInput.trim().split(/\r?\n/);

let index = 0;

// Cantidad de rutas
const n = parseInt(input[index++], 10);

// Guardamos todas las rutas junto con su contenido
const routes = [];

// Leemos las rutas una por una
for (let i = 0; i < n; i++) {
  const parts = input[index++].split(" ");
  const path = parts[0];
  const content = parts.slice(1).join(" ");

  routes.push({ path, content });
}

// Cantidad de transiciones
const m = parseInt(input[index++], 10);

// Función para verificar coincidencias
function matchRoute(routePath, url) {
  const routeParts = routePath.split("/");
  const urlParts = url.split("/");

  if (routeParts.length !== urlParts.length) {
    return null;
  }

  const params = [];

  for (let i = 0; i < routeParts.length; i++) {
    const routePart = routeParts[i];
    const urlPart = urlParts[i];

    if (routePart.startsWith(":")) {
      params.push(urlPart);
    } else {
      if (routePart !== urlPart) {
        return null;
      }
    }
  }

  return params;
}

// Procesar transiciones
for (let i = 0; i < m; i++) {
  const url = input[index++];
  let found = false;

  for (const route of routes) {
    const params = matchRoute(route.path, url);

    if (params !== null) {
      let result = route.content;

      if (params.length > 0) {
        result += " " + params.join(" ");
      }

      console.log(result);
      found = true;
      break;
    }
  }

  if (!found) {
    console.log("404 Not Found");
  }
}