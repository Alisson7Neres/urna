let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-rigth');
let numeros = document.querySelector('.d-1-3');

// Variáveis de COntrole de Ambiente
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votoNulo = false;
let votos = [];

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';

    numero = '';
    votoBranco = false;
    votoNulo = false;

    for(let cont = 0; cont < etapa.numeros; cont++) {
        if(cont === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

     seuVotoPara.style.display = 'none';
     cargo.innerHTML = etapa.titulo;
     descricao.innerHTML = '';
     aviso.style.display = 'none';
     lateral.innerHTML = '';
     numeros.innerHTML = numeroHtml;
    
}

function atualizarInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => { 
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>`;
        let fotosHTML = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHTML += `<div class="d-1-image small"><img src="img/${candidato.fotos[i].url}" 
                alt=""/>${candidato.fotos[i].legendas}</figure></div>`;
            } else {
                fotosHTML += `<div class="d-1-image"><img src="img/${candidato.fotos[i].url}" 
                alt=""/>${candidato.fotos[i].legendas}</figure></div>`;
            }
        }
        lateral.innerHTML = fotosHTML;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grade pisca">VOTO NULO</div>';
        votoNulo = true;
    }
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero != null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;
        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling != null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizarInterface();
        }
    }
}

function branco() {
    if(numero === '') {
        votoBranco = true;
        numero = '';
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        lateral.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    } else {
        alert("Para votar em BRANCO, não pode ter digitado nenhum número!");
    }
}

function corrige() {
    comecarEtapa();
}
function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    if(votoBranco) {
        votoConfirmado = true;
       votos.push({
           etapa: etapas[etapaAtual].titulo,
           voto: 'branco'
       });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
       if(votoNulo) {
           votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'nulo'
           });
       } else {
           votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
           });
       }
    } 
    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div:';
            console.log(votos);
        }
    }
}

comecarEtapa();