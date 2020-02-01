/******************************************************/
/*--                                                --*/
/*-- Quitar Efecto Escalado Galería En TABLET Y MVL --*/
/*--                                                --*/
/******************************************************/

// Solo afectará a los que de primeras tengan ese tamaño de pantalla, no a los monitores cuando hagan resize de pantalla
var anchoPantalla = $(window).width();
if(anchoPantalla <= 1200){
  $('.carta_presentacion_producto').css({
    'transform':'none',
      '-webkit-transform':'none',
      '-moz-transform':'none',
      '-ms-transform':'none',
      '-o-transform':'none',
    'transition':'none',
      '-webkit-transition':'none',
      '-moz-transformtransition':'none',
      '-ms-transition':'none',
      '-o-transition':'none',
    'box-shadow':'0 10px 3px -6px rgba(0, 0, 0, 0.2)',
      '-webkit-box-shadow':'0 10px 3px -6px rgba(0, 0, 0, 0.2)',
      '-moz-box-shadow':'0 10px 3px -6px rgba(0, 0, 0, 0.2)'
    });
  }
