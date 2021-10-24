var correo = document.getElementById["correo"]
var contraseña = document.getElementById["contraseña"]

$.ajax({
    type: "POST",
    url: "F:/Proyectos_Java/Proyecto_Uninorte/Flask/app.py",
    data: { correo : correo, contraseña : contraseña}
  }).done(function( o ) {
     // do something
  });