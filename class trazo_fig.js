class trazo_fig {
  constructor(mascarafigura, trazo) {
    this.grave = 0; // Valor inicial para grave
    this.agudo = 0; // Valor inicial para agudo
    this.mascarafigura = mascarafigura;
    //pgraphic//
    this.pgf = createGraphics(windowWidth, windowHeight);
    this.cual = int(random(imgs_trazosF.length));
    this.trazo = imgs_trazosF[this.cual];
    this.mascaratrazo = loadImage('trazos/trazosfondo/trazofondo_03.png');
    let mascaraAncho = 70;
    let mascaraAlto = 150;
    this.mascaratrazo.resize(mascaraAncho, mascaraAlto);
    

    // Asegurarse de que el array imgs_trazos se haya cargado completamente
    if (imgs_trazosF.length > 0) {
      // Realizar el procesamiento de las imágenes de trazos figura
      for (let i = 0; i < imgs_trazosF.length; i++) {
        let imgFig = imgs_trazosF[i];
        //imgFig.resize(80, 40); // Ajustar el tamaño de los trazos (aumentar el tamaño)
      }
    }
    //movimiento//
    this.tam_fig = 100;
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
    this.max_largo_trazo = 0.05;
    this.color_fig = color(random(50, 100), random(50, 100), random(50, 100), this.brilloFig);
    this.variacion = random(-10, 10);
    this.saltar_principio_timer = 0;
    // Intervalo mínimo en milisegundos entre saltos al principio
    this.saltar_principio_intervalo = 500;
    //enmascarado//
    this.x_mascara;
    this.y_mascara;
    // trazo
    //this.trazo = trazo;  // Cambiar el nombre del parámetro para evitar confusión
  }

  //funciones y metodos//

  //metodos 

  // metodo  para verificar si los trazos están en los píxeles oscuros de la imagen de mascara
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
    let c = miImagentrazo.get(x, y);
    return c;
  }

  //-----------------------------------------------------funciones 
  //funcion mover//
  mover() {
    if (millis() > this.saltar_principio_timer + this.saltar_principio_intervalo) {
      // Si se supera el máximo del trazo o se sale del límite de la mascara
      if (this.largo_trazo >= this.max_largo_trazo || !this.pertenece_a_la_forma()) {
        this.saltaralprincipio();
        this.saltar_principio_timer = millis();
      }
    }
    // Incrementar o decrementar largo_trazo en función de mouseX//
    //this.largo_trazo += map(mouseX, 0, width, -1, 1);
    this.largo_trazo += map(this.agudo, 0, width, -1, 1);
    // Restringir largo_trazo dentro del rango permitido//
    this.largo_trazo = constrain(this.largo_trazo, 0, this.max_largo_trazo);
    //se verifica si pasó el intervalo mínimo desde el último salto al principio antes de llamar a la función
    //angulo//
    this.angulo_fig = 0;
    //la posicion incial original, variacion es una variacion random, height limite superior
    this.angulo_fig = map((this.grave+ this.variacion + height)% height, height, 0, 210, 300);
   // this.angulo_fig = map((mouseY + this.variacion + height) % height, height, 0, 210, 300);
    //direccion en x
    this.dx_fig = this.vel_fig * cos(radians(this.angulo_fig));
    //direccion en y
    this.dy_fig = this.vel_fig * sin(radians(this.angulo_fig));
    //variables de movimiento//
    this.posX_fig = this.posX_fig + this.dx_fig;
    this.posY_fig = this.posY_fig + this.dy_fig;
  }



  //funcion volver al estado inicial del trazo//
  saltaralprincipio() {
    this.posX_fig = random(this.margen_tfig, width - this.margen_tfig);
    this.posY_fig = random(this.margen_tfig, height - this.margen_tfig);
    this.color_fig = color(random(50, 100), random(50, 100), random(50, 100), this.brilloFig);
    // variable para cambiar a una imagen aleatoria dentro del array de imgs//
    this.cual = int(random(this.trazo.length));
    this.grave = 0;
    this.agudo = 0;
    this.dx_fig;
    this.dy_fig;
    this.vel_fig = random(2, 7);
    this.angulo_fig;
    this.largo_trazo = 0;
    this.brilloFig = random(3);
    this.max_largo_trazo = 0.05;
    this.variacion = random(-10, 10);
    //this.saltar_principio_timer = 0;
    this.pgf.clear(); // Limpiar el pgraphic
  }

darColor(){
  let x = floor(random(this.trazo.width));
  let y = floor(random(this.trazo.height));
  let colorPixel = this.trazo.get(x, y);

  this.randomcol = colorPixel[0];
  this.brillo = colorPixel[1];
  this.opacidad = colorPixel[2];
}

  dibujar() {
    // Dibujar el trazo en el lienzo gráfico si pertenece a la forma y no está fuera de los margenes//
    if (this.esta_en_margenes() && this.pertenece_a_la_forma()) {
      push();
      // Crea una imagen en blanco del mismo tamaño que el trazo
      let trazoEnmascarado = createImage(this.trazo.width, this.trazo.height);
      // Copia la imagen de trazo en la imagen enmascarada
      trazoEnmascarado.copy(this.trazo, 0, 0, this.trazo.width, this.trazo.height, 0, 0, this.trazo.width, this.trazo.height);
      // Aplica la máscara a la imagen enmascarada
      trazoEnmascarado.mask(this.mascaratrazo);
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
        rotate(radians(angulo) + random(0, 360));
        this.pgf.image(trazoEnmascarado, this.posX_fig, this.posY_fig, random (20, 50), random(60, 120));
        
      pop();
    }
    // Mostrar el pgraphic//
    image(this.pgf, 0, 0, width, height);
    //this.reiniciar();
    this.saltaralprincipio();
  
  }
 

}