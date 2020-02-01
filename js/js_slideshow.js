

  // TAMAÑOS DE IMAGENES
  function sizeImg(){

      var altura_contenedor_imagen = (( $('.mostrar_imagenes_slideshow').height() ) - 5);  // Damos un margen de -5px por arriba y -5px por abajo del div que contiene la imagen
      var ancho_contenedor_imagen = $('.mostrar_imagenes_slideshow').width();

      var ancho_imagen = $('.active_slideshow').attr('x');
      var altura_imagen = $('.active_slideshow').attr('y');

      var arraySizes = [ancho_imagen, altura_imagen, altura_contenedor_imagen, ancho_contenedor_imagen];
      return arraySizes;

  }


  function adjustImg(){

      var arraySizes = sizeImg(arraySizes);
      var ancho_imagen = parseInt(arraySizes.slice(0, 1));
      var altura_imagen = parseInt(arraySizes.slice(1, 2));
      var altura_contenedor_imagen = parseInt(arraySizes.slice(2, 3));
      var ancho_contenedor_imagen = parseInt(arraySizes.slice(3, 4));

      // Anchura proporcional para que cuando escalemos la imagen a la altura del bloque que la contiene que no se vea achatada, la ajustará de ancho
      var ancho_imagen_proporcional = (( altura_contenedor_imagen * ancho_imagen ) / altura_imagen );


      // Reseteamos los margin-top y margin-bottom del div ya que pueden haberse quedado de la anterior imagen
      $('.img_slide').css({ 'margin-top' : 0 + 'px', 'margin-bottom' : 0 + 'px' });

      // En caso de que la imagen sea mas alta que el contenedor de la imagen, la adaptaremos
      if( altura_imagen >= altura_contenedor_imagen ){
          $('.img_slide').css({
            'height' : altura_contenedor_imagen + 'px',
            'width' : ancho_imagen_proporcional + 'px'
          });
      }

      // En caso de que la imagen sea menos alta que el contenedor de la imagen dejaremos el tamaño original de la imagen y
      // además calcularemos el espacio sobrante y se lo repartiremos de margin-top y margin-botton para que quede centrada verticalmente la imagen
      var margenes_img = (( altura_contenedor_imagen - altura_imagen ) / 2 );
      if( altura_imagen < altura_contenedor_imagen ){
        $('.img_slide').css({
          'height' : altura_imagen + 'px',
          'width' : ancho_imagen + 'px',
          'margin-top' : margenes_img + 'px',
          'margin-bottom' : margenes_img + 'px'
        });
      }

      // Altura proporcional para que cuando escalemos la imagen a la anchura del bloque que la contiene que no se vea achatada, la ajustará de alto
      var alto_imagen_proporcional = ( ($(window).width() * altura_imagen) / ancho_imagen );
      var margenes_img_alto_proporcional = ( (altura_contenedor_imagen - alto_imagen_proporcional) / 2 );

      if( ancho_imagen_proporcional > $(window).width() ){
        $('.img_slide').css({
          'width' : $(window).width() + 'px',
          'height' : alto_imagen_proporcional + 'px',
          'margin-top' : margenes_img_alto_proporcional + 'px',
          'margin-bottom' : margenes_img_alto_proporcional + 'px'
        });
      }


  }adjustImg();


  $(window).resize(function(){
    var win = $(this);
    if (win.width() <= 1903) {
      adjustImg();
    }
  }); // Resize


  function changeActive(id){

    $('.miniatura').removeClass('miniatura_active');
    $(id).addClass('miniatura_active');

    var miniaturaActiva = $('.miniatura_active > img').attr('data');

    $('.img_slide > img').removeClass('active_slideshow');

    $(".img_slide").find('img').eq(miniaturaActiva).addClass("active_slideshow");

    adjustImg();

  }


  function sizeCentrarMiniaturas(){

    var numItems = $('.miniatura').length;

    var size = ((numItems * 70) + 80);  // 40px de padding left y 40px de padding right para que no colisionen las miniaturas con las flechas

    $('.centrar_miniaturas').css('max-width', size + 'px');

  }sizeCentrarMiniaturas();


  function flechasSlideshow(direccion){

    switch(direccion){
      /*-- ******************* --*/
      /*-- Dirección Izquierda --*/
      /*-- ******************* --*/
      case -1:

        if ($('.miniatura_active').is(':first-child')) {  // En caso de que la clase activa sea la primera, pondremos la clase activa en la última imagen

          // Quitamos la clase 'miniatura_active' de la primera miniatura y la ponemos en la última
          $('.miniatura').removeClass('miniatura_active');
          $('.miniatura').last().addClass('miniatura_active');

          // Luego Quitamos la clase 'active_slideshow' de la primera imagen y se la ponemos en la última
          $('.active_slideshow').removeClass('active_slideshow');
          $('.img_slide > img').last().addClass('active_slideshow');

          // Ejecutamos el proceso de carga de la imagen
          adjustImg();

        }else{  // En caso de que no sea la primera pondremos la anterior imagen como activa ya que vamos hacia la izquierda

          // Detectamos cual es la clase activa actual de las miniaturas, sacando el numero de la imagen 'data'
          var miniatura_activa_actual = parseInt($('.miniatura_active').find('img').attr('data'));
          // Eliminamos la clase 'miniatura_active' actual
          $('.miniatura').removeClass('miniatura_active');
          // Ponemos la clase 'miniatura_active' en la anterior al número sacado del atributo 'data', por eso restamos -1
          $(".miniatura").eq((miniatura_activa_actual - 1)).addClass("miniatura_active");

          // Quitamos la clase 'active_slideshow' de la imagen actual y se la ponemos en la anterior
          $('.active_slideshow').removeClass('active_slideshow');
          $(".img_slide").find('img').eq((miniatura_activa_actual - 1)).addClass("active_slideshow");
          // Ejecutamos el proceso de carga de la imagen
          adjustImg();

        }

      break;

      /*-- ***************** --*/
      /*-- Dirección Derecha --*/
      /*-- ***************** --*/
      case 1:

        if ($('.miniatura_active').is(':last-child')) {  // En caso de que la clase activa sea la última, pondremos la clase activa en la primera imagen

          // Quitamos la clase 'miniatura_active' de la primera miniatura y la ponemos en la última
          $('.miniatura').removeClass('miniatura_active');
          $('.miniatura').first().addClass('miniatura_active');
          // Quitamos la clase 'active_slideshow' de la primera imagen y se la ponemos en la última
          $('.active_slideshow').removeClass('active_slideshow');
          $('.img_slide > img').first().addClass('active_slideshow');
          // Ejecutamos el proceso de carga de la imagen
          adjustImg();

        }else{  // En caso de que no sea la primera pondremos la siguiente imagen como activa ya que vamos hacia la derecha

          // Detectamos cual es la clase activa actual de las miniaturas, sacando el numero de la imagen 'data'
          var miniatura_activa_actual = parseInt($('.miniatura_active').find('img').attr('data'));
          // Eliminamos la clase 'miniatura_active' actual
          $('.miniatura').removeClass('miniatura_active');
          // Ponemos la clase 'miniatura_active' en la anterior al número sacado del atributo 'data', por eso restamos -1
          $(".miniatura").eq((miniatura_activa_actual + 1)).addClass("miniatura_active");

          // Quitamos la clase 'active_slideshow' de la imagen actual y se la ponemos en la anterior
          $('.active_slideshow').removeClass('active_slideshow');
          $(".img_slide").find('img').eq((miniatura_activa_actual + 1)).addClass("active_slideshow");
          // Ejecutamos el proceso de carga de la imagen
          adjustImg();

        }

      break;

      default:
        console.log("Esta acción no está permitida");

    }

  }
