let nome;
let mensagens = [];
let usuario = [];
let texto;
let x =0;
let para = 'Todos';
let tipo = 'message';
let comentario;
let tipo2;

setInterval(postMensagens, 3000);

function postUsuario()
{
    
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',
    {
        name: `${nome}`  
    });
    promessa.then(nomeCerto);
    promessa.catch(nomeErrado);
}
function getUsuario()
{
    const promessa3 = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa3.then(recebeUsuario);
}
function recebeUsuario(resposta)
{
    usuario = resposta.data;

    let lista2 = document.querySelector('.participantes');
    lista2.innerHTML = 
        `<li onclick="selecionado(this)">
            <ion-icon name="checkmark"></ion-icon>
            <ion-icon name="people"></ion-icon>
            <span>Todos</span>
        </li>`;

    for(let i = 0 ; i < usuario.length ; i++)
    {
        lista2.innerHTML += 
        `<li onclick="selecionado(this)">
            <ion-icon name="checkmark"></ion-icon>
            <ion-icon name="person-circle"></ion-icon>
            <span>${usuario[i].name}</span>
        </li>`;
    }
}
function postMensagens()
{
    const promessa2 = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa2.then(renderizaMensagens);
}
function statusOn()
{
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status ',
    {
        name: `${nome}`
    });
}
function renderizaMensagens(resposta)
{
    mensagens = resposta.data;
    
    let lista = document.querySelector('ul');
    lista.innerHTML = '';
    
    for(let i = 0 ; i < mensagens.length-1 ; i++)
    {
        if     (mensagens[i].type === 'status')
        {lista.innerHTML += 
            `<li class="status"> 
                <p>                    (${mensagens[i].time})
                <span class="pretobold">${mensagens[i].from}</span>
                <span class="preto">    ${mensagens[i].text}</span>
                </p>
                </li>`;
        }
        else if(mensagens[i].type === 'message')
        {lista.innerHTML += 
            `<li class="message">
                <p>                    (${mensagens[i].time})
                <span class="pretobold">${mensagens[i].from}</span>     
                <span class="preto">    para    </span>
                <span class="pretobold">${mensagens[i].to}:</span>
                <span class="preto">    ${mensagens[i].text}</span>
                </p>
                </li>`;
        }
        else if(mensagens[i].type === 'private_message')
        {lista.innerHTML += 
            `<li class="private">
                <p>                    (${mensagens[i].time})
                <span class="pretobold">${mensagens[i].from}</span>     
                <span class="preto">    reservadamente para </span>
                <span class="pretobold">${mensagens[i].to}:</span>
                <span class="preto">    ${mensagens[i].text}</span>
                </p>
                </li>`;
        }
    }
        
    if     (mensagens[mensagens.length-1].type === 'status')
    {lista.innerHTML += 
        `<li class="status last"> 
            <p>                    (${mensagens[mensagens.length-1].time})
            <span class="pretobold">${mensagens[mensagens.length-1].from}</span>
            <span class="preto">    ${mensagens[mensagens.length-1].text}</span>
            </p>
            </li>`;
    }
    else if(mensagens[mensagens.length-1].type === 'message')        
    {lista.innerHTML += 
        `<li class="message last">
            <p>                    (${mensagens[mensagens.length-1].time})
            <span class="pretobold">${mensagens[mensagens.length-1].from}</span>     
            <span class="preto">    para    </span>
            <span class="pretobold">${mensagens[mensagens.length-1].to}:</span>
            <span class="preto">    ${mensagens[mensagens.length-1].text}</span>
            </p>
            </li>`;
    }
    else if(mensagens[mensagens.length-1].type === 'private_message')
    {lista.innerHTML += 
        `<li class="private last">
            <p>                    (${mensagens[mensagens.length-1].time})
            <span class="pretobold">${mensagens[mensagens.length-1].from}</span>     
            <span class="preto">    reservadamente para </span>
            <span class="pretobold">${mensagens[mensagens.length-1].to}:</span>
            <span class="preto">    ${mensagens[mensagens.length-1].text}</span>
            </p>
            </li>`;
    }

    const ultimo = document.querySelector('.last');
    ultimo.scrollIntoView();
}
function enviaTexto()
{
    comentario = {
        from: `${nome}`,
        text: `${texto}`,
        time: "666",
        to: `${para}`,
        type: `${tipo}` 
    }
    
    const aux = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', comentario);
    aux.then(postMensagens);
}
function tecladoTeste(elemento)
{
    if(elemento.innerHTML === 'Entrar')
    { 
        const teclado2 = document.querySelector('.teclado2');
        nome = teclado2.value; 
        postUsuario();
        document.querySelector('.entrada').classList.add('esconde');
        teclado2.value = "";
        setTimeout(postMensagens, 400);
        setInterval(statusOn, 5000);
    } else {
        const teclado = document.querySelector('.teclado');
        texto = teclado.value; 
        teclado.value = "";
        enviaTexto();
    }
}
function toggleSide()
{
    const barralateral = document.querySelector('.side');
    barralateral.classList.toggle('deslizaBarra');

    const escrevendo = document.querySelector('.enviando');
    escrevendo.innerHTML = `Enviando para ${para} (${tipo2})`;
}
function nomeCerto(){
    console.log("Seu nome está livre meu amigo!");
}
function nomeErrado(){
    alert("Esse nome já está em uso!");
    document.location.reload(true);
}
function selecionado(elemento)
{
    //procura qm tem o bot .check
    const botao = document.querySelector(".participantes .check");
    //se ninguem tem ele n entra, se tiver, ele entra e remove
    if(botao !== null)
    {
        botao.classList.remove("check");
    }
    //adiciona o check no botao clicado
    elemento.classList.add("check");
    para = document.querySelector(".check span").innerHTML;
}
function selecionado2(elemento)
{
    //procura qm tem o bot .check
    const botao = document.querySelector(".modo .check");
    //se ninguem tem ele n entra, se tiver, ele entra e remove
    if(botao !== null)
    {
        botao.classList.remove("check");
    }
    //adiciona o check no botao clicado
    elemento.classList.add("check");

    const teste2 = document.querySelector('.modo .check span').innerHTML;
    if(teste2 === 'Público')
    {
        tipo = 'message';
        tipo2 = 'Público';

    }
    else
    {
        tipo = 'private_message';
        tipo2 = 'Reservadamente';
    }
}
const teclado = document.querySelector('.teclado');
const teclado2 = document.querySelector('.teclado2');
teclado.addEventListener('keyup', e=> 
{
    if(e.keyCode === 13)
    {
        texto = teclado.value; 
        teclado.value = "";
        enviaTexto();
    }
});
teclado2.addEventListener('keyup', e=> 
{
    if(e.keyCode === 13)
    {
        nome = teclado2.value; 
        postUsuario();
        document.querySelector('.entrada').classList.add('esconde');
        teclado2.value = "";
        setTimeout(postMensagens, 400);
        setInterval(statusOn, 5000);
    }
});





 
