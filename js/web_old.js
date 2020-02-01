$(document).ready(function(){
  /*******************/
  /*-- HAMBURGUESA --*/
  /*******************/
  $('.hamburguesa_menu_cabecera_main').click(function(){
    $('.hamburguesa_menu_cabecera_main').toggleClass('open');
    $('.menu_cabecera_main').toggleClass('mostrar_menu_cabecera');
  });

  /************************************/
  /*-- MODAL LOGIN & MODAL REGISTRO --*/
  /************************************/
  // FIX IE (Doble Scroll) --> quitar overflow-y cuando está el modal abierto
  //LOGIN
  $('.boton_login').click(function() {
    $('.bg_modal_login').css('display','block');
    $('body').css('overflow-y','hidden');
  });
  $('.close_modal_login').click(function(){
    $('.bg_modal_login').css('display','none');
    $('body').css('overflow-y','auto');
  });
  $('.close_modal_login_2').click(function(){
    $('.bg_modal_login').css('display','none');
    $('body').css('overflow-y','auto');
  });
  /*$('.bg_modal_login').click(function(){        // Cerrar desde el background de fondo
    $('.bg_modal_login').css('display','none');
    $('body').css('overflow-y','auto');
  });*/
  $('.contenedor_modal_login').click(function(e){
     e.stopPropagation();
  });
  // IR A REGISTRO DESDE MODAL LOGIN
  $('.ir_a_registro').click(function(){
    $('.bg_modal_login').css('display','none');
    $('.bg_modal_registro').css('display','block');
    $('body').css('overflow-y','hidden');
  });
  //REGISTRO
  $('.boton_registro').click(function() {
    $('.bg_modal_registro').css('display','block');
    $('body').css('overflow-y','hidden');
  });
  $('.close_modal_registro').click(function(){
    $('.bg_modal_registro').css('display','none');
    $('body').css('overflow-y','auto');
  });
  $('.close_modal_registro_2').click(function(){
    $('.bg_modal_registro').css('display','none');
    $('body').css('overflow-y','auto');
  });
  /*$('.bg_modal_registro').click(function(){       // Cerrar desde el background de fondo
    $('.bg_modal_registro').css('display','none');
    $('body').css('overflow-y','auto');
  });*/
  $('.contenedor_modal_registro').click(function(e){
     e.stopPropagation();
  });
  // IR A LOGIN DESDE MODAL REGISTRARSE
  $('.ir_a_login').click(function(){
    $('.bg_modal_registro').css('display','none');
    $('.bg_modal_login').css('display','block');
    $('body').css('overflow-y','hidden');
  });
  /**********************/
  /*-- MODAL CONTACTO --*/
  /**********************/
  //CONTACTO
  $('.boton_contacto').click(function() {
    $('.bg_modal_contacto').css('display','block');
    $('body').css('overflow-y','hidden');
  });
  $('.close_modal_contacto').click(function(){
    $('.bg_modal_contacto').css('display','none');
    $('body').css('overflow-y','auto');
  });
  $('.close_modal_contacto_2').click(function(){
    $('.bg_modal_contacto').css('display','none');
    $('body').css('overflow-y','auto');
  });
  /*$('.bg_modal_contacto').click(function(){         // Cerrar desde el background de fondo
    $('.bg_modal_contacto').css('display','none');
    $('body').css('overflow-y','auto');
  });*/
  $('.contenedor_modal_contacto').click(function(e){
     e.stopPropagation();
  });

  /******************************/
  /*-- FORMULARIO DE CONTACTO --*/
  /******************************/

    $('.focus_in').focusin(function() {
      var valor = $('input.focus_in').attr('value');
      if(valor == "Nombre"){
        $(this).css({'border-color':'#ffb647'});
      }else if(valor == "Email"){
        $(this).css({'border-color':'#ffb647'});
      }else if(valor == "Obra"){
        $(this).css({'border-color':'#ffb647'});
      }else if(valor == "Enviar"){
        $(this).css({'border-color':'#ffb647'});
      }else{
        // textarea
        $(this).css({'border-color':'#ffb647'});
      }
    });
    $('.focus_in').focusout(function() {
        $('.focus_in').css({'border-color':'#f6f2e5'});
    });
    // Pulsar tecla enter para enviar formulario de contacto
    $(".boton_contenido_contacto input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            $(".formulario_contenido_contacto form").submit();
        }
    });

    /*-- ******* --*/
    /*-- PIE WEB --*/
    /*-- ******* --*/
    /* DESPLEGAR / OCULTAR PIE */
    $('.desplegar_pie_web').click(function(){
      if( ($(".pie_web").height() == 0) && ($(window).width() > 768) ){
        $(".pie_web").css('height','417px');
      } else if( ($(".pie_web").height() != 0) && ($(window).width() > 768) ){
        $(".pie_web").css('height','0');
      }
      $('.desplegar_pie_web > p > span').toggleClass('rotateSpanPie');
    });


    /* APARECER / DESAPARECER DIV PARA DESPLEGAR PIE - SEGÚN ALTURA*/
    function mostrarPiePagina(){

      var windowTop = $(document).scrollTop();
      var windowBottom = windowTop + window.innerHeight;

      if ( $('.centrar_carta_presentacion_main').length > 0 ) { // Si existe la clase '.centrar_carta_presentacion_main' haz lo siguiente

        var elementPositionTop = $('.centrar_carta_presentacion_main').offset().top;
        var elementPositionBottom = elementPositionTop + $('.centrar_carta_presentacion_main').height();
        mostrarPiePaginaMasAbajo( windowBottom, elementPositionBottom );

      }else if( $('.slideshow').length > 0 ){ // Si existe la clase '.slideshow' haz lo siguiente

        var elementPositionTop = $('.slideshow').offset().top;
        var elementPositionBottom = elementPositionTop + $('.slideshow').height();
        mostrarPiePaginaMasAbajo( windowBottom, elementPositionBottom );

        // Iremos metiendo el resto de páginas en más 'else if()' para acoplar el pie a la altura que necesite

      }else{  // En caso de que sea una página en la que no haya que calcular altura, muestra el pie de página siempre.
        $('.desplegar_pie_web').css('display','block');
      }

    }mostrarPiePagina();
    /* EXTRAER SOLO PARA LA MAIN */

    // Mostrar pie de página cuando tenga que ser debajo de un elemento concreto
    function mostrarPiePaginaMasAbajo( windowBottom, elementPositionBottom ){

      if( windowBottom >= (elementPositionBottom + 40) ){
        $('.desplegar_pie_web').css('display','block');
      }else{
        $('.pie_web').css('height','0');
        $('.desplegar_pie_web').css('display','none');
      }

    }

    function resizeMostrarPiePagina(){
      $(window).scroll(function() {
        mostrarPiePagina();
      });
    }resizeMostrarPiePagina();


    //DESAPARECER PIE EN CASO DE MWHEELDOWN ó MWHEELUP
    // mousewheel --> Chrome, Opera, EDGE, AVAST
    // DOMMouseScroll --> firefox
    $('body').on('mousewheel DOMMouseScroll', function(e){
      var windowTop = $(document).scrollTop();
      var windowBottom = windowTop + window.innerHeight;
      var elementPositionTop = $('.pie_web').offset().top;
      if( ($(window).width() > 768) && (elementPositionTop != windowBottom) ){
        if(e.originalEvent.detail > 0) {
           //scroll down
           $(".pie_web").css("height", "0px");
        }else {
           //scroll up
          $(".pie_web").css("height", "0px");
        }
      }

      /*-- ************* --*/
      /*-- MENU CABECERA --*/
      /*-- ************* --*/
      if( ($(window).width() <= 1060) && ($('.menu_cabecera_main').hasClass('mostrar_menu_cabecera')) ){
        $('.menu_cabecera_main').removeClass('mostrar_menu_cabecera');
      }
      /*-- ***************** --*/
      /*-- FIN MENU CABECERA --*/
      /*-- ***************** --*/
    });


    /*******************************************/
    /*-- Opacidad '.carta_presentacion_main' --*/
    /*******************************************/
    if( ($(window).width() > 1200) ){   // En caso de que estemos en monitor habrá efecto opacidad

      if( ($('header').offset().top + 70) >= 75 ){
        $('.carta_presentacion_main').css('opacity', '1');
      } else {
        $('.carta_presentacion_main').css('opacity','0');
      }

      $(window).scroll(function(){
        if( ($('header').offset().top + 70) >= 75 ){
          $('.carta_presentacion_main').css('opacity', '1');
        } else {
          $('.carta_presentacion_main').css('opacity', '0');
        }
      });

    }else{                            // En caso de que estemos en tablet o movil no habrá efecto opacidad
      $('.carta_presentacion_main').css('opacity', '1');
    }


    /***************************/
    /*-- MENSAJE DE LOGUEADO --*/
    /***************************/
    $('.info_logueado').click(function(){
      $('.info_logueado').css('display','none');
    });
    $('.cerrar_logueado').click(function(){
      $('.info_logueado').css('display','none');
    });
    $('.contenido_logueado').click(function(e){
       e.stopPropagation();
    });


    /******************************/
    /*-- ÑAPICA EN CONSTRUCCIÓN --*/
    /******************************/
    $('.nav_menu_cabecera_main > ul > li:nth-child(2)').click(function(){
      $('.nav_menu_cabecera_main > ul > li:nth-child(2) .pophover').show().delay(800).fadeOut();
    });

    $('.nav_menu_cabecera_main > ul > li:nth-child(4)').click(function(){
      $('.nav_menu_cabecera_main > ul > li:nth-child(4) .pophover').show().delay(2000).fadeOut();
    });

    $('.nav_menu_cabecera_main > ul > li:nth-child(5)').click(function(){
      $('.nav_menu_cabecera_main > ul > li:nth-child(5) .pophover').show().delay(2000).fadeOut();
    });

    $('.boton_registro').click(function(){
      $('.boton_registro .pophover').show().delay(2000).fadeOut();
    });
    

});//Document Ready
