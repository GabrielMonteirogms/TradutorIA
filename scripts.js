/* 
    Lógica de Programação
        -Falar a Linguagem do computador
    Algoritmo
        -"Receita de bolo" = Os passos na sequência certa

    JavaScript
        - Variáveis - Pedaço da memória do computador, aonde voce guarda oque quiser
        - Funções - Pedaço de código que só executa quando eu chamo 
        - Como se comunicar com o  HTML
                Manipular a DOM

    [x]  Saber quando o botão foi clicado
    [x] Pegar o texto que o usuário digitou
    [ ] Mando para o servidor traduzir
    [ ] Receber a resposta do servidor (tradução)
    [ ] Coloco o texto na tela

    // JS - scripts
    // HTML - document

    padrão = https://api.mymemory.translated.net/get?q=Hello World!
    traduzir = &langpair=pt_br|en

    fetch = ferramenta do JS para entrar em contato com o servidor

    await = (espere)  - obrigatorio usar async ( async & await) - usar async na função
    json - formato mais amigavel
*/

// pegando o texto dentro do text area no HTML
let inputTexto = document.querySelector(".input-texto")

let reconhecimento;

function ouvirAudio() {

  // verifica suporte do navegador
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Seu navegador não suporta reconhecimento de voz 😢");
    return;
  }

  // cria o reconhecimento
  reconhecimento = new SpeechRecognition();
  reconhecimento.lang = "pt-BR";
  reconhecimento.continuous = false;
  reconhecimento.interimResults = false;

  // quando começar a ouvir
  reconhecimento.onstart = () => {
    console.log("🎤 Ouvindo...");
  };

  // quando receber o áudio convertido em texto
  reconhecimento.onresult = (event) => {
    const textoFalado = event.results[0][0].transcript;

    console.log("Texto falado:", textoFalado);

    // joga o texto no textarea
    inputTexto.value = textoFalado;

    traduzir();
  };

  // erro
  reconhecimento.onerror = (event) => {
    console.error("Erro no áudio:", event.error);
  };

  // começa a ouvir
  reconhecimento.start();
}



async function traduzir(){

inputTexto.blur();

    // endereço do servidor com o texto que que quero traduzir
    let endereco = "https://api.mymemory.translated.net/get?q=" 
    + inputTexto.value
    + "&langpair=pt-BR|en"

    // resposta servidor
    let resposta = await fetch(endereco)

    //converto a resposta para um formato mais amigavel
    let dados = await resposta.json()
    
    console.log(dados);

    CampoTraducao.innerText = dados.responseData.translatedText;


}
let CampoTraducao = document.querySelector(".traducao")


 


// clicou no botão -> chamar função -> montar endereço -> chamo o servido -> peço esperar -> responde
