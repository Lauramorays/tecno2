class Trazo_f {
  constructor(quetrazo) {
    // Resto del código...
    this.cual = int(random(imgs_trazos.length));
    this.posy_reset = random(height + 30, height + 80);

    // Asignar el array imgs_trazos a this.quetrazo
    this.quetrazo = imgs_trazos[this.cual];

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
    this.brillo = 8;
    this.opacidad = 9;
    this.randomcol = random(200, 360);

     // Variables adicionales
    // this.posy_reset = random(height + 30, height + 80); // Posición Y de reinicio
  }

  darcolor() {
    this.difX = abs(mouseX - pmouseX);
    this.difY = abs(mouseY - pmouseY);
    this.velmouse = floor(this.difX + this.difY);

    if (this.velmouse > 20) {
      this.dibujar();
      this.brillo += this.velmouse / 3;
    } else {
      this.brillo--;
    }

    let factorBrillo = map(this.velmouse, 0, 100, 0, 2); // Ajusta el rango de mapeo según tus necesidades
    this.brillo = constrain(this.brillo + factorBrillo, 100, 255);
    
    let factorOpacidad = map(this.velmouse, 0, 100, 0, 0.04); // Ajusta el rango de mapeo según tus necesidades
    this.opacidad = constrain(this.opacidad + factorOpacidad, 0.01, 0.05);
    
  }

  saltaralprincipio_f() {
    this.posy = random(height + 30, height + 80); // Reiniciar posición Y a posy_reset
    this.randomcol = random(200, 360);
    this.posx_f = random(0, width);
  }

  movertrazo_f() {
  
    if (this.posx_f > width / 2 - 80 && this.posx_f < width / 2 + 80) {
      //this.angulo = random(75, 105);
      this.angulo = map(this.posx_f, width / 2 - 80, width / 2 + 80, 75, 105);
      this.espacioMedio = true;
    } else if (this.posx_f < width / 2 - 80) {
      //this.angulo = map(this.posy, height, 0, 90, 120);
      this.angulo = map(this.posx_f, 0, width / 2 - 75, 140, 90);
      this.espacioMedio = false;
    } else if (this.posx_f > width / 2 - 75) {
      //this.angulo = map(this.posy, height, 0, 90, 120);
      this.angulo = map(this.posx_f, width / 2 + 75, width, 90, 140);
      this.espacioMedio = false;
    }
  


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
    push();
    translate(this.posx_f, this.posy);
  
      if (this.posx_f < width / 2) {
        this.angulo = 70; // Ángulo para las imágenes en la mitad izquierda de la pantalla
        tint(50, this.brillo, this.opacidad);   
        tint(255, this.brillo, this.opacidad * 255); // Ajusta el color de la imagen     
        rotate(radians(this.angulo));
        image(this.quetrazo, 0, 0, 40, 80); // Dibuja la imagen en la posición actual relativa a translate()
      } else {
        this.angulo = 270; // Ángulo para las imágenes en la mitad derecha de la pantalla
        tint(50, this.brillo, this.opacidad);    
        tint(255, this.brillo, this.opacidad * 255); // Ajusta el color de la imagen    
        rotate(radians(this.angulo));
        image(this.quetrazo, 0, 0, 40, 80); // Dibuja la imagen en la posición actual relativa a translate()
  
      }
  
      if (this.posy < -80) {
        this.saltaralprincipio_f();
      }
    
    
    pop();
  }
  
  
}  
