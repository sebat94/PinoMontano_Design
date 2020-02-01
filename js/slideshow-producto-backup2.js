
    /************************************/
    /*--                              --*/
    /*-- AJUSTE DE IMAGENES SLIDESHWO --*/
    /*--                              --*/
    /************************************/

    function cargarSlideshow(){
      var contenedorSlideshowTop = $('.contenedor_slideshow').offset().top;
      var contenedorSlideshowBottom = contenedorSlideshowTop + $('.contenedor_slideshow').height();

      var alto_contenido_slideshow = (contenedorSlideshowBottom - contenedorSlideshowTop);
      var alto_contenido_slideshow_limpia = parseInt(alto_contenido_slideshow, 10);

      var x1 = $('.active_slideshow').attr('x');
      var y1 = $('.active_slideshow').attr('y');

      var y2 = alto_contenido_slideshow_limpia; // EN caso de que la img sea mayor que el contenedor, le decimos que la altura sea igual que la del contenedor
      var x2 = (( y2 * x1 ) / y1 ); //Hacemos una regla de 3 para sacar la anchura proporcional a la altura que hemos cambiado

      //Imagen grande
        if( y1 >= alto_contenido_slideshow_limpia ){
          setTimeout(function(){
            $('.imagen_principal_slideshow').css({
              'height' : alto_contenido_slideshow_limpia,
              'max-width' : x2 + 'px'
            });
          }, 0);
        }
        //Imagen pequeña
        if( y1 < alto_contenido_slideshow_limpia ){
          setTimeout(function(){
            $('.imagen_principal_slideshow').css({
              'height' : y1,
              'max-width' : x1 + 'px'
            });
          }, 0);
        }

        var arrayDatosCondicion = [y1, alto_contenido_slideshow_limpia];
        return arrayDatosCondicion;

    } // cargarSlideshow()
    window.onload = cargarSlideshow; // Lo cargamos desde aquí y no desde html porque en una primera instancia no tiene los valores 'x' e 'y' definidos.


    function adaptarImagenes(){
      var arrayDatosCondicion = cargarSlideshow(arrayDatosCondicion);
      var y1 = arrayDatosCondicion.slice(0, 1);
      var alto_contenido_slideshow_limpia = arrayDatosCondicion.slice(1, 2);

      if( y1 >= alto_contenido_slideshow_limpia ){
        setTimeout(function(){
          $('.imagen_principal_slideshow').css({
            'height' : alto_contenido_slideshow_limpia,
            'max-width' : x2 + 'px'
          });
        }, 200);
      }

      if( y1 < alto_contenido_slideshow_limpia ){
        setTimeout(function(){
          $('.imagen_principal_slideshow').css({
            'height' : y1,
            'max-width' : x1 + 'px'
          });
        }, 200);
      }

    } // adaptarImagenes()


    $(window).resize(function(){
      var win = $(this); // This = window
      if (win.width() <= 1903) {
        adaptarImagenes();
      }
    }); // Resize



    /****************************************/
    /*--                                  --*/
    /*-- FIN AJUSTE DE IMAGENES SLIDESHOW --*/
    /*--                                  --*/
    /****************************************/





// -2: Si has pulsado a la izquierda
// -1: Si has pulsado a la derecha
// De 0 en adelante cualquier foto

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


function direccion(evento){
  var actual = actualActivo();

  cambiarActiva(actual, evento);

  switch(evento){
    case -2: irIzquierda(); adaptarImagenes();
      break;
    case -1: irDerecha(); adaptarImagenes();
      break;
    default: // Nos encontramos en una foto
      if(evento > actual)      irDerecha();
      else if(evento < actual) irIzquierda();
      break;
  }
  adaptar_imagenes();
}

function cambiarActiva(ac, ev){
  $(".imagen_slideshow").removeClass("active_slideshow");

  var array_img_slideshow = $('.imagen_slideshow').map(function(){
    return ($(this).attr('class')).toString();
  }).get();

  /*if(ev == -2){
    if(ac == 0) activar(array_img_slideshow.length);
    else        activar(ac);
  } else if(ev == -1){
    if(ac == (array_img_slideshow.length-1)) activar(1);
    else                                     activar(ac+2);
  } else {
    //TO DO: pendiente
  }*/
  if(ev == -2){
      if(ac == 0){
        activar(array_img_slideshow.length);
      }
      else{
        activar(ac);
      }
  } else if(ev == -1){
      if(ac == (array_img_slideshow.length-1)){
        activar(1);
      }
      else{
        activar(ac+2);
      }
  } else {

  }

}

function activar(i) {
  $(".imagen_slideshow:nth-child("+i+")").addClass("active_slideshow");
}

function irIzquierda(){
  // Almacenamos en una variable la ruta de la miniatura activa para sustituirla por la que hay en '#main_image'
  var ruta_flechas = $('img.active_slideshow').attr('src');
  // Efecto transición
  $( ".imagen_principal_slideshow" ).animate({ left: '200%', opacity : '0' }, 200 ).animate({ left: '-200%' }, 0 );
  setTimeout(function(){
    $('#main_image').attr('src', ruta_flechas);
  }, 200);
  $( ".imagen_principal_slideshow" ).animate({ left: '50%', opacity : '1' }, 200 );
}

function irDerecha(){
  // Almacenamos en una variable la ruta de la miniatura activa para sustituirla por la que hay en '#main_image'
  var ruta_flechas = $('img.active_slideshow').attr('src');
  // Efecto Transición
  $( ".imagen_principal_slideshow" ).animate({ left: '-200%', opacity : '0' }, 200 ).animate({ left: '200%' }, 0 );
  setTimeout(function(){
    $('#main_image').attr('src', ruta_flechas);
  }, 200);
  $( ".imagen_principal_slideshow" ).animate({ left: '50%', opacity : '1' }, 200 );
}

function cambiarMiniatura(e){
  $('.active_slideshow').removeClass('active_slideshow');
  $(e).addClass('active_slideshow');
}
