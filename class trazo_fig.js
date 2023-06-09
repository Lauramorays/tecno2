class trazo_fig {
  constructor(imagen,trazo) {
    //pgraphic//
    this.pgf = createGraphics(windowWidth, windowHeight);
    //movimiento//
    this.tam_fig = 10;
    this.margen_tfig=10;
    this.posX_fig=random(this.margen_tfig,width-this.margen_tfig);
    this.posY_fig=random(this.margen_tfig,height-this.margen_tfig);
    this.dx_fig;
    this.dy_fig;
    this.vel_fig = random(2, 7);
    this.angulo_fig;
    this.largo_trazo = 0;
    //variable para el maximo del largo de un trazo//
    this.max_largo_trazo = 0.05;
    this.color_fig = color(random(360), random(50, 100), random(50, 100));
    this.variacion = random(-180, 80);
    this.saltar_principio_timer = 0;
    // Intervalo mínimo en milisegundos entre saltos al principio
    this.saltar_principio_intervalo = 500; 
    //enmascarado//
    this.imagen= imagen;
    this.x_mascara;
    this.y_mascara;
    // trazo
    this.trazo=trazo;
    // variable para levantar una imagen aleatoria del array de trazos
      this.cual = int(random(this.trazo.length));
  }

  //funciones y metodos//

  //metodos 

    // metodo  para verificar si los trazos están en los píxeles oscuros de la imagen de mascara
    pertenece_a_la_forma() {
      let x_en_img = floor(map(this.posX_fig, 0, width, 0, this.imagen.width));
      let y_en_img = floor(map(this.posY_fig, 0, height, 0, this.imagen.height));
      let estepixel = this.imagen.get(x_en_img, y_en_img);

      //manda true cada vez que el brillo de un pixel de la img de mascara es menor a 50//
      return brightness(estepixel) <50; 
    }
    //metodo para verificar si se sale de los margenes 
    esta_en_margenes(){
      return (
        this.posX_fig > this.margen_tfig &&
        this.posX_fig < width - this.margen_tfig &&
        this.posY_fig > this.margen_tfig &&
        this.posY_fig < height - this.margen_tfig
      );
    }

    //funciones 
  
//funcion mover//
  mover() { 

  
    // Incrementar o decrementar largo_trazo en función de mouseX//
    this.largo_trazo+= map(mouseX, 0, width, -1, 1);

    // Restringir largo_trazo dentro del rango permitido//
    this.largo_trazo = constrain(this.largo_trazo, 0, this.max_largo_trazo);
    //se verifica si pasó el intervalo mínimo desde el último salto al principio antes de llamar a la función
    if (millis() > this.saltar_principio_timer + this.saltar_principio_intervalo) {
      
      // Si se supera el máximo del trazo o se sale del límite de la mascara
      if (this.largo_trazo >= this.max_largo_trazo || !this.pertenece_a_la_forma()) {
        this.saltaralprincipio();
        this.saltar_principio_timer = millis();
      }
 

    } 


    //angulo//
    this.angulo_fig = 0;

    // valores angulo x en funcion al mouse//

    //la posicion incial original, variacion es una variacion random, height limite superior
    this.angulo_fig = map((mouseY + this.variacion + height) % height, height, 0, 210, 300);
    //rango derecha 210,270
    //rango izquierda 270,300 
   
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
    this.posX_fig=random(this.margen_tfig,width-this.margen_tfig);
    this.posY_fig=random(this.margen_tfig,height-this.margen_tfig);
      this.color_fig = color(random(360), random(50, 100), random(50, 100));
        // variable para cambiar a una imagen aleatoria dentro del array de imgs//
      this.cual = int(random(this.trazo.length));
  }
   


  dibujar() {
// Dibujar el trazo en el lienzo gráfico si pertenece a la forma y no está fuera de los margenes//
if (this.esta_en_margenes() && this.pertenece_a_la_forma()) {
  push();
  //var para levantar una img al azar del array de imagenes de trazo//
  this.pgf.noStroke();
  this.pgf.fill(this.color_fig);
  //poner imagenes de trazo//
  this.pgf.tint(this.color_fig);
  // hacer la mascara de los trazos
  //trazos con imgs//
   //this.pgf.image(this.trazo[this.cual],this.posX_fig,this.posY_fig);
   //trazos circulos//
  this.pgf.ellipse(this.posX_fig, this.posY_fig, this.tam_fig, this.tam_fig);
  pop();
}


    
   // Mostrar el pgraphic//
    image(this.pgf, 0, 0, width, height);
  }

}