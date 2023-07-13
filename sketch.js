
let tfon = [];
let tfig = [];
let mascarafigura;
let indiceMascara;
let imgs_trazos = [];
let imgs_trazosF = [];
let colorfondo = [];
let colorfigura = [];
let mascaras = [];
let mascaraActual; 
//-------------------------------CONFIGURACION SONIDO---------------------
let mic;
let AMP_MIN = 0.02;
let AMP_MAX = 0.100; // Umbral de volumen para detectar sonidos fuertes
let durationThreshold = 5; // Duración mínima del sonido en segundos
let startTime = 0;
//let sonidoMax= false;
//let sonidoMin= false;
let estadoSonido = '';

function preload() {
 // mascarafigura = loadImage('trazos/mascara_figura3.jpg');
 // mascaras.resize(windowWidth, windowHeight);

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

  let urlsFon = [
    "imagenes/fondo1.jpg",
    "imagenes/fondo2.jpg",
    "imagenes/fondo3.jpg",
    "imagenes/fondo4.jpg",
    "imagenes/fondo5.jpg",
  ];

  // imagenes para obtener el color del fondo
  for (let i = 0; i < urlsFon.length; i++) {
    let coloresfondo = loadImage(urlsFon[i]);
    colorfondo.push(coloresfondo);
  }

  let urlsFig = [
    "imagenes/figura1.jpg",
    "imagenes/figura2.jpg",
    "imagenes/figura3.jpg",
    "imagenes/figura4.jpg",
    "imagenes/figura5.jpg",
  ];

  // Carga de las imágenes de trazos figura en el array colorfigura
  for (let i = 0; i < urlsFig.length; i++) {
    let coloresfigura = loadImage(urlsFig[i]);
    coloresfigura.resize(windowWidth, windowHeight);
    colorfigura.push(coloresfigura);
  }

  let urlsM = [
    "trazos/mascara_figura1.jpg",
   "trazos/mascara_figura2.jpg",
    "trazos/mascara_figura3.jpg",
    "trazos/mascara_figura4.jpg",
    "trazos/mascara_figura5.jpg",

  ];

  // Carga de las imágenes de mascaras de figura
  for (let i = 0; i < urlsM.length; i++) {
    let mascarasF = loadImage(urlsM[i]);
    mascarasF.resize(windowWidth, windowHeight);
    mascaras.push(mascarasF);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //mascaraActual = random(mascaras);
  IndiceMascara = int(random(mascaras.length));

  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();

  // Crear objetos Trazo_f después de cargar las imágenes de trazos de fondo
  for (let i = 0; i < 30; i++) {
    let trazo_f = new Trazo_f(imgs_trazos[i], colorfondo); // Pasa el array imgs_trazos como argumento al crear los objetos
    tfon.push(trazo_f);
  }

  // Crear objetos trazo_fig después de cargar las imágenes de trazos figura
  for (let j = 0; j < 130; j++) {
    let trazo_fi = new trazo_fig(mascaras, imgs_trazosF[j], colorfigura);
    filter(BLUR);
    tfig.push(trazo_fi);
  }
}


function draw() {

  let vol = mic.getLevel();
  if (vol > AMP_MAX && estadoSonido !== 'max') {
    estadoSonido = 'max';
    startTime = millis();
  }
  if (vol > AMP_MIN && vol < AMP_MAX && estadoSonido !== 'min') {
    estadoSonido = 'min';
    startTime = millis();
  }

  if (estadoSonido === '') {
    if (millis() - startTime > durationThreshold * 1000) {
      estadoSonido = 'silent';
    }
  } else {
    if (millis() - startTime > durationThreshold * 1000) {
      estadoSonido = '';
      background(255);
    }
  }
  //-----------------------------------
 

  if (estadoSonido === 'max' && millis() - startTime < durationThreshold * 1000) {
    for (let i = 0; i < tfon.length; i++) {
      tfon[i].dibujar();
      tfon[i].movertrazo_f();
      tfon[i].darcolor();
    }
    for (let j = 0; j < tfig.length; j++) {
      tfig[j].dibujar();
      tfig[j].mover();
    }
  }

  if (estadoSonido === 'min' && millis() - startTime < durationThreshold * 1000) {
    for (let i = 0; i < tfon.length; i++) {
      tfon[i].dibujar();
      tfon[i].movertrazo_f();
      tfon[i].darcolor();
    }
  } else {
    if (millis() - startTime > durationThreshold * 1000) {
      estadoSonido = '';
    }
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
