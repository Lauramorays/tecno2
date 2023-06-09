
// Array de objetos Trazo_f
let tfon = [];
// Array de objetos trazo_fig
let tfig = [];
// Mascara figura
let mascarafigura;
// Array de imágenes de trazos
let imgs_trazos = [];

// Carga de recursos antes de iniciar el sketch
function preload() {
  // Imagen simil lienzo
  imgfondo = loadImage('imagenes/lienzofondo2.jpg');
  // Trazo del fondo
  trazofondo = loadImage('trazos/trazofondo_13.png');
  // Mascara fondo
  mascaratfondo = loadImage('trazos/trazofondo_14_a.png');

  // Recursos figura
  // URLs de las imágenes de trazo figura
  let urls = [
    "trazos/trazofondo_01.png",
    "trazos/trazofondo_02.png",
    "trazos/trazofondo_03.png",
    "trazos/trazofondo_04.png",
    "trazos/trazofondo_05.png",
    "trazos/trazofondo_06.png",
    "trazos/trazofondo_07.png",
    "trazos/trazofondo_08.png",
    "trazos/trazofondo_09.png"
  ];

  // Carga de la máscara figura
  mascarafigura = loadImage('trazos/mascara_figura3.jpg');

 // Carga de las imágenes de trazos figura en el array imgs_trazos
for (let i = 0; i < urls.length; i++) {
  // hay que crear una imagen create img, en cada vuelta del ciclo y usar de mascara imgs_trazos
  let img = loadImage(urls[i],() => {
    //la mascara es media al pedo si la img ya es transparente
    imgs_trazos[i].filter(INVERT); // Aplicar el filtro invert a la imagen en la posición i del array
    imgs_trazos[i].mask(imgs_trazos[i]); // Enmascarar el trazo con la misma imagen del trazo
    //se puede aplicar un resize o hacer la mascara con un circulo o hacer las imagenes mas chicas//
    //imgs_trazos[i].resize(20,20);
  });
  imgs_trazos.push(img);
}

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Fondo
  trazofondo.resize(trazofondo.width / 2, trazofondo.height / 2);
  trazofondo.mask(mascaratfondo);
  colorMode(HSB);

  // Objetos Trazo_f
  for (let i = 0; i < 10; i++) {
    let trazo_f = new Trazo_f(trazofondo);
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