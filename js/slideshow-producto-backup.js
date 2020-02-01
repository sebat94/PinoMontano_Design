$(document).ready(function () {

  // Variable contador para que el setTimeout no afecte  en la primera pasada y no se vea la primera imagen al cargar un tiempo rara
  var contador_slideshow = 0;

  /************************/
  /*--                  --*/
  /*-- SLIDESHOW NORMAL --*/
  /*--                  --*/
  /************************/
    // Para la primera imagen que ya tiene la clase 'active_slideshow' por defecto
    var x1 = $('.active_slideshow').attr('x');
    var y1 = $('.active_slideshow').attr('y');
    adaptar_imagenes();

    /*--                --*/
    /*-- FLECHA DERECHA --*/
    /*--                --*/
    $('.slideshow_flecha_derecha').on('click', function(){

      // Cuando Cliquemos en la flecha derecha, quitaremos la clase 'active' que haya, y colocaremos una clase vacía 'oldActive'
      $('.active_slideshow').removeClass('active_slideshow').addClass('oldActive');

      // Si cuando cliquemos la clase 'oldActive' se encuentra en último lugar...
      if ($('.oldActive').is(':last-child')) {
          // Pondremos la clase 'active' en la primera imagen
          $('.imagen_slideshow').first().addClass('active_slideshow');

          x1 = $('.active_slideshow').attr('x');
          y1 = $('.active_slideshow').attr('y');
          adaptar_imagenes();
      }
      else{
          // En caso contrario, la clase 'active' se colocará en el siguiente
          $('.oldActive').next().addClass('active_slideshow');

          x1 = $('.active_slideshow').attr('x');
          y1 = $('.active_slideshow').attr('y');
          adaptar_imagenes();
      }
      // Por último removemos la clase 'oldActive' para que se repita el ciclo
      $('.oldActive').removeClass('oldActive');
    });

    /*--                  --*/
    /*-- FLECHA IZQUIERDA --*/
    /*--                  --*/
    $('.slideshow_flecha_izquierda').on('click', function(){

      $('.active_slideshow').removeClass('active_slideshow').addClass('oldActive');

      if ($('.oldActive').is(':first-child')) {
        $('.imagen_slideshow').last().addClass('active_slideshow');

        x1 = $('.active_slideshow').attr('x');
        y1 = $('.active_slideshow').attr('y');
        adaptar_imagenes();
      }
      else{
        $('.oldActive').prev().addClass('active_slideshow');

        x1 = $('.active_slideshow').attr('x');
        y1 = $('.active_slideshow').attr('y');
        adaptar_imagenes();
      }
      $('.oldActive').removeClass('oldActive');
    });

    /*--                                        --*/
    /*-- CAMBIAR IMAGEN PRINCIPAL DESDE FLECHAS --*/
    /*--                                        --*/
    $('.slideshow_flecha_derecha').on('click', function(){
      irDerecha();
    });

    $('.slideshow_flecha_izquierda').on('click', function(){
      irIzquierda();
    });
    /*--                                                    --*/
    /*-- CAMBIAR IMAGEN PRINCIPAL DESDE FLECHAS DEL TECLADO --*/
    /*--                                                    --*/
    $(document).on('keydown', function(e){
      if(e.keyCode == 37){
        /*-- Cambiar active --*/
        $('.active_slideshow').removeClass('active_slideshow').addClass('oldActive');
        if ($('.oldActive').is(':first-child')) {
          $('.imagen_slideshow').last().addClass('active_slideshow');

          x1 = $('.active_slideshow').attr('x');
          y1 = $('.active_slideshow').attr('y');
          adaptar_imagenes();
        }
        else{
          $('.oldActive').prev().addClass('active_slideshow');

          x1 = $('.active_slideshow').attr('x');
          y1 = $('.active_slideshow').attr('y');
          adaptar_imagenes();
        }
        $('.oldActive').removeClass('oldActive');
        irIzquierda();

      }
      else if(e.keyCode == 39){
        /*-- Cambiar active --*/
        $('.active_slideshow').removeClass('active_slideshow').addClass('oldActive');
        if ($('.oldActive').is(':last-child')) {
            $('.imagen_slideshow').first().addClass('active_slideshow');

            x1 = $('.active_slideshow').attr('x');
            y1 = $('.active_slideshow').attr('y');
            adaptar_imagenes();
        }
        else{
            $('.oldActive').next().addClass('active_slideshow');

            x1 = $('.active_slideshow').attr('x');
            y1 = $('.active_slideshow').attr('y');
            adaptar_imagenes();
        }
        $('.oldActive').removeClass('oldActive');
        irDerecha();

      }
    });
    /*--                                           --*/
    /*-- CAMBIAR IMAGEN PRINCIPAL DESDE MINIATURAS --*/
    /*--                                           --*/
    // Antes de clicar la miniatura debemos almacenar en una variable cual ha sido la variable anterior
    // y después calcularlo una vez cliquemos sobre la miniatura para poder hacer la condición
    var array_img_slideshow = $('.imagen_slideshow').map(function(){
      return ($(this).attr('class')).toString();
    }).get();

    var encontrado = false;
    var indiceClaseActiva = -1;

    for( var i = 0; i < array_img_slideshow.length && !encontrado; i++ ){
      if( (array_img_slideshow[i]).includes("active_slideshow") ){
        encontrado = !encontrado;
        indiceClaseActiva = i;
      }
    } // for

    if(indiceClaseActiva != -1) {
      alert("Posicion guardada: " + indiceClaseActiva);
    } else {
      alert("No se ha podido encontrar la activa");
    }


    $('.diapositivas_slideshow img').on('click', function(){
      var global_img_miniatura = $(this);
      // Removemos la clase activa que haya
      $('.active_slideshow').removeClass('active_slideshow');
      // Ponemos la clase activa donde cliquemos
      $(this).addClass('active_slideshow');

      x1 = $('.active_slideshow').attr('x');
      y1 = $('.active_slideshow').attr('y');
      adaptar_imagenes();

      // Efecto
      

    });
    /*--                                --*/
    /*-- CAMBIAR IMAGEN AUTOMÁTICAMENTE --*/
    /*--                                --*/

    /*var intervalo_tiempo = setInterval(function() {

      // Primero - Añadimos clase 'active_slideshow' a la siguiente miniatura
      $('.active_slideshow').removeClass('active_slideshow').addClass('oldActive');
      if ($('.oldActive').is(':last-child')) {
          $('.imagen_slideshow').first().addClass('active_slideshow');
      }
      else{
          $('.oldActive').next().addClass('active_slideshow');
      }
      $('.oldActive').removeClass('oldActive');

      // Segundo - Recogemos la ruta de la siguiente miniatura con la clase 'active_slideshow' y
      //           la mostramos en la '#main_image' cada 2 segundos.
      var ruta_flechas = $('img.active_slideshow').attr('src');
      // Hacemos 'faceOut' antes de realizar la función y 'faceIn'después de haber realizado la acción de cambiar la ruta
      // de la imagen en la miniatura por la imagen principal.
      $('#main_image').fadeOut(500, function() {
         $('#main_image').attr('src', ruta_flechas);
         $('#main_image').fadeIn(500);
      });

    }, 4000);

    //** Falta Restablecer el intervalo de tiempo cuando cambias manualmente de imagen
    $('.slideshow_flecha_izquierda, .slideshow_flecha_derecha, .diapositivas_slideshow img').click(function(){

    });*/

    /****************************/
    /*--                      --*/
    /*-- FIN SLIDESHOW NORMAL --*/
    /*--                      --*/
    /****************************/


    // parte pablo --------------
    function actualActivo(){
      var array_img_slideshow = $('.imagen_slideshow').map(function(){
        return ($(this).attr('class')).toString();
      }).get();

      var encontrado = false;
      var indiceClaseActiva = -1;

      for( var i = 0; i < array_img_slideshow.length && !encontrado; i++ ){
        if( (array_img_slideshow[i]).includes("active_slideshow") ){
          encontrado = !encontrado;
          indiceClaseActiva = i;
        }
      } // for

      return indiceClaseActiva;
    }

    // -2: Si has pulsado a la izquierda
    // -1: Si has pulsado a la derecha
    // De 0 en adelante cualquier foto
    function direccion(evento){
      switch(evento){
        case -2: irIzquierda();
          break;
        case -1: irDerecha();
          break;
        default: // Nos encontramos en una foto
          var actual = actualActivo();
          if(evento > actual) irDerecha();
          else if(evento < actual) irIzquierda();
          break;
      }
    }

    function irIzquierda(){
      // Almacenamos en una variable la ruta de la miniatura activa para sustituirla por la que hay en '#main_image'
      var ruta_flechas = $('img.active_slideshow').attr('src');
      // Efecto Transición
      $( ".imagen_principal_slideshow" ).animate({ left: '-200%', opacity : '0' }, 200 ).animate({ left: '200%' }, 0 );
      setTimeout(function(){
        $('#main_image').attr('src', ruta_flechas);
      }, 200);
      $( ".imagen_principal_slideshow" ).animate({ left: '50%', opacity : '1' }, 200 );
    }

    function irDerecha(){
      // Almacenamos en una variable la ruta de la miniatura activa para sustituirla por la que hay en '#main_image'
      var ruta_flechas = $('img.active_slideshow').attr('src');
      // Efecto transición
      $( ".imagen_principal_slideshow" ).animate({ left: '200%', opacity : '0' }, 200 ).animate({ left: '-200%' }, 0 );
      setTimeout(function(){
        $('#main_image').attr('src', ruta_flechas);
      }, 200);
      $( ".imagen_principal_slideshow" ).animate({ left: '50%', opacity : '1' }, 200 );
    }

    //---------------

    /************************************/
    /*--                              --*/
    /*-- AJUSTE DE IMAGENES SLIDESHWO --*/
    /*--                              --*/
    /************************************/

      function adaptar_imagenes(){

        var elementPositionTop = $('.contenedor_slideshow').offset().top;
        var elementPositionBottom = elementPositionTop + $('.contenedor_slideshow').height();

        var alto_contenido_slideshow = (elementPositionBottom - elementPositionTop);
        var alto_contenido_slideshow_limpia = parseInt(alto_contenido_slideshow, 10);

        // ANCHO ALTO IMAGENES
        /*var x1 = 1192;
        var y1 = 1984;*/

        // Función que calcula el alto y ancho que debe tener la imagen en caso de ser mayor al div que la contiene
        function calculo_width_height() {

          var elementPositionTop = $('.contenedor_slideshow').offset().top;
          var elementPositionBottom = elementPositionTop + $('.contenedor_slideshow').height();

          var alto_contenido_slideshow = (elementPositionBottom - elementPositionTop);
          var alto_contenido_slideshow_limpia = parseInt(alto_contenido_slideshow, 10);

          var y2 = alto_contenido_slideshow_limpia; // EN caso de que la img sea mayor que el contenedor, le decimos que la altura sea igual que la del contenedor
          var x2 = (( y2 * x1 ) / y1 ); //Hacemos una regla de 3 para sacar la anchura proporcional a la altura que hemos cambiado

          // Damos un tiempo mientras hace la transición antes de poner el tamaño a la imagen para que de mientras que desaparece
          // Se mantenga el tamaño de la imagen hasta que se va.
          if(contador_slideshow == 0){
            setTimeout(function(){
              $('.imagen_principal_slideshow').css({
                'height' : alto_contenido_slideshow_limpia,
                'max-width' : x2 + 'px'
              });
            }, 0);
            contador_slideshow++;
          }else{
            setTimeout(function(){
              $('.imagen_principal_slideshow').css({
                'height' : alto_contenido_slideshow_limpia,
                'max-width' : x2 + 'px'
              });
            }, 200);
          }

        }

        // Si la imagen es más alta que el bloque que la contiene, entonces ponle a la imagen la altura del bloque que la contiene
        // Sino obtendrá los valores que tiene la imagen por defecto
        if( y1 >= alto_contenido_slideshow_limpia ){

          calculo_width_height();

        }else if( y1 < alto_contenido_slideshow_limpia ){

          if(contador_slideshow == 0){
            setTimeout(function(){
              $('.imagen_principal_slideshow').css({
                'height' : y1,
                'max-width' : x1 + 'px'
              });
            }, 0);
            contador_slideshow++;
          }else{
            setTimeout(function(){
              $('.imagen_principal_slideshow').css({
                'height' : y1,
                'max-width' : x1 + 'px'
              });
            }, 200);
          }

        }

        $(window).on('resize', function(){
          if( y1 >= alto_contenido_slideshow_limpia ){
            var win = $(this); // This = window
            if (win.width() <= 1903) {
              calculo_width_height();
            }
          }else if( y1 < alto_contenido_slideshow_limpia ){
            // Vamos a comparar cuando el div 'contenedor_slideshow' se iguala al tamaño de la imagen
            var altura_imagen_menor = $('.imagen_principal_slideshow').css('height');
            var altura_imagen_contenedor = $('.contenedor_slideshow').css('height');

            var win = $(this); // This = window
            if ( (win.width() <= 1903) && ( altura_imagen_menor >= altura_imagen_contenedor ) ) {
              calculo_width_height();
            }
          }
        });

      } // funcion adaptar imagenes



    /****************************************/
    /*--                                  --*/
    /*-- FIN AJUSTE DE IMAGENES SLIDESHWO --*/
    /*--                                  --*/
    /****************************************/



  });//Document Ready
