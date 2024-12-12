const juegosEjemplos = [
    { titulo: "Super Mario Bros. 3", genero: "Plataforma", precio: 800, plataforma: "NES" },
    { titulo: "Ninja Gaiden", genero: "Plataforma", precio: 850, plataforma: "NES" },
    { titulo: "Donkey Kong Country 2", genero: "Aventura", precio: 1500, plataforma: "SNES" },
    { titulo: "Chrono Trigger", genero: "JRPG", precio: 1800, plataforma: "SNES" },
    { titulo: "Sonic 3 & Knuckles", genero: "Aventura", precio: 1500, plataforma: "Sega Genesis" },
    { titulo: "Phantasy Star IV", genero: "JRPG", precio: 1550, plataforma: "Sega Genesis" },
    { titulo: "Comix Zone", genero: "Beat Em Up", precio: 1750, plataforma: "Sega Genesis" },
    { titulo: "Golden Axe", genero: "Beat Em Up", precio: 2000, plataforma: "Arcade" },
    { titulo: "Half Life 2", genero: "Acción", precio: 3200, plataforma: "PC" },
];

let bibliotecaJuegos = JSON.parse(localStorage.getItem("juegos")) || [];

if (bibliotecaJuegos.length === 0) {
    bibliotecaJuegos = juegosEjemplos;
    localStorage.setItem("juegos", JSON.stringify(bibliotecaJuegos));
}

const formAgregar = document.getElementById("form-agregar");
const listaJuegos = document.getElementById("lista-juegos");
const totalJuegos = document.getElementById("total-juegos");
const valorTotal = document.getElementById("valor-total");
const filtroGenero = document.getElementById("filtro-genero");
const btnFiltrar = document.getElementById("btn-filtrar");
const btnRestablecer = document.getElementById("btn-restablecer");

const renderizarJuegos = (juegos) => {
    listaJuegos.innerHTML = "";
    juegos.forEach((juego, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${juego.titulo}</td>
            <td>${juego.genero}</td>
            <td>$${juego.precio}</td>
            <td>${juego.plataforma}</td>
            <td><button onclick="eliminarJuego(${index})">Eliminar</button></td>
        `;
        listaJuegos.appendChild(fila);
    });
    actualizarResumen(juegos);
};

const actualizarResumen = (juegos) => {
    totalJuegos.textContent = juegos.length;
    valorTotal.textContent = juegos.reduce((acc, juego) => acc + parseFloat(juego.precio), 0).toFixed(2);
};

formAgregar.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const genero = document.getElementById("genero").value;
    const precio = document.getElementById("precio").value;
    const plataforma = document.getElementById("plataforma").value;

    bibliotecaJuegos.push({ titulo, genero, precio, plataforma });
    localStorage.setItem("juegos", JSON.stringify(bibliotecaJuegos));

    formAgregar.reset();
    renderizarJuegos(bibliotecaJuegos);
});

const eliminarJuego = (index) => {
    bibliotecaJuegos.splice(index, 1);
    localStorage.setItem("juegos", JSON.stringify(bibliotecaJuegos));
    renderizarJuegos(bibliotecaJuegos);
};

btnFiltrar.addEventListener("click", () => {
    const genero = filtroGenero.value.toLowerCase();
    const juegosFiltrados = bibliotecaJuegos.filter(juego => juego.genero.toLowerCase().includes(genero));
    renderizarJuegos(juegosFiltrados);
});

btnRestablecer.addEventListener("click", () => {
    renderizarJuegos(bibliotecaJuegos);
    filtroGenero.value = "";
});

renderizarJuegos(bibliotecaJuegos);
