const urlBase = 'https://swapi.dev/api/';

// Función para obtener todos los datos con paginación
async function obtenerDatos(recurso) {
    let datosCompletos = [];
    let url = `${urlBase}${recurso}/`;
    try {
        while (url) {
            const respuesta = await fetch(url);
            const datos = await respuesta.json();
            datosCompletos = datosCompletos.concat(datos.results);
            url = datos.next; // Actualiza la URL para la siguiente página
        }
        return datosCompletos;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Función para mostrar los personajes
async function mostrarPersonajes(filtro = '') {
    const datos = await obtenerDatos('people');
    const personajescontainer = document.querySelector('.container-personajes');
    personajescontainer.innerHTML = '';
    datos
        .filter(personaje => personaje.name.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(personaje => {
            const card = document.createElement('div');
            card.className="card"
            card.innerHTML = `
            <div class="content">
                <img src="https://starwars-visualguide.com/assets/img/characters/${obtenerId(personaje.url)}.jpg" alt="${personaje.name}">
                <p>Nombre:</p> ${personaje.name}<br>
                <p>Altura:</p> ${personaje.height} cm<br>
                <p>Peso:</p> ${personaje.mass} kg<br>
            </div>`;
            personajescontainer.appendChild(card);
        });
}

// Función para mostrar los planetas
async function mostrarPlanetas(filtro = '') {
    const datos = await obtenerDatos('planets');
    const planetascontainer = document.querySelector('.container-planetas');
    planetascontainer.innerHTML = '';
    datos
        .filter(planeta => planeta.name.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(planeta => {
            const card = document.createElement("div");
            card.className = "card"
            card.innerHTML = `
            <div class="content">
            <img src="https://starwars-visualguide.com/assets/img/planets/${obtenerId(planeta.url)}.jpg" alt="${planeta.name}">
                <p>Nombre:</p> ${planeta.name}
                <p>Clima:</p> ${planeta.climate}
                <p>Terreno:</p> ${planeta.terrain}
            </div>
                `;
            planetascontainer.appendChild(card);
        });
}

// Función para mostrar las naves estelares
async function mostrarNaves(filtro = '') {
    const datos = await obtenerDatos('starships');
    const navescontainer = document.querySelector('.container-naves');
    navescontainer.innerHTML = '';
    datos
        .filter(nave => nave.name.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(nave => {
            const card = document.createElement('div');
            card.className = "card"
            card.innerHTML = `
            <div class="content ">
                <img src="https://starwars-visualguide.com/assets/img/starships/${obtenerId(nave.url)}.jpg" alt="${nave.name}">
                <p>Nombre:</p> ${nave.name}
                <p>Modelo:</p> ${nave.model}
                <p>Fabricante:</p> ${nave.manufacturer}
                </div>`;
            navescontainer.appendChild(card);
        });
}

//funcion para mostrar los vehiculos 
async function mostrarVehiculos(filtro = '') {
    const datos = await obtenerDatos('vehicles');
    const vehiculoscontainer = document.querySelector('.container-vehiculos');
    vehiculoscontainer.innerHTML = '';
    datos
        .filter(vehiculo => vehiculo.name.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(vehiculo => {
            const card = document.createElement('div');
            card.className = "card"
            card.innerHTML = `
            <div class= "content"
                <img src="https://starwars-visualguide.com/assets/img/vehicles/${obtenerId(vehiculo.url)}.jpg" alt="${vehiculo.name}">
                <p>Nombre:</p> ${vehiculo.name}
                <p>Modelo:</p> ${vehiculo.model}
                <p>Fabricante:</p> ${vehiculo.manufacturer}
            </div>
                `;
            vehiculoscontainer.appendChild(card);
        });
}
//funcion para mostrar las especies 
async function mostrarEspecies(filtro = '') {
    const datos = await obtenerDatos('species');
    const especiescontainer = document.querySelector('.container-especies');
    especiescontainer.innerHTML = '';
    datos
        .filter(especie => especie.name.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(especie => {
            const card = document.createElement('div');
            card.className = "card"
            card.innerHTML = `
            <div class="content">
            <img src="https://starwars-visualguide.com/assets/img/species/${obtenerId(especie.url)}.jpg" alt="${especie.name}">
                <p>Nombre:</p> ${especie.name}
                <p>Clasificación:</p> ${especie.classification}
                <p>Designación:</p> ${especie.designation}
            </div>`;
            especiescontainer.appendChild(card);
        });
}

//funcion para mostrar las películas 

async function mostrarPeliculas(filtro = '') {
    const datos = await obtenerDatos('films');
    const peliculascontainer = document.querySelector('.container-peliculas');
    peliculascontainer.innerHTML = '';
    datos
        .filter(pelicula => pelicula.title.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(pelicula => {
            const card = document.createElement('div');
            card.className = "card"
            card.innerHTML = `
            <div class="content">
                <img src="https://starwars-visualguide.com/assets/img/films/${obtenerId(pelicula.url)}.jpg" alt="${pelicula.title}">
                <p>Título:</p> ${pelicula.title}
                <p>Director:</p> ${pelicula.director}
                <p>Productor:</p> ${pelicula.producer}
                <p>Fecha de estreno:</p> ${pelicula.release_date}
            </div>
                `;
            peliculascontainer.appendChild(card);
        });
}


// Función para mostrar la sección seleccionada
function mostrarSeccion(seccion) {
    const secciones = document.querySelectorAll('section');
    secciones.forEach(sec => {
        sec.style.display = sec.id === seccion ? 'flex' : 'none';
    });
    switch (seccion) {
        case 'personajes':
            mostrarPersonajes();
            break;
        case 'planetas':
            mostrarPlanetas();
            break;
        case 'naves':
            mostrarNaves();
            break;
        case 'vehiculos':
            mostrarVehiculos();
            break;
        case 'especies':
            mostrarEspecies();
            break;
        case 'peliculas':
            mostrarPeliculas();
            break;
    }
}


// Función para obtener el ID del recurso desde su URL
function obtenerId(url) {
    const partes = url.split('/');
    return partes[partes.length - 2];
}

// Función para filtrar los resultados
document.getElementById('busqueda').addEventListener('input', function () {
    const filtro = this.value;
    const seccionVisible = document.querySelector('section[style="display: block;"]');
    if (seccionVisible) {
        switch (seccionVisible.id) {
            case 'personajes':
                mostrarPersonajes(filtro);
                break;
            case 'planetas':
                mostrarPlanetas(filtro);
                break;
            case 'naves':
                mostrarNaves(filtro);
                break;
        }
    }
});

// Mostrar por defecto la sección de personajes
mostrarSeccion('personajes');
