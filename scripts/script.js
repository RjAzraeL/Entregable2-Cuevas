document.addEventListener('DOMContentLoaded', () => {
    const formularioCalculadora = document.getElementById('formularioCalculadora');
    const elementoResultado = document.querySelector('#resultado span');

    formularioCalculadora.addEventListener('click', (evento) => {
        if (evento.target.classList.contains('operacion')) {
            const numero1 = parseFloat(document.getElementById('numero1').value);
            const numero2 = parseFloat(document.getElementById('numero2').value);
            const operacion = evento.target.getAttribute('data-op');

        if (isNaN(numero1) || isNaN(numero2)) {
            elementoResultado.textContent = 'Tenes que ingresar al menos dos valores'; return;
        }

        let resultado; switch (operacion) {
            case 'sumar': resultado = numero1 + numero2; break;
            case 'restar': resultado = numero1 - numero2; break;
            case 'multiplicar': resultado = numero1 * numero2; break;
            case 'dividir': resultado = numero1 / numero2; break;
            case 'porcentaje': resultado = (numero1 / 100) * numero2; break;
        }
            elementoResultado.textContent = resultado;
        }
    });
});
