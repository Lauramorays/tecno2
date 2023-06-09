class Trazo_f {
  constructor(quetrazo) {
    // Variable para elegir el trazo
    this.quetrazo = quetrazo;

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

    // Fondo para obtener color
    this.img_fondo = loadImage('imagenes/colorfondo.jpg');
   // image(this.img_fondo, 0, 0);
  }

  darcolor() {
    let color = this.img_fondo.get();

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
    this.posy = height;
    this.randomcol = random(200, 360);
    this.posx_f = random(0, width - 50);
  }

  movertrazo_f() {
    if (this.posx_f > width / 2 - 100 && this.posx_f < width / 2 + 100) {
      this.angulo = 50;
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
  }

  dibujar() {
    push();
    translate(this.posx_f, this.posy);
    tint(this.color, 50, this.brillo, this.opacidad);
    image(this.quetrazo, 0, 0);
    pop();

    push();
    translate(this.posx_f, this.posy);
    rotate(radians(this.angulo + random(75, 130)));
    tint(this.color, 30, this.brillo, this.opacidad);
    image(this.quetrazo, 0, 0);
    pop();
  }
}
