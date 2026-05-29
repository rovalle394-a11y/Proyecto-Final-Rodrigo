const botonModo = document.getElementById("modoOscuro");

if (botonModo) {
  botonModo.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("tema", "dark");
      guardarActividad("🌙 Activaste el modo oscuro.");
    } else {
      localStorage.setItem("tema", "light");
      guardarActividad("☀️ Activaste el modo claro.");
    }
  });
}

if (localStorage.getItem("tema") === "dark") {
  document.body.classList.add("dark");
}

/*Actividad Reciente*/

function guardarActividad(texto){

let actividades =
JSON.parse(localStorage.getItem("actividades")) || [];

actividades.unshift(texto);

if(actividades.length > 5){
actividades.pop();
}

localStorage.setItem(
"actividades",
JSON.stringify(actividades)
);

}

/*Datos de Recetas*/

const recetasData = {
  tacos: {
    id: "tacos",
    titulo: "Tacos Mexicanos",
    imagen: "img/tacos.jpg",
    alt: "Tacos mexicanos",
    tiempo: "30 minutos",
    dificultad: "Fácil",
    porciones: "4",
    descripcion: "Receta tradicional mexicana fácil de preparar.",
    ingredientes: ["500g carne", "8 tortillas", "1 cebolla", "Salsa"],
    preparacion: [
      "Cocinar la carne.",
      "Calentar las tortillas.",
      "Agregar carne y salsa.",
      "Servir caliente."
    ]
  },

  pasta: {
    id: "pasta",
    titulo: "Pasta Cremosa",
    imagen: "img/pasta.jpg",
    alt: "Pasta italiana cremosa",
    tiempo: "25 minutos",
    dificultad: "Fácil",
    porciones: "2",
    descripcion: "Pasta cremosa con ingredientes sencillos.",
    ingredientes: ["200g pasta", "1 taza de crema", "Queso parmesano", "Sal y pimienta"],
    preparacion: [
      "Cocer la pasta en agua con sal.",
      "Calentar la crema en una sartén.",
      "Mezclar la pasta con la crema.",
      "Agregar queso parmesano y servir."
    ]
  },

  hotcakes: {
    id: "hotcakes",
    titulo: "Hotcakes",
    imagen: "img/pancakes.jpg",
    alt: "Hotcakes con miel",
    tiempo: "20 minutos",
    dificultad: "Fácil",
    porciones: "3",
    descripcion: "Desayuno clásico rápido y delicioso.",
    ingredientes: ["1 taza de harina", "1 huevo", "1 taza de leche", "Miel al gusto"],
    preparacion: [
      "Mezclar harina, huevo y leche.",
      "Calentar un sartén antiadherente.",
      "Verter porciones de mezcla.",
      "Cocinar por ambos lados y servir con miel."
    ]
  },

  enchiladas: {
    id: "enchiladas",
    titulo: "Enchiladas",
    imagen: "img/enchiladas.jpg",
    alt: "Enchiladas mexicanas",
    tiempo: "35 minutos",
    dificultad: "Media",
    porciones: "4",
    descripcion: "Platillo mexicano tradicional con salsa roja y queso.",
    ingredientes: [
      "8 tortillas",
      "500g pollo deshebrado",
      "Salsa roja",
      "Queso rallado",
      "Crema"
    ],
    preparacion: [
      "Freír ligeramente las tortillas.",
      "Rellenar con pollo deshebrado.",
      "Agregar salsa roja encima.",
      "Añadir queso y crema.",
      "Servir caliente."
    ]
  },

  pizza: {
    id: "pizza",
    titulo: "Pizza Casera",
    imagen: "img/pizza.jpg",
    alt: "Pizza casera italiana",
    tiempo: "40 minutos",
    dificultad: "Media",
    porciones: "6",
    descripcion: "Pizza italiana sencilla preparada en casa.",
    ingredientes: [
      "Masa para pizza",
      "Salsa de tomate",
      "Queso mozzarella",
      "Pepperoni",
      "Orégano"
    ],
    preparacion: [
      "Extender la masa para pizza.",
      "Agregar salsa de tomate.",
      "Añadir queso y pepperoni.",
      "Hornear durante 20 minutos.",
      "Servir caliente."
    ]
  },

  helado: {
    id: "helado",
    titulo: "Helado Casero",
    imagen: "img/helado.jpg",
    alt: "Helado casero",
    tiempo: "15 minutos + congelación",
    dificultad: "Fácil",
    porciones: "4",
    descripcion: "Postre refrescante fácil de preparar.",
    ingredientes: [
      "2 tazas de leche",
      "1 taza de crema",
      "Vainilla",
      "Azúcar"
    ],
    preparacion: [
      "Mezclar leche, crema y azúcar.",
      "Agregar vainilla.",
      "Colocar en recipiente.",
      "Congelar por varias horas.",
      "Servir frío."
    ]
  }
};

/*Cargar Receta*/

const params = new URLSearchParams(window.location.search);
const recetaId = params.get("id") || "tacos";
const recetaActual = recetasData[recetaId];

if (recetaActual) {
  const titulo = document.getElementById("recetaTitulo");
  const imagen = document.getElementById("recetaImagen");
  const tiempo = document.getElementById("recetaTiempo");
  const dificultad = document.getElementById("recetaDificultad");
  const porciones = document.getElementById("recetaPorciones");
  const ingredientes = document.getElementById("recetaIngredientes");
  const preparacion = document.getElementById("recetaPreparacion");
  const btnFavorito = document.querySelector(".btn-favorito");

  if (titulo) titulo.textContent = recetaActual.titulo;
  if (imagen) {
    imagen.src = recetaActual.imagen;
    imagen.alt = recetaActual.alt;
  }

  if (tiempo) tiempo.textContent = recetaActual.tiempo;
  if (dificultad) dificultad.textContent = recetaActual.dificultad;
  if (porciones) porciones.textContent = recetaActual.porciones;

  if (ingredientes) {
    ingredientes.innerHTML = "";
    recetaActual.ingredientes.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ingredientes.appendChild(li);
    });
  }

  if (preparacion) {
    preparacion.innerHTML = "";
    recetaActual.preparacion.forEach(paso => {
      const li = document.createElement("li");
      li.textContent = paso;
      preparacion.appendChild(li);
    });
  }

  if (btnFavorito) {
    btnFavorito.dataset.titulo = recetaActual.titulo;
    btnFavorito.dataset.imagen = recetaActual.imagen;
    btnFavorito.dataset.descripcion = recetaActual.descripcion;
  }
}

const botonFavoritoReceta = document.querySelector(".btn-favorito");
const mensajeFavorito = document.getElementById("mensajeFavorito");

if (botonFavoritoReceta) {

  botonFavoritoReceta.addEventListener("click", function () {

    const receta = {
      id: recetaActual.id,
      titulo: botonFavoritoReceta.dataset.titulo,
      imagen: botonFavoritoReceta.dataset.imagen,
      descripcion: botonFavoritoReceta.dataset.descripcion
    };

    let favoritas =
    JSON.parse(localStorage.getItem("favoritas")) || [];

    const existe = favoritas.some(
      item => item.id === receta.id
    );

    if (!existe) {

      favoritas.push(receta);

      localStorage.setItem(
        "favoritas",
        JSON.stringify(favoritas)
      );

      mensajeFavorito.textContent =
      "Receta guardada correctamente.";
      guardarActividad(`❤️ Guardaste "${receta.titulo}" en favoritos.`
      );

      mensajeFavorito.className =
      "mensaje-exito";

    } else {

      mensajeFavorito.textContent =
      "Esta receta ya estaba guardada.";

      mensajeFavorito.className =
      "mensaje-alerta";

    }

  });

}

const listaFavoritas = document.getElementById("listaFavoritas");
const mensajeVacio = document.getElementById("mensajeVacio");
const totalFavoritas = document.getElementById("totalFavoritas");

if (listaFavoritas) {
  const favoritas = JSON.parse(localStorage.getItem("favoritas")) || [];

  if (totalFavoritas) {
    totalFavoritas.textContent = favoritas.length;
  }

  if (favoritas.length === 0) {
    mensajeVacio.style.display = "block";
  } else {
    mensajeVacio.style.display = "none";

    favoritas.forEach(receta => {
      const card = document.createElement("article");
      card.classList.add("tarjeta-receta");

      card.innerHTML = `
        <img src="${receta.imagen}" alt="${receta.titulo}">
        <h3>${receta.titulo}</h3>
        <p>${receta.descripcion}</p>

        <a href="receta.html?id=${receta.id || 'tacos'}">
          Ver receta
        </a>

        <button 
          type="button"
          class="btn-eliminar-favorito"
          data-id="${receta.id || 'tacos'}">
          Quitar de favoritos
        </button>
      `;

      listaFavoritas.appendChild(card);
    });
  }
}



/*Onboarding*/

const onboarding = document.getElementById("onboarding");
const cerrarOnboarding = document.getElementById("cerrarOnboarding");

if(onboarding && cerrarOnboarding){

const onboardingVisto = localStorage.getItem("onboardingVisto");

if(onboardingVisto === "true"){

onboarding.style.display = "none";

}

cerrarOnboarding.addEventListener("click", function(){

onboarding.style.display = "none";

localStorage.setItem("onboardingVisto", "true");

});

}

/*Tamaño de Fuente*/

const botonesFuente = document.querySelectorAll(".btn-fuente");

function aplicarFuente(tamano){
  document.body.classList.remove("fuente-normal", "fuente-grande", "fuente-extra");

  if(tamano === "grande"){
    document.body.classList.add("fuente-grande");
  }else if(tamano === "extra"){
    document.body.classList.add("fuente-extra");
  }else{
    document.body.classList.add("fuente-normal");
  }

  localStorage.setItem("tamanoFuente", tamano);
}

botonesFuente.forEach(boton => {
  boton.addEventListener("click", function(){
    aplicarFuente(this.dataset.size);
  });
});

const fuenteGuardada = localStorage.getItem("tamanoFuente") || "normal";
aplicarFuente(fuenteGuardada);

/*Buscador y Filtros de Receta*/

const buscarRecetaFiltro = document.getElementById("buscarRecetaFiltro");
const filtroCategoria = document.getElementById("filtroCategoria");
const tipoComida = document.getElementById("tipoComida");
const tarjetasRecetas = document.querySelectorAll(".tarjeta-receta");
const mensajeResultados = document.getElementById("mensajeResultados");

function filtrarRecetas(){

if(!buscarRecetaFiltro || !filtroCategoria || !tipoComida || !mensajeResultados){
return;
}

const paramsBusqueda =
new URLSearchParams(window.location.search);

const textoURL =
paramsBusqueda.get("buscar");

if(textoURL && buscarRecetaFiltro.value === ""){
buscarRecetaFiltro.value = textoURL;
}

const categoriaURL =
paramsBusqueda.get("categoria");

const tipoURL =
paramsBusqueda.get("tipo");

if(categoriaURL && filtroCategoria.value === "todo"){
filtroCategoria.value = categoriaURL;
}

if(tipoURL && tipoComida.value === "todo"){
tipoComida.value = tipoURL;
}

const texto = buscarRecetaFiltro.value.toLowerCase();

const categoria = filtroCategoria.value;
const tipo = tipoComida.value;

let totalVisibles = 0;

tarjetasRecetas.forEach(tarjeta => {

const nombre = tarjeta.dataset.nombre || "";
const cat = tarjeta.dataset.categoria || "";
const tipoDato = tarjeta.dataset.tipo || "";

const coincideTexto = nombre.includes(texto);
const coincideCategoria = categoria === "todo" || cat === categoria;
const coincideTipo = tipo === "todo" || tipoDato === tipo;

if(coincideTexto && coincideCategoria && coincideTipo){

tarjeta.style.display = "block";
totalVisibles++;

}else{

tarjeta.style.display = "none";

}

});

if(totalVisibles === 0){

mensajeResultados.textContent =
"No se encontraron recetas con esos filtros.";

mensajeResultados.className =
"estado-error mensaje-resultados";

}else{

mensajeResultados.textContent =
`Se encontraron ${totalVisibles} receta(s).`;

mensajeResultados.className =
"estado-success mensaje-resultados";

}

}

if(buscarRecetaFiltro){
buscarRecetaFiltro.addEventListener("input", filtrarRecetas);
}

if(filtroCategoria){
filtroCategoria.addEventListener("change", filtrarRecetas);
}

if(tipoComida){
tipoComida.addEventListener("change", filtrarRecetas);
}

filtrarRecetas();

const limpiarBusqueda = document.getElementById("limpiarBusqueda");

if(limpiarBusqueda){
  limpiarBusqueda.addEventListener("click", function(){
    buscarRecetaFiltro.value = "";

    const nuevaURL = window.location.pathname;
    window.history.replaceState({}, "", nuevaURL);

    filtrarRecetas();
  });
}

/*Buscador Home*/

const buscarHome = document.getElementById("buscarReceta");

if (buscarHome) {
  const botonBuscarHome = buscarHome.nextElementSibling;

  function enviarBusquedaHome(){
    const texto = buscarHome.value.trim();

    if (texto !== "") {
      window.location.href =
      `recetas.html?buscar=${encodeURIComponent(texto)}`;
    } else {
      buscarHome.focus();
    }
  }

  botonBuscarHome.addEventListener("click", enviarBusquedaHome);

  buscarHome.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
      enviarBusquedaHome();
    }
  });
}

/*Eliminar Favoritos*/

document.addEventListener("click", function(e){

if(e.target.classList.contains("btn-eliminar-favorito")){

const recetaIdEliminar = e.target.dataset.id;

let favoritas =
JSON.parse(localStorage.getItem("favoritas")) || [];

favoritas = favoritas.filter(
receta => receta.id !== recetaIdEliminar
);

localStorage.setItem(
"favoritas",
JSON.stringify(favoritas)
);

guardarActividad(
"❌ Eliminaste una receta de favoritos."
);

location.reload();

}

});

/*Mostrar Actividad*/

const listaActividad =
document.getElementById("listaActividad");

if(listaActividad){

const actividades =
JSON.parse(localStorage.getItem("actividades")) || [];

listaActividad.innerHTML = "";

if(actividades.length === 0){

listaActividad.innerHTML =
"<li>No hay actividad reciente.</li>";

}else{

actividades.forEach(act => {

const li = document.createElement("li");

li.textContent = act;

listaActividad.appendChild(li);

});

}

}
