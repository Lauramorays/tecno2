// Array de objetos Trazo_f
let tfon = [];
// Array de objetos trazo_fig
let tfig = [];
// Máscara figura
let mascarafigura;
// Array de imágenes de trazos
let imgs_trazos = [];
// Declarar una variable global para la máscara de fondo
//let mascarafondo;

// Carga de recursos antes de iniciar el sketch
function preload() {
  // Carga de la máscara figura
  mascarafigura = loadImage('trazos/mascara_figura3.jpg');

  // Carga de la máscara de fondo
  //mascarafondo = loadImage('trazos/trazosfondo/trazofondo_12.png');

  // Resto de la carga de recursos...

  // URLs de las imágenes de trazos fondo
  let urls = [
    "trazos/trazosfondo/trazofondo_01.png",
    "trazos/trazosfondo/trazofondo_02.png",
    "trazos/trazosfondo/trazofondo_03.png",
    "trazos/trazosfondo/trazofondo_04.png",
    "trazos/trazosfondo/trazofondo_05.png",
    "trazos/trazosfondo/trazofondo_06.png",
    "trazos/trazosfondo/trazofondo_07.png",
    "trazos/trazosfondo/trazofondo_08.png",
    "trazos/trazosfondo/trazofondo_09.png",
    "trazos/trazosfondo/trazofondo_10.png",
    "trazos/trazosfondo/trazofondo_11.png",
    "trazos/trazosfondo/trazofondo_12.png",
    "trazos/trazosfondo/trazofondo_13.png",
    "trazos/trazosfondo/trazofondo_14.png"
  ];

  // Carga de las imágenes de trazos figura en el array imgs_trazos
  for (let i = 0; i < urls.length; i++) {
    let img = loadImage(urls[i], () => {
      // Aplicar la máscara de fondo a la imagen de trazo
     // img.mask(mascarafondo);
      imgs_trazos.push(img);
    });
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Fondo
  //trazofondo.resize(trazofondo.width / 2, trazofondo.height / 2);
  //trazofondo.mask(mascaratfondo);
  colorMode(HSB);

// Crear objetos Trazo_f después de cargar las imágenes de trazos de fondo
for (let i = 0; i < 20; i++) {
  let trazo_f = new Trazo_f(imgs_trazos);
  tfon.push(trazo_f);
}

  // Objetos trazo_fig
  for (let j = 0; j < 10; j++) {
    let trazo_fi = new trazo_fig(mascarafigura,imgs_trazos);
    tfig.push(trazo_fi);
  }
}

function draw() {

  for (let i = 0; i < tfon.length; i++) {
    push();
    tfon[i].dibujar();
    tfon[i].movertrazo_f();
    tfon[i].darcolor();
    pop();
  }

  for (let j = 0; j < tfig.length; j++) {
    push();
    tfig[j].dibujar();
    tfig[j].mover();
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}