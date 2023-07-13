class Trazo_f {
  constructor(quetrazo, colorfondo) {
    // Resto del código...
    this.cual = int(random(imgs_trazos.length));
    this.posy_reset = random(height + 30, height + 80);
    this.cualcolorf = int(random(colorfondo.length));
    this.anchoVenta = windowWidth;

    // Asignar el array imgs_trazos a this.quetrazo
    this.quetrazo = imgs_trazos[this.cual];
    this.colorfondo = colorfondo[this.cualcolorf];

    // Vars movimiento
    this.vel = random(5, 20);
    this.posy = random(height);
    this.posx_f = random(0, width - 50);
    this.angulo = 0;
    this.dx = 0;
    this.dy = 0;
    this.vueltas = 0;
    this.espacioMedio = false;

    // Vars cambiar color
    this.velmouse = 0;
    this.difX = 0;
    this.difY = 0;
    this.brillo = 0;
    this.opacidad = 0;
    this.randomcol = random(50, 200);

    // Variables adicionales
    // this.posy_reset = random(height + 30, height + 80); // Posición Y de reinicio
  }


  getColorFromImage(x, y) {
    let c = this.quetrazo.get(x, y);
    return c;
  }


  darcolor() {
    this.difX = abs(mouseX - pmouseX);
    this.difY = abs(mouseY - pmouseY);
    this.velmouse = floor(this.difX + this.difY);
  
    if (this.velmouse > 20) {
      this.brillo += this.velmouse / 50; // Aumentar el brillo más rápidamente
      this.opacidad += this.velmouse;
    } else {
      this.brillo = 10;
      this.opacidad = 10;
    }
  
    // Obtener un color al azar de la imagen en una posición específica
    /*let x = floor(random(this.quetrazo.width));
    let y = floor(random(this.quetrazo.height));
    let colorPixel = this.quetrazo.get(x, y);*/

    let x = floor(random(this.colorfondo.width));
    let y = floor(random(this.colorfondo.height));
    let colorPixel = this.colorfondo.get(x, y);
  
  
    // Utilizar el color obtenido de la imagen
    this.rojo = colorPixel[0];
    this.verde = colorPixel[1];
    this.azul = colorPixel[2];
  }

  saltaralprincipio_f() {
    this.posy = random(height + 30, height + 80); // Reiniciar posición Y a posy_reset
    this.randomcol = random(50, 200);
    this.posx_f = random(0, width);
  }

  movertrazo_f() {

    if (this.posx_f > width / 2 - 90 && this.posx_f < width / 2 + 90) {

      //this.angulo = random(75, 105);
      this.angulo = map(this.posx_f, width / 2 - 80, width / 2 + 80, 70, 110);
      this.espacioMedio = true;

    } else if (this.posx_f < width / 2 + 75) {

      //this.angulo = map(this.posy, height, 0, 90, 120);
      this.angulo = map(this.posx_f, 0, width / 2 - 75, 140, 90);
      this.espacioMedio = false;

    } else if (this.posx_f > width / 2 - 75) {

      //this.angulo = map(this.posy, height, 0, 90, 120);
      this.angulo = map(this.posx_f, width / 2 + 80, width, 90, 140);
      this.espacioMedio = false;
    }


    // Calcula el ángulo de la imagen en función del ángulo del trazo
    let anguloImagen = this.angulo + random(90, 200); // Puedes ajustar este valor según tus necesidades

    // Calcula el ángulo de rotación de la imagen
    let anguloRotacion = map(anguloImagen, 0, 90, 0, TWO_PI);

    if (this.posx_f > width / 2 - 100 && this.posx_f < width / 2 + 100 && this.posy > height / 2) {
      this.angulo = map(this.posy, height, 0, 50, 120);
    }




    this.angulo += noise(this.posy * 0.01, millis() * 0.001) * 10 - 0;

    this.dx = cos(radians(this.angulo));
    this.dy = sin(radians(this.angulo));

    this.posy -= this.dy * this.vel;

    if (this.posx_f < width / 2 - 100) {
      this.posx_f += this.dx * this.vel;
    } else if (this.posx_f > width / 2 + 100) {
      this.posx_f -= this.dx * this.vel;
    }

    if (this.posy < -80 || this.posx_f < -20 || this.posx_f > width + 20) {
      this.saltaralprincipio_f();
    }

    // Añadir espacio medio
    this.posx_f += this.dx * this.vel * 0.1; // Ajusta el valor 0.5 según tus necesidades
  }



  dibujar() {
    this.darcolor();

    push();

    //background(245, 1);

    translate(this.posx_f, this.posy);

    if (this.posx_f < width / 2) {
      let colorPixel = this.getColorFromImage(this.posx_f, this.posy);
      let trazoAngulo = radians(this.angulo);

      // Mapear el valor de brillo al rango 0-1
      let brilloMapeado = map(this.velmouse, 20, 900, 10, 150);
      let opacidadMapeada = map(this.velmouse, 20, 900, 5, 20);

      fill(this.rojo, this.verde, this.azul, brilloMapeado);
      tint(this.rojo, this.verde, this.azul, brilloMapeado);

      push();
      translate(0, 0); // Ajusta la posición de dibujo de la imagen según tus necesidades
      scale(-1, 1);
      rotate(trazoAngulo);
      image(this.quetrazo, 0, 0, random(70, 120), random(40, 70), opacidadMapeada); // Dibuja la imagen en la posición actual relativa a translate()
      pop();

      // Resto del código...
    } else {
      let colorPixel = this.getColorFromImage(this.posx_f, this.posy);
      let trazoAngulo = radians(this.angulo);

      // Mapear el valor de brillo al rango 0-1
      let brilloMapeado = map(this.velmouse, 20, 900, 10, 150);
      let opacidadMapeada = map(this.velmouse, 20, 900, 5, 20);

      fill(this.rojo, this.verde, this.azul, brilloMapeado);
      tint(this.rojo, this.verde, this.azul, brilloMapeado);

      push();
      translate(0, 0); // Ajusta la posición de dibujo de la imagen según tus necesidades
      //rotate(this.anguloRotacion);
      rotate(trazoAngulo);
      image(this.quetrazo, 0, 0, random(70, 120), random(40, 70), opacidadMapeada); // Dibuja la imagen en la posición actual relativa a translate()
      pop();
    }

    if (this.posy < -80) {
      this.saltaralprincipio_f();
    }

    pop();
  }



} 