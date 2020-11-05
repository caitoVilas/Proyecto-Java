//******************************************************************************************* */
//
// Proyecto Java
// Caito 2020
//
//*****************************************************************************************++ */
const d = document,
     ls = localStorage;
let usuario,
    token;

     (function() {
        'use strict';
        window.addEventListener('load', function() {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName('needs-validation');
          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        }, false);
      })();


d.addEventListener('DOMContentLoaded', e => {

    verLoggin('#btn_loggin');
    ocultarLoggin('.btn_cancelar');
    logUser('#btn_ingresar');
    cerrarSesion();
    crearUsuario();

});


//  mostar  y ocultar loggin 

function verLoggin(btn){

    d.addEventListener('click', e => {
        
        const $formLoggin = d.querySelector('.panel'),
                  $button = d.getElementById('btn_loggin')
              
        if(e.target.matches(btn)) {
            $formLoggin.classList.toggle('is-active')
            $button.setAttribute('disabled','')
        }

    });
}


function ocultarLoggin(btn) {

    d.addEventListener('click', e => {
        const $formLoggin = d.querySelector('.panel'),
                  $button = d.getElementById('btn_loggin');

        if(e.target.matches(btn)) {
            
            $formLoggin.classList.remove('is-active');
            $button.removeAttribute('disabled');
        }

    });
}

// loguearse

function logUser(btn){

    const boton = d.getElementById('btn_ingresar'),
          $btn_cancellog = d.getElementById('cancel_login'),
             $formLoggin = d.getElementById('frm_loggin'),
                  $panel = d.querySelector('.panel'),
                $mensaje = d.getElementById('mensaje'),
                   $bLog = d.getElementById('btn_loggin');
   
    boton.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    
     const $buse = d.querySelector('.b_u'),
           $imge = d.querySelector('.user_img'),
           $slog = d.querySelector('.sin_loggin'),
        $section = d.querySelector('.logeado'),
            user = d.getElementById('user').value,
            pass = d.getElementById('pass').value;

    let request = {"nombreUsuario": user, "password": pass};


    
        fetch("http://localhost:8080/auth/login",{
            method: 'POST',
            mode: 'cors',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(request)
        })
        .then(response => response.ok? response.json(): Promise.reject(response))
        .then(data => {
            console.log(data.nombreUsuario);
            console.log(data.token);
            data.authorities.forEach(auth => console.log(auth));
            setInterval(() =>{
                $mensaje.textContent = '';
                $mensaje.classList.add('none');
                $mensaje.classList.remove('ok');
                $mensaje.classList.remove('error');

                // cerramos login y entramos a la web

                $panel.classList.remove('is-active');
                $bLog.setAttribute('hidden','');
                $buse.removeAttribute('hidden');
                $buse.textContent = usuario;
                $slog.setAttribute('hidden','');
                $section.removeAttribute('hidden');
                $imge.removeAttribute('hidden');

            },3000);
                $mensaje.textContent = `Bienvenido ${data.nombreUsuario}`;
                $mensaje.classList.remove('none');
                $mensaje.classList.remove('error');
                $mensaje.classList.add('ok');
                usuario = data.nombreUsuario;
                token = data.token;    
                
           
        })
        .catch(error => {
            setInterval(() =>{
                $mensaje.textContent = '';
                $mensaje.classList.add('none');
                $mensaje.classList.remove('ok');
                $mensaje.classList.remove('error');
            },3000);
                $mensaje.textContent = 'Usuario no Autorizado';
                $mensaje.classList.remove('none');
                $mensaje.classList.remove('ok');
                $mensaje.classList.add('error');

            
            console.log('Usuario no Autirizado')});

   });

   $btn_cancellog.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    
    $mensaje.classList.add('none');
    $formLoggin.reset();
    $panel.classList.remove('is-active');
    $bLog.removeAttribute('disabled');
    
});


   
}

function cerrarSesion(){
    const  $bLog = d.querySelector('.b_l'),
           $buse = d.querySelector('.b_u'),
           $cesion = d.getElementById('btn_cerrar'),
           $imge = d.querySelector('.user_img'),
           $slog = d.querySelector('.sin_loggin'),
          $section = d.querySelector('.logeado');

    $cesion.addEventListener('click', e => {
       
            $buse.setAttribute('hidden','');
            $imge.setAttribute('hidden','');
            $bLog.removeAttribute('hidden');
            $bLog.removeAttribute('hidden');
            $section.setAttribute('hidden','')
            $slog.removeAttribute('hidden');
            usuario = '';
            token = '';
            location.reload();
            alert('Has Cerrado Session nos vemos pronto!')
        
    });
}

function crearUsuario() {
    const $frm_registro = d.getElementById('frm_registro'),
    $nombre = d.getElementById('r_name'),
    $email  = d.getElementById('r_mail'),
    $nombreUsuario  = d.getElementById('r_uname'),
    $pass  = d.getElementById('r_pass'),
    $btn_ok = d.getElementById('ok_nuevo'),
    $btn_cancel = d.getElementById('cancel_nuevo');

    // capturo los span para los mensajes
    const $sName = d.getElementById('s_name'),
    $sMail = d.getElementById('s_mail'),
    $sUnam = d.getElementById('s_unam'),
    $sPass = d.getElementById('s_pass'),
    $msje = d.getElementById('msje_nuevo');


    // Validaciones

    let validNombre = false,
    validUser  = false,
    validMail  = false,
    validPass   = false;

    $btn_ok.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    if($nombre.value === '') {

        $sName.textContent = 'el Nombre no puede estar vacio';
        $sName.classList.remove('none');
        $sName.classList.remove('ok');
        $sName.classList.add('error');
        validNombre = false;
    }else {
        $sName.textContent = 'OK';
        $sName.classList.remove('none');
        $sName.classList.remove('error');
        $sName.classList.add('ok');
        validNombre = true;
    
    }

    if($email.value === ''){

        $sMail.textContent = 'El email no puede estar vacio';
        $sMail.classList.remove('none');
        $sMail.classList.remove('ok');
        $sMail.classList.add('error');
        validMail = false;
        } else {
        const regex = /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i
        .test($email.value);
        if(!regex){
           $sMail.textContent = 'el email no es valido';
           $sMail.classList.remove('none');
           $sMail.classList.remove('ok');
           $sMail.classList.add('error');
           validMail = false;
        }else{
           $sMail.textContent = 'OK';
           $sMail.classList.remove('none');
           $sMail.classList.remove('error');
           $sMail.classList.add('ok');
           validMail = true;
        }
        }

        if($nombreUsuario.value === '') {

            $sUnam.textContent = 'el Nombre de usuario es Obligatorio';
            $sUnam.classList.remove('none');
            $sUnam.classList.remove('ok');
            $sUnam.classList.add('error');
            validUser = false;
          }else {
            $sUnam.textContent = 'OK';
            $sUnam.classList.remove('none');
            $sUnam.classList.remove('error');
            $sUnam.classList.add('ok');
            validUser = true;
          }

          if($pass.value === '') {

            $sPass.textContent = 'la contraseña es Obligatoria';
            $sPass.classList.remove('none');
            $sPass.classList.remove('ok');
            $sPass.classList.add('error');
            validPass = false;
            }else {
            $sPass.textContent = 'OK';
            $sPass.classList.remove('none');
            $sPass.classList.remove('error');
            $sPass.classList.add('ok');
            validPass = true;
            }  
            
        // cuando todo esta oK

        if (validNombre && validUser && validMail && validPass) {
            const req = {"nombre": $nombre.value,  "nombreUsuario": $nombreUsuario.value, "email": $email.value,
             "password": $pass.value, "rol": ["ROL_USER"]};
            console.log(JSON.stringify(req));

            fetch("http://localhost:8080/auth/nuevo",{
            method: 'POST',
            mode: 'cors',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req)
            })
            .then(response => response.ok? response.json(): Promise.reject(response))
            .then(data => {
                setInterval(() =>{
                    $msje.textContent = '';
                    $msje.classList.add('none');
                    $msje.classList.remove('error');
                    $msje.classList.remove('ok');

                    // limpiamos el formulario
                    $sName.classList.add('none');
                    $sMail.classList.add('none');
                    $sUnam.classList.add('none'); 
                    $sPass.classList.add('none');
                    $msje.classList.add('none');
                    $frm_registro.reset();


                },3000);
                    $msje.textContent = 'El usuario ha sido guardado con exito!!';
                    $msje.classList.remove('none');
                    $msje.classList.remove('error');
                    $msje.classList.add('ok');

                


            })
            .catch(error => {
                setInterval(() =>{
                    $msje.textContent = '';
                    $msje.classList.add('none');
                    $msje.classList.remove('ok');
                    $msje.classList.remove('error');
                },4000);
                    $msje.textContent = 'El nombre de usuario o el email ya existen';
                    $msje.classList.remove('none');
                    $msje.classList.remove('ok');
                    $msje.classList.add('error');
             });
        }


    });

    $btn_cancel.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        
        $sName.classList.add('none');
        $sMail.classList.add('none');
        $sUnam.classList.add('none'); 
        $sPass.classList.add('none');
        $frm_registro.reset();
        const $panel = d.querySelector('.panel'),
        $button = d.getElementById('btn_loggin');
        $panel.classList.remove('is-active');
        $button.removeAttribute('disabled');
    });

    
}


