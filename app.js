let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMensageminicial();

function exibirTextoNaTela(tag, texto){   
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});    
}

function exibirMensageminicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto' );
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10' );
}

function verificarChute(){
    let valorChute = document.querySelector('input').value;
    if( valorChute == numeroSecreto){        
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas =`Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;        
        exibirTextoNaTela('p', mensagemTentativas); 
        document.getElementById('reiniciar').removeAttribute('disabled')               
    }else{
        if(valorChute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor!');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior!');
        } 
        tentativas++;
        limparCampo('input');       
    }    
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementossNaLista = listaNumerosSorteados.length;

    if(quantidadeDeElementossNaLista == numeroLimite){
        listaNumerosSorteados = [];
    }

    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{        
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo('input');
    exibirMensageminicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function limparCampo(tag){
    let campo = document.querySelector(tag);
    campo.value = '';
}