const diccionario = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

function encriptar() {
    let texto = document.getElementById('textoEntrada').value.toLowerCase();
    let resultado = texto.replace(/[eioua]/g, letra => diccionario[letra]);
    mostrarResultado(resultado);
}

function desencriptar() {
    let texto = document.getElementById('textoEntrada').value.toLowerCase();
    let resultado = texto;
    for (let [key, value] of Object.entries(diccionario)) {
        resultado = resultado.replace(new RegExp(value, 'g'), key);
    }
    mostrarResultado(resultado);
}

function mostrarResultado(texto) {
    document.getElementById('no-message').style.display = 'none';
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('resultado').innerText = texto;
    document.getElementById('copyBtn').style.display = 'block';
}

function copiar() {
    const resultado = document.getElementById('resultado');
    const texto = resultado.innerText;

    if (!texto) {
        alert('No hay texto para copiar');
        return;
    }

    navigator.clipboard.writeText(texto)
        .then(() => alert('Texto copiado al portapapeles'))
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
            copiarManualmente(resultado);
        });
}

function copiarManualmente(elemento) {
    const seleccion = window.getSelection();
    const rango = document.createRange();
    rango.selectNodeContents(elemento);
    seleccion.removeAllRanges();
    seleccion.addRange(rango);
    
    try {
        const exitoso = document.execCommand('copy');
        if (exitoso) {
            alert('Texto copiado al portapapeles');
        } else {
            throw new Error('No se pudo copiar el texto');
        }
    } catch (err) {
        console.error('Error al copiar el texto: ', err);
        alert('No se pudo copiar el texto. Por favor, cópialo manualmente.');
    } finally {
        seleccion.removeAllRanges();
    }
}

document.getElementById('textoEntrada').addEventListener('input', function() {
    this.value = this.value.toLowerCase().replace(/[^a-z\s]/g, '');
});