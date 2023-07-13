
class trazo_fig {
  constructor(mascaras, trazo, colorfig) {
    this.mascaras = mascaras;
    this.cualmascara = indiceMascara;
    this.agudo=0;
    this.grave=0;
    this.pgf = createGraphics(windowWidth, windowHeight);
    this.cual = int(random(imgs_trazosF.length));
    this.cualcolorfig = int(random(colorfigura.length));
    this.cualmascara = int(random(mascaras.length));
    this.mascarafigura = mascaras[this.cualmascara];
    this.trazo = imgs_trazosF[this.cual];
    this.colorfig = colorfig[this.cualcolorfig];
    this.mascaratrazo = loadImage('trazos/trazosfondo/trazofondo_03.png');
    let mascaraAncho = 70;
    let mascaraAlto = 150;
    this.mascaratrazo.resize(mascaraAncho, mascaraAlto);
    if (imgs_trazosF.length > 0) {
      // Realizar el procesamiento de las imágenes de trazos figura
      for (let i = 0; i < imgs_trazosF.length; i++) {
        let imgFig = imgs_trazosF[i];

      }
    }
    //movimiento//
    this.tam_fig = 50;
    this.margen_tfig = 10;
    this.posX_fig = random(this.margen_tfig, width - this.margen_tfig);
    this.posY_fig = random(this.margen_tfig, height - this.margen_tfig);
    this.dx_fig;
    this.dy_fig;
    this.vel_fig = random(2, 7);
    this.angulo_fig;
    this.largo_trazo = 0;
    this.brilloFig = random(3);
    //variable para el maximo del largo de un trazo//
    this.max_largo_trazo = 0.02;
    this.color_fig = color(random(50, 100), random(50, 100), random(50, 100), this.brilloFig);
    this.variacion = random(-10, 10);
    this.saltar_principio_timer = 0;
    this.saltar_principio_intervalo = 500;
    //enmascarado//
    this.x_mascara;
    this.y_mascara;
  }

  //funciones y metodos//
  pertenece_a_la_forma() {
    let x_en_img = floor(map(this.posX_fig, 0, width, 0, this.mascarafigura.width));
    let y_en_img = floor(map(this.posY_fig, 0, height, 0, this.mascarafigura.height));
    let estepixel = this.mascarafigura.get(x_en_img, y_en_img);

    //manda true cada vez que el brillo de un pixel de la img de mascara es menor a 50//
    return brightness(estepixel) < 50;
  }
  
  //metodo para verificar si se sale de los margenes 
  esta_en_margenes() {
    return (
      this.posX_fig > this.margen_tfig &&
      this.posX_fig < width - this.margen_tfig &&
      this.posY_fig > this.margen_tfig &&
      this.posY_fig < height - this.margen_tfig
    );
  }

  getColorFromImage(x, y) {
    let x_rel = floor(map(x, 0, width, 0, this.colorfig.width));
    let y_rel = floor(map(y, 0, height, 0, this.colorfig.height));
    let colorPixel = this.colorfig.get(x_rel, y_rel);
    return colorPixel;
  }
  

  //funciones 
  //funcion mover//
  mover() {
    if (millis() > this.saltar_principio_timer + this.saltar_principio_intervalo) {
      if (this.largo_trazo >= this.max_largo_trazo || !this.pertenece_a_la_forma()) {
        this.saltaralprincipio();
        this.saltar_principio_timer = millis();
      }


    }
    this.largo_trazo += map(this.agudo, 0, width, -1, 1);
    this.largo_trazo = constrain(this.largo_trazo, 0, this.max_largo_trazo);
    this.angulo_fig = 0;
    this.angulo_fig = map((this.grave + this.variacion + height) % height, height, 0, 210, 300);
    this.dx_fig = this.vel_fig * cos(radians(this.angulo_fig));
    this.dy_fig = this.vel_fig * sin(radians(this.angulo_fig));
    this.posX_fig = this.posX_fig + this.dx_fig;
    this.posY_fig = this.posY_fig + this.dy_fig;
  }


  //funcion volver al estado inicial del trazo//
  saltaralprincipio() {
    this.posX_fig = random(this.margen_tfig, width - this.margen_tfig);
    this.posY_fig = random(this.margen_tfig, height - this.margen_tfig);
    this.color_fig = color(0, this.brilloFig);
    this.cual = int(random(this.trazo.length));
      this.pgf.clear();
    
  }
  
darColor(){
  let x = floor(random(this.colorfig.width));
  let y = floor(random(this.colorfig.height));
  let colorPixel = this.colorfig.get(x, y);

  this.rojo = colorPixel[0];
  this.verde = colorPixel[1];
  this.azul = colorPixel[2];
}

reset() {
  this.max_largo_trazo = 0.05;
  this.largo_trazo = 0;
  this.variacion = random(-10, 10);
  this.pgf.clear();
}

  dibujar() {
    // Dibujar el trazo en el lienzo gráfico si pertenece a la forma y no está fuera de los margenes//
    if (this.esta_en_margenes() && this.pertenece_a_la_forma()) {
      push();
      let trazoEnmascarado = createImage(this.trazo.width, this.trazo.height);
      trazoEnmascarado.copy(this.trazo, 0, 0, this.trazo.width, this.trazo.height, 0, 0, this.trazo.width, this.trazo.height);
      trazoEnmascarado.copy(this.trazo, 0, 0, this.trazo.width, this.trazo.height, 0, 0, this.trazo.width, this.trazo.height);
        translate(0, 0);
        // Calcular el ángulo basado en la posición en x
        let colorPixel = this.getColorFromImage(this.posX_fig, this.posY_fig);
        let angulo = map(this.posX_fig, 0, width / 2, 210, 270);
        let r = red(colorPixel);
        let g = green(colorPixel);
        let b = blue(colorPixel);
        let a = alpha(colorPixel);
        let colorTint = color(r, g, b, a);
        let transparenciaAleatoria = random(50, 200);
        let colorTrazo = color(red(colorTint), green(colorTint), blue(colorTint), transparenciaAleatoria);
       this.pgf.tint(colorTrazo);
       fill(colorTrazo);
        rotate(radians(this.angulo_fig));
        this.pgf.image(trazoEnmascarado, this.posX_fig, this.posY_fig, random (20, 50), random(30, 80));

      pop();
      
    }


    // Mostrar el pgraphic//
    image(this.pgf, 0, 0, width, height);
   this.reset();
  }
  //this.saltaralprincipio();
}


