let nome;
let mensagens = [];
let usuario = [];
let texto;

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
    console.log(usuario);
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
    console.log('oi!');
}
function renderizaMensagens(resposta)
{
    mensagens = resposta.data;
    
    let lista = document.querySelector('ul');
    lista.innerHTML = '';
    
    for(let i = 0 ; i < mensagens.length-1 ; i++)
    {
        if     (mensagens[i].type === 'status')         {lista.innerHTML += `<li class="status"><p>(${mensagens[i].time})</p> <h1>${mensagens[i].from}</h1> <h2>${mensagens[i].text}</h2></li>`;}
        else if(mensagens[i].type === 'message')        {lista.innerHTML += `<li class="message"><p>(${mensagens[i].time})</p> <h1>${mensagens[i].from}</h1> <h2>${mensagens[i].text}</h2></li>`;}
        else if(mensagens[i].type === 'private_message'){lista.innerHTML += `<li class="private"><p>(${mensagens[i].time})</p> <h1>${mensagens[i].from}</h1> <h2>${mensagens[i].text}</h2></li>`;}
    }
        
    if     (mensagens[mensagens.length-1].type === 'status')         {lista.innerHTML += `<li class="status last"><p>(${mensagens[mensagens.length-1].time})</p> <h1>${mensagens[mensagens.length-1].from}</h1> <h2>${mensagens[mensagens.length-1].text}</h2></li>`;}
    else if(mensagens[mensagens.length-1].type === 'message')        {lista.innerHTML += `<li class="message last"><p>(${mensagens[mensagens.length-1].time})</p> <h1>${mensagens[mensagens.length-1].from}</h1> <h2>${mensagens[mensagens.length-1].text}</h2></li>`;}
    else if(mensagens[mensagens.length-1].type === 'private_message'){lista.innerHTML += `<li class="private last"><p>(${mensagens[mensagens.length-1].time})</p> <h1>${mensagens[mensagens.length-1].from}</h1> <h2>${mensagens[mensagens.length-1].text}</h2></li>`;}

    const ultimo = document.querySelector('.last');
    ultimo.scrollIntoView();
}
function enviaTexto()
{
    let comentario = {
        from: `${nome}`,
        text: `${texto}`,
        time: "666",
        to: "todos",
        type: "message" 
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
function nomeCerto(){
    console.log("Seu nome está livre meu amigo!");
}
function nomeErrado(){
    alert("Esse nome já está em uso!");
    postUsuario();    
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



 
