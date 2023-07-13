// Array de objetos Trazo_f
let tfon = [];
// Array de objetos trazo_fig
let tfig = [];
// Máscara figura
let mascarafigura;
// Array de imágenes de trazos
let imgs_trazos = [];

let imgs_trazosF = [];

let colorfondo = [];

let colorfigura = [];

let mascaras = [];

function preload() {
  // Carga de la máscara figura
  //mascarafigura = loadImage('trazos/mascara_figura3.jpg');
  mascarafigura = loadImage('trazos/mascara_figura3.jpg');
  mascarafigura.resize(windowWidth, windowHeight);


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
    ]

      // Carga de las imágenes de mascaras de figura
      for (let i = 0; i < urlsM.length; i++) {
        let mascarasF = loadImage(urlsM[i]);
        mascarasF.resize(windowWidth, windowHeight);
        mascaras.push(mascarasF);
      }
    

  //let miImagenfondo;
  //let miImagentrazo;
}


function setup() {
  createCanvas(windowWidth, windowHeight);

//imágenes para obtener el color de la figura y el fondo
 // miImagenfondo = loadImage('imagenes/colorfondo.jpg');
 // miImagentrazo = loadImage('imagenes/colorfigura.jpg');

 // miImagentrazo.resize(windowWidth, 300);

  // Crear objetos Trazo_f después de cargar las imágenes de trazos de fondo
  for (let i = 0; i < 20; i++) {
    let trazo_f = new Trazo_f(imgs_trazos[i], colorfondo); // Pasa el array imgs_trazos como argumento al crear los objetos
    tfon.push(trazo_f);
  }
  
  

  // Crear objetos trazo_fig después de cargar las imágenes de trazos figura
  for (let j = 0; j < 10; j++) {
    let trazo_fi = new trazo_fig(mascaras, imgs_trazosF[j], colorfigura);
    filter(BLUR);
    tfig.push(trazo_fi);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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