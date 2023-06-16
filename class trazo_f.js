class Trazo_f {
  constructor(imgs_trazos) {
    this.quetrazo = imgs_trazos;

    this.posy_reset = random(height + 30, height + 80); // Posición Y de reinicio

    // Asegurarse de que el array imgs_trazos se haya cargado completamente
    if (imgs_trazos.length > 0) {
      // Realizar el procesamiento de las imágenes de trazos figura
      for (let i = 0; i < imgs_trazos.length; i++) {
        let img = imgs_trazos[i];
        img.resize(80, 40); // Ajustar el tamaño de los trazos (aumentar el tamaño)
      }
    }

    // Vars movimiento
    this.vel = random(5, 20);
    this.posy = random(height);
    this.posx_f = random(0, width - 50);
    this.angulo = 90;
    this.dx = 0;
    this.dy = 0;
    this.vueltas = 0;

    // Vars cambiar color
    this.velmouse = 0;
    this.difX = 0;
    this.difY = 0;
    this.brillo = 255;
    this.opacidad = 0.05;
    this.randomcol = random(200, 360);

     // Variables adicionales
    // this.posy_reset = random(height + 30, height + 80); // Posición Y de reinicio
  }

  agregarTrazo(img) {
    this.quetrazo.push(img); // Agregar una imagen de trazo al array this.quetrazo
  }

  darcolor() {
    this.difX = abs(mouseX - pmouseX);
    this.difY = abs(mouseY - pmouseY);
    this.velmouse = floor(this.difX + this.difY);

    if (this.velmouse > 80) {
      this.dibujar();
      this.brillo += this.velmouse / 40;
    } else {
      this.brillo--;
    }

    this.brillo = constrain(this.brillo, 100, 255);
    this.opacidad = constrain(this.opacidad, 0.01, 0.05);
  }

  saltaralprincipio_f() {
    this.posy = random(height + 30, height + 80); // Reiniciar posición Y a posy_reset
    this.randomcol = random(200, 360);
    this.posx_f = random(0, width - 50);
  }

  movertrazo_f() {
    if (this.posx_f > width / 2 - 100 && this.posx_f < width / 2 + 100) {
      this.angulo = 90;
    } else {
      this.angulo = map(this.posy, height, 0, 35, 120);
    }
  
    if (this.posx_f > width / 2 - 100 && this.posx_f < width / 2 + 100 && this.posy > height / 2) {
      this.angulo = map(this.posy, height, 0, 50, 120);
    }
  
    this.angulo += noise(this.posy * 0.01, millis() * 0.001) * 100 - 20;
  
    this.dx = cos(radians(this.angulo));
    this.dy = sin(radians(this.angulo));
  
    this.posy -= this.dy * this.vel;
  
    if (this.posx_f < width / 2 || (this.posx_f < width / 2 && this.dy < height / 2)) {
      this.posx_f += this.dx * this.vel;
    } else if (this.posx_f > width / 2 || (this.posx_f > width / 2 && this.dy < height / 2)) {
      this.posx_f -= this.dx * this.vel;
    }
  
    if (this.posy < -80) {
      this.saltaralprincipio_f();
    }
  
    // Añadir espacio medio
    this.posx_f += this.dx * this.vel * 0.1; // Ajusta el valor 0.5 según tus necesidades
  }
  
  
  

  dibujar() {
    push();
    translate(this.posx_f, this.posy);
    rotate(radians(this.angulo + 0));
    if (this.posx_f < width / 2) {
      rotate(radians(this.angulo + 250));
    }
    let trazoIndex = frameCount % this.quetrazo.length; // Índice del trazo actual a dibujar
    let img = this.quetrazo[trazoIndex];
    tint(255, 30, this.brillo, this.opacidad); // Ajusta el color de la imagen
    image(img, 20, 0); // Dibuja la imagen en la posición actual relativa a translate()

    if (this.posy < -80) {
      this.saltaralprincipio_f();
    }
    pop();
  }
}
