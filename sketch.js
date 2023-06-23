// Array de objetos Trazo_f
let tfon = [];
// Array de objetos trazo_fig
let tfig = [];
// Máscara figura
let mascarafigura;
// Array de imágenes de trazos
let imgs_trazos = [];

let imgs_trazosF = [];

function preload() {
  // Carga de la máscara figura
  mascarafigura = loadImage('trazos/mascara_figura3.jpg');

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

  // Carga de las imágenes de trazos fondo en el array imgs_trazos
  for (let i = 0; i < urls.length; i++) {
    let img = loadImage(urls[i]);
    imgs_trazos.push(img);
  }

  // URLs de las imágenes de trazos figura
  let urlsF = [
    "trazos/trazosfigura/trazofigura1.png",
    "trazos/trazosfigura/trazofigura2.png",
    "trazos/trazosfigura/trazofigura3.png",
    "trazos/trazosfigura/trazofigura4.png",
    "trazos/trazosfigura/trazofigura5.png",
    "trazos/trazosfigura/trazofigura6.png",
    "trazos/trazosfigura/trazofigura7.png"
  ];

  // Carga de las imágenes de trazos figura en el array imgs_trazosF
  for (let i = 0; i < urlsF.length; i++) {
    let imgf = loadImage(urlsF[i]);
    imgs_trazosF.push(imgf);
  }

  let miImagenfondo;
  let miImagentrazo;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
//imágenes para obtener el color de la figura y el fondo
  miImagenfondo = loadImage('imagenes/colorfondo.jpg');
  miImagentrazo = loadImage('imagenes/colorfigura.jpg');

  miImagentrazo.resize(mascarafigura.width, mascarafigura.height);

  // Crear objetos Trazo_f después de cargar las imágenes de trazos de fondo
  for (let i = 0; i < 20; i++) {
    let trazo_f = new Trazo_f(imgs_trazos[i]); // Pasa el array imgs_trazos como argumento al crear los objetos
    tfon.push(trazo_f);
  }
  
  

  // Crear objetos trazo_fig después de cargar las imágenes de trazos figura
  for (let j = 0; j < 10; j++) {
    let trazo_fi = new trazo_fig(mascarafigura, imgs_trazosF[j]);
    filter(BLUR);
    tfig.push(trazo_fi);
  }
}

function draw() {

  // Dibujar los trazos de fondo
  for (let i = 0; i < tfon.length; i++) {
    tfon[i].dibujar();
    tfon[i].movertrazo_f();
    tfon[i].darcolor();
  }

  // Dibujar los trazos de figura
  for (let j = 0; j < tfig.length; j++) {
    tfig[j].dibujar();
    tfig[j].mover();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
