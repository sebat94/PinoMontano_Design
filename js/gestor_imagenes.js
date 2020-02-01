$(document).ready(function(){

  $('.tabla_gestor_imagenes tr > td:nth-child(5)').click(function(){
    $(location).attr('href', 'editar_tabla_gestor_imagenes.html');
  });
  /*function location_gestor_imagenes() {
    location.href = "editar_tabla_gestor_imagenes.html";
  }*/


}); // Document Ready
