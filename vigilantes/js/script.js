(function () {
  const FPS = 1;
  let gameDimensions = [1243, 960];
  let box = [1243, 56];
  let focoDimensions = [100, 130];
  let lifeDimensions = [100, 54];
  let scoreDimensions = [621, 54];
  let probFoco = 25;
  let probCaveira = 5;
  let reserva;
  let focos = [];
  let caveiras = [];
  let devastacoes = [];
  let gameLoop;
  let scoreAtual;
  let fire = 0;
  let skull = 0;

  function init() {
    box = new Box();
    scoreAtual = 0;
    pontos = new Pontos(scoreAtual);
    for (var i = 0; i < 5; i++) {
      vida = new Vida(i);
    }
    reserva = new Reserva();
    gameLoop = setInterval(run, 1000 / FPS);
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === "o") {
      clearInterval(gameLoop);
    }
  });

  class Vida {
    constructor(i) {
      this.element = document.createElement("div");
      this.element.className = "vida";
      this.element.style.width = `${lifeDimensions[0]}px`;
      this.element.style.height = `${lifeDimensions[1]}px`;
      this.element.style.left = `${i * lifeDimensions[1]}px`;
      this.element.style.top = 0;
      this.element.style.display = "inline-block";
      box.element.appendChild(this.element);
    }
  }

  class Box {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "caixa";
      this.element.style.width = `${box[0]}px`;
      this.element.style.height = `${box[1]}px`;
      this.element.style.left = 0;
      this.element.style.top = 0;
      this.element.style.position = "absolute";
      document.body.appendChild(this.element);
    }
  }
  class Pontos {
    constructor(scoreAtual) {
      this.element = document.createElement("div");
      this.element.className = "pontos";
      this.element.textContent = "Score: " + `${scoreAtual}`;
      this.element.style.width = `${scoreDimensions[0]}px`;
      this.element.style.height = `${scoreDimensions[1]}px`;
      this.element.style.top = 0;
      this.element.style.left = "622px";
      box.element.appendChild(this.element);
    }
    setPontos(scoreAtual) {
      this.element.textContent = "Score: " + `${scoreAtual}`;
    }
  }
  class Reserva {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      document.body.appendChild(this.element);
    }
  }

  class FocoIncendio {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "foco-incendio";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      this.element.style.left = `${Math.floor(
        Math.random() * (gameDimensions[0] - focoDimensions[0])
      )}px`;
      this.element.style.top = `${Math.floor(
        Math.random() * (gameDimensions[1] - focoDimensions[1])
      )}px`;
      reserva.element.appendChild(this.element);
    }
  }

  class Devastacao {
    constructor(width, height, top, left) {
      this.element = document.createElement("div");
      this.element.className = "devastacao";
      this.element.style.width = width;
      this.element.style.height = height;
      this.element.style.left = left;
      this.element.style.top = top;
      reserva.element.appendChild(this.element);
    }
  }

  class FocoCaveira {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "foco-caveira";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      this.element.style.left = `${Math.floor(
        Math.random() * (gameDimensions[0] - focoDimensions[0])
      )}px`;
      this.element.style.top = `${Math.floor(
        Math.random() * (gameDimensions[1] - focoDimensions[1])
      )}px`;
      reserva.element.appendChild(this.element);
    }
  }

  window.addEventListener("mousedown", function (event) {
    if (event.target.className === "foco-incendio") {
      let width = event.target.style.width;
      let height = event.target.style.width;
      let left = event.target.style.left;
      let top = event.target.style.top;
      event.target.remove();
      scoreAtual += 10;
      pontos.setPontos(scoreAtual);
      check(width, height, left, top);
    }
    if (event.target.className === "foco-caveira") {
      let width = event.target.style.width;
      let height = event.target.style.width;
      let left = event.target.style.left;
      let top = event.target.style.top;
      event.target.remove();
      scoreAtual += 10;
      pontos.setPontos(scoreAtual);
      check(width, height, left, top);
    }
  });

  function check(width, height, top, left) {
    if (skull === 1) {
      console.log("Gerou caveira devastação");
      devastacao = new Devastacao(width, height, top, left);
      devastacoes.push(devastacao);
      skull = 0;
    }
    if (fire === 1) {
      devastacao = new Devastacao(width, height, top, left);
      devastacoes.push(devastacao);
      console.log("Gerar devastação");
      fire = 0;
    }
    console.log("DEPOIS DA FUNCAO CHECK");
    console.log("FOGO: ", fire);
    console.log("SKULL", skull);
  }

  function run() {
    console.log("Antes da função check");
    console.log("FOGO: ", fire);
    console.log("SKULL", skull);
    if (Math.random() * 100 < probFoco) {
      let foco = new FocoIncendio();
      focos.push(foco);
      fire = 1;
      console.log("Adicionei fogo");
    } else {
      if (Math.random() * 100 < probCaveira) {
        let caveira = new FocoCaveira();
        caveiras.push(caveira);
        skull = 1;
        console.log("Adicionei caveira");
      }
    }
    console.log("Antes da função check");
    console.log("FOGO: ", fire);
    console.log("SKULL", skull);
    setInterval(check, 2000);
  }

  init();
})();
