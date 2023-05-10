//Rodar quando a página carregar
document.addEventListener('DOMContentLoaded', e => {
    criarEstruturaCartas('facil')
})

//Select personalizado
const select = document.querySelector('.select')
const opcoes = document.querySelectorAll('.opcao')

select.addEventListener('click', (e) => {
    abreFechaSelect()    
})

document.addEventListener('click', e => {
    if(!select.contains(e.target)){
        abreFechaSelect('fechar')
    }
})

opcoes.forEach(opcao => {
    opcao.addEventListener('click', e => {
        alterarNivel(opcao)
    })
})

function abreFechaSelect(e) {
    const selectNivel = document.querySelector('.nivel')
    const listaSuspensa = document.querySelector('.lista-suspensa')

    if(e == 'fechar') {
        if(selectNivel.classList.contains('menu-aberto')){
            selectNivel.classList.remove('menu-aberto')
            listaSuspensa.classList.remove('aberta')
        }
    } else if(selectNivel.classList.contains('menu-aberto')){
        selectNivel.classList.remove('menu-aberto')
        listaSuspensa.classList.remove('aberta')
    } else {
        selectNivel.classList.add('menu-aberto')
        listaSuspensa.classList.add('aberta')
    }
}

function alterarNivel (opcao) {
    const opcaoAtual = document.querySelector('#txtNivel')
    
    if(opcaoAtual.dataset.value != opcao.dataset.value){
        const opcaoMarcada = document.querySelector('.ativa')

        opcaoAtual.dataset.value = opcao.dataset.value
        opcaoAtual.textContent = opcao.textContent
        opcaoMarcada.classList.remove('ativa')
        opcao.classList.add('ativa')

        criarEstruturaCartas(opcaoAtual.dataset.value)
    }
}

function criarEstruturaCartas (nivel) {
    const containerCartas = document.querySelector('.container-cartas')
    let numCarta = (nivel == 'facil') ? 9 : (nivel == 'medio') ? 12 : (nivel == 'dificil') ? 15 : 0
    const arrayDeAlt = [
        'Tomo de feitiços',
        'Chapéu de bruxa',
        'Olho',
        'Boneco de Vodu',
        'Morto-Vivo',
        'Bruxa ao luar voando em sua vassoura',
        'Espantalho com cabeça de abóbora',
        'Caixão aberto com um vampiro',
        'Abóbora acessa',
        'Fantasma',
        'Placa de Halloween',
        'Morcego',
        'Caveira',
        'Convite de Halloween',
        'Múmia'
    ]

    // //Procura o índice da classe que define a dificuldade no container
    if (containerCartas.classList.contains('facil')){
        
        containerCartas.classList.remove('facil')
        containerCartas.classList.add(nivel)
    
    } else if (containerCartas.classList.contains('medio')){
        
        containerCartas.classList.remove('medio')
        containerCartas.classList.add(nivel)
    
    } else if (containerCartas.classList.contains('dificil')){
        
        containerCartas.classList.remove('dificil')
        containerCartas.classList.add(nivel)
    
    } else {
        
        containerCartas.classList.add(nivel)
    
    }
    
    if(numCarta != 0) {
        //Reseta o conteúdo do container
        containerCartas.innerHTML = ''

        for (let i = 0; i < numCarta; i++) {            
            //Carta 01
            let divCarta = document.createElement('div')
            divCarta.classList.add('carta')
            divCarta.classList.add(nivel)
            divCarta.setAttribute('data-value', i+1)
            containerCartas.appendChild(divCarta)
    
            let divFrente = document.createElement('div')
            divFrente.classList.add('face')
            divFrente.classList.add('frente')
            divFrente.textContent = '?'
            divCarta.appendChild(divFrente)
    
            let divTras = document.createElement('div')
            divTras.classList.add('face')
            divTras.classList.add('tras')
            divCarta.appendChild(divTras)
    
            let imgTras = document.createElement('img')
            if (i < 9) {
                imgTras.setAttribute('src', `./src/img/0${i+1}.png`)
            } else {
                imgTras.setAttribute('src', `./src/img/${i+1}.png`)
            }
            imgTras.setAttribute('alt', arrayDeAlt[i])
            divTras.appendChild(imgTras)
    
            //Carta 02
            let divCarta2 = document.createElement('div')
            divCarta2.classList.add('carta')
            divCarta2.classList.add(nivel)
            divCarta2.setAttribute('data-value', i+1)
            containerCartas.appendChild(divCarta2)
    
            let divFrente2 = document.createElement('div')
            divFrente2.classList.add('face')
            divFrente2.classList.add('frente')
            divFrente2.textContent = '?'
            divCarta2.appendChild(divFrente2)
    
            let divTras2 = document.createElement('div')
            divTras2.classList.add('face')
            divTras2.classList.add('tras')
            divCarta2.appendChild(divTras2)
    
            let imgTras2 = document.createElement('img')
            if (i < 9) {
                imgTras2.setAttribute('src', `./src/img/0${i+1}.png`)
            } else {
                imgTras2.setAttribute('src', `./src/img/${i+1}.png`)
            }
            imgTras2.setAttribute('alt', arrayDeAlt[i])
            divTras2.appendChild(imgTras2)
        }
    }

    adicionarEscutasCartas()
    embaralharCartas()
}

function adicionarEscutasCartas () {
    const cartas = document.querySelectorAll('.carta')

    cartas.forEach(carta => {
        carta.addEventListener('click', e => {
            if(!carta.classList.contains('flip')){
                carta.classList.toggle('flip')

                viradas.push(carta)
                if(viradas.length == 2) {
                    setTimeout(() => {
                        compararViradas()
                    }, 800);
                }
            }
        })
    })
}

function embaralharCartas () {
    const cartas = document.querySelectorAll('.carta')

    for (let i = cartas.length-1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * i)
        let pote

        pote = cartas[i].innerHTML
        cartas[i].innerHTML = cartas[randomIndex].innerHTML
        cartas[randomIndex].innerHTML = pote

        pote = cartas[i].dataset.value
        cartas[i].dataset.value = cartas[randomIndex].dataset.value
        cartas[randomIndex].dataset.value = pote
    }
}

var score = 0
var viradas = []

function compararViradas () {
    let carta1 = viradas[0]
    let carta2 = viradas[1]
    let tras1 = carta1.querySelector('.tras')
    let tras2 = carta2.querySelector('.tras')

    if(carta1.dataset.value != carta2.dataset.value) {
        carta1.classList.remove('flip')
        carta2.classList.remove('flip')
    } else {
        const totalCartas = document.querySelectorAll('.carta')
        score++
        if(score == totalCartas.length/2){
            abrirFecharModal('abrir')
        }
        tras1.classList.add('acertada')
        tras2.classList.add('acertada')
    }
    viradas = []
}

function retornarEstadoCartas () {
    const cartas = document.querySelectorAll('.carta')

    //Se o usuário clicar em jogar novamente no modal, ele reseta o estado das cartas e embaralha
    cartas.forEach(carta => {
        if(carta.classList.contains('flip')){
            const tras = carta.querySelector('.tras')
            carta.classList.remove('flip')
            tras.classList.remove('acertada')
        }
    })
}

//Modal
const containerModal = document.querySelector('.container-modal')
const modal = document.querySelector('.modal')
const btnJogNov = document.querySelector('.jogar-novamente')
const btnFecharMod = document.querySelector('.fechar-modal')

containerModal.addEventListener('click', e => {
    if(!modal.contains(e.target)){
        abrirFecharModal('fechar')
    }
})

btnFecharMod.addEventListener('click', e => {
    abrirFecharModal('fechar')
})

btnJogNov.addEventListener('click', e => {
    abrirFecharModal('fechar')
    retornarEstadoCartas()
    embaralharCartas()
})

function abrirFecharModal (comando) {
    if (comando == 'abrir') {
        containerModal.style.display = 'flex'
        modal.classList.add('abrir')
        setTimeout(() => {
            modal.classList.remove('abrir')
        }, 1000);
    } else if (comando == 'fechar'){
        modal.classList.add('fechar')
        setTimeout(() => {
            modal.classList.remove('fechar')
            containerModal.style.display = 'none'
        }, 800);
    }
}