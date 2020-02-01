/*$(document).ready(function(){

  $('tr > td:last-child').on('click', function() {
    $('.bg_modal_editar_usuario').css('display','block');
    $('body').css('overflow-y','hidden');
  });
  $('.close_modal_editar_usuario').on('click', function(){
    $('.bg_modal_editar_usuario').css('display','none');
    $('body').css('overflow-y','auto');
  });
  $('.bg_modal_editar_usuario').on('click', function(){
    $('.bg_modal_editar_usuario').css('display','none');
    $('body').css('overflow-y','auto');
  });
  $('.contenido_modal_editar_usuario').on('click', function(e){
     e.stopPropagation();
  });*/



var mod = new Modal("");
class Modal {

  constructor(email){
    this.email = email;
  }
  getEmail(){return this.email;}
  setEmail(email){this.email = email;}
}
/*ACOGE ID*/

function mostrar_datos_id(id){
    var email = $("tr:nth-child("+(id+2)+") > td:nth-child(1)").text();
    var nombre = $("tr:nth-child("+(id+2)+") > td:nth-child(2)").text();
    var apellidos = $("tr:nth-child("+(id+2)+") > td:nth-child(3)").text();
    generarModal(email, nombre, apellidos);
}

function generarModal(email, nombre, apellidos){
  //                            DA PROBLEMAS, PARA LA EJECUCIÓN
  //mod.setEmail(email);
  //alert(mod.getEmail());

  // FUnción Abrir / Cerrar Modal
  $('.bg_modal_editar_usuario').css('display','block');
  $('body').css('overflow-y','hidden');
  $('.close_modal_editar_usuario').click(function(){
    $('.bg_modal_editar_usuario').css('display','none');
    $('body').css('overflow-y','auto');
  });
  $('.bg_modal_editar_usuario').click(function(){
    $('.bg_modal_editar_usuario').css('display','none');
    $('body').css('overflow-y','auto');
  });
  $('.contenido_modal_editar_usuario').click(function(e){
     e.stopPropagation();
  });

  // Rellena los campos del modal
  cambiarInput('input_email_modal_editar_usuario', email);
  cambiarInput('input_nombre_modal_editar_usuario', nombre);
  cambiarInput('input_apellidos_modal_editar_usuario', apellidos);

}

function cambiarInput(nombre, datos){
  $('.' + nombre + ' > input').val(datos);
}

function editarInput(nombre){
  $("."+nombre).val("");
  var mod = new Modal(nombre);
  alert(mod.getEmail());
}

function modificarUsuario(){


}






//}); // DOcument Ready
