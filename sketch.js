
let tfon = [];// Array de objetos Trazo_f
let tfig = [];// Array de objetos trazo_fig
let mascarafigura;// Máscara figura
// Array de imágenes de trazos
let imgs_trazos = [];
let imgs_trazosF = [];

//-------------------------------CONFIGURACION SONIDO---------------------
let mic;
let AMP_MIN = 0.01;
let AMP_MAX = 0.1; // Umbral de volumen para detectar sonidos fuertes
let durationThreshold = 2; // Duración mínima del sonido en segundos
let startTime = 0;
let soundDetected = false;
let sonidoMax= false;
let sonidoMin= false;



let trazoFigura;// Variable para almacenar la instancia de la clase trazo_fig

//---------------------------------------CARAGA DE OBJETOS -----
let miImagenfondo;
let miImagentrazo;

function preload() {
  mascarafigura = loadImage('trazos/mascara_figura3.jpg'); // Carga de la máscara figura
  let urls = [ // URLs de las imágenes de trazos fondo
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
}

//---------------------------------------------SETUP-------
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
    //______________---------------------SONIDO
  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();

}

function draw() {
  let vol = mic.getLevel();

  if (vol > AMP_MAX && !sonidoMax) {
    // Sonido fuerte detectado
    sonidoMax = true;
    startTime = millis(); // Almacena el tiempo de inicio del sonido
  }
  if (vol > AMP_MIN && vol < AMP_MAX && !sonidoMin) {
    // Sonido fuerte detectado
    sonidoMin = true;
    startTime = millis(); // Almacena el tiempo de inicio del sonido
  }

  //----------------------------SONIDO MAXIMO------------
  if (sonidoMax && millis() - startTime < durationThreshold * 1000) {
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

  //----------------------------SONIDO MINIMO----------------------------
  if (sonidoMin && millis() - startTime < durationThreshold * 1000) {
    // Dibujar los trazos de fondo
    for (let i = 0; i < tfon.length; i++) {
      push();
     
      tfon[i].dibujar();
      tfon[i].movertrazo_f();
      tfon[i].darcolor();
     
      pop();
    }

    

    
  } else {
    // El sonido ha terminado o no cumple la duración mínima
    pop();
    sonidoMax = false;
    sonidoMin = false;
    background(255,255,255); // Color de fondo predeterminado
   
    push();
    
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}