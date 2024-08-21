const urlBase = 'https://swapi.dev/api/';

// Función para obtener datos de un recurso específico
async function obtenerDatos(recurso) {
    try {
        const respuesta = await fetch(`${urlBase}${recurso}/`);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Función para mostrar los personajes
async function mostrarPersonajes(filtro = '') {
    const datos = await obtenerDatos('people');
    const listaPersonajes = document.getElementById('listaPersonajes');
    listaPersonajes.innerHTML = '';
    datos.results
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
    datos.results
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
    datos.results
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
