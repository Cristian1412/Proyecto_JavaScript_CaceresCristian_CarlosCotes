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
    const listaPersonajes = document.getElementById('listaPersonajes');
    listaPersonajes.innerHTML = '';
    datos
        .filter(personaje => personaje.name.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(personaje => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Nombre:</strong> ${personaje.name}<br>
                <strong>Altura:</strong> ${personaje.height} cm<br>
                <strong>Peso:</strong> ${personaje.mass} kg<br>
                <img src="https://starwars-visualguide.com/assets/img/characters/${obtenerId(personaje.url)}.jpg" alt="${personaje.name}">
            `;
            listaPersonajes.appendChild(li);
        });
}

// Función para mostrar los planetas
async function mostrarPlanetas(filtro = '') {
    const datos = await obtenerDatos('planets');
    const listaPlanetas = document.getElementById('listaPlanetas');
    listaPlanetas.innerHTML = '';
    datos
        .filter(planeta => planeta.name.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(planeta => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Nombre:</strong> ${planeta.name}<br>
                <strong>Clima:</strong> ${planeta.climate}<br>
                <strong>Terreno:</strong> ${planeta.terrain}<br>
                <img src="https://starwars-visualguide.com/assets/img/planets/${obtenerId(planeta.url)}.jpg" alt="${planeta.name}">
            `;
            listaPlanetas.appendChild(li);
        });
}

// Función para mostrar las naves estelares
async function mostrarNaves(filtro = '') {
    const datos = await obtenerDatos('starships');
    const listaNaves = document.getElementById('listaNaves');
    listaNaves.innerHTML = '';
    datos
        .filter(nave => nave.name.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(nave => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Nombre:</strong> ${nave.name}<br>
                <strong>Modelo:</strong> ${nave.model}<br>
                <strong>Fabricante:</strong> ${nave.manufacturer}<br>
                <img src="https://starwars-visualguide.com/assets/img/starships/${obtenerId(nave.url)}.jpg" alt="${nave.name}">
            `;
            listaNaves.appendChild(li);
        });
}

//funcion para mostrar los vehiculos 
async function mostrarVehiculos(filtro = '') {
    const datos = await obtenerDatos('vehicles');
    const listaVehiculos = document.getElementById('listaVehiculos');
    listaVehiculos.innerHTML = '';
    datos
        .filter(vehiculo => vehiculo.name.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(vehiculo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Nombre:</strong> ${vehiculo.name}<br>
                <strong>Modelo:</strong> ${vehiculo.model}<br>
                <strong>Fabricante:</strong> ${vehiculo.manufacturer}<br>
                <img src="https://starwars-visualguide.com/assets/img/vehicles/${obtenerId(vehiculo.url)}.jpg" alt="${vehiculo.name}">
            `;
            listaVehiculos.appendChild(li);
        });
}
//funcion para mostrar las especies 
async function mostrarEspecies(filtro = '') {
    const datos = await obtenerDatos('species');
    const listaEspecies = document.getElementById('listaEspecies');
    listaEspecies.innerHTML = '';
    datos
        .filter(especie => especie.name.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(especie => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Nombre:</strong> ${especie.name}<br>
                <strong>Clasificación:</strong> ${especie.classification}<br>
                <strong>Designación:</strong> ${especie.designation}<br>
                <img src="https://starwars-visualguide.com/assets/img/species/${obtenerId(especie.url)}.jpg" alt="${especie.name}">
            `;
            listaEspecies.appendChild(li);
        });
}

//funcion para mostrar las películas 

async function mostrarPeliculas(filtro = '') {
    const datos = await obtenerDatos('films');
    const listaPeliculas = document.getElementById('listaPeliculas');
    listaPeliculas.innerHTML = '';
    datos
        .filter(pelicula => pelicula.title.toLowerCase().includes(filtro.toLowerCase()))
        .forEach(pelicula => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Título:</strong> ${pelicula.title}<br>
                <strong>Director:</strong> ${pelicula.director}<br>
                <strong>Productor:</strong> ${pelicula.producer}<br>
                <strong>Fecha de estreno:</strong> ${pelicula.release_date}<br>
                <img src="https://starwars-visualguide.com/assets/img/films/${obtenerId(pelicula.url)}.jpg" alt="${pelicula.title}">
            `;
            listaPeliculas.appendChild(li);
        });
}


// Función para mostrar la sección seleccionada
function mostrarSeccion(seccion) {
    const secciones = document.querySelectorAll('section');
    secciones.forEach(sec => {
        sec.style.display = sec.id === seccion ? 'block' : 'none';
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
