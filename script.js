criarEstrelas();

function criarEstrelas() {
    const estrelas = document.getElementById('estrelas_1');
    const qtdEstrelas = 100;

    for (let i = 0; i < qtdEstrelas; i++) {
        const estrela = document.createElement('div');
        estrela.classList.add('estrela');
        estrela.style.left = `${Math.random() * 100}%`;
        estrela.style.top = `${Math.random() * 340}%`;
        estrela.style.animationDelay = `${Math.random() * 2}s`;
        estrelas.appendChild(estrela);
    }
}

criarEstrelas();

function Verificagem() {
    /* Direcionamento de arquivos para a adaptação para celular */

    if (window.innerWidth <= 600) {
        window.location.href = "main_phone_2.html";
    }
    else {
        window.location.href = "main_2.html";
    }
}

