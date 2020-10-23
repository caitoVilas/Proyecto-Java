//******************************************************************************************* */
//
// Proyecto Java
// Caito 2020
//
//*****************************************************************************************++ */
const d = document,
     ls = localStorage;

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
    cerrarSesion('.b_cs');
    validacionRegistro();

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
   
    d.addEventListener('click', e => {
    //e.preventDefault();
    
    const $formLoggin = d.getElementById('frm_loggin'),
         $panel = d.querySelector('.panel'),
          $bLog = d.getElementById('btn_loggin'),
          $buse = d.querySelector('.b_u'),
          $imge = d.querySelector('.user_img'),
          $slog = d.querySelector('.sin_loggin'),
          $section = d.querySelector('.logeado');
         
    
        if(e.target.matches(btn)){
            
           if(ls.getItem($formLoggin.username.value) && $formLoggin.password.value === ls.getItem($formLoggin.username.value)){
            alert(`Bienvenido ${$formLoggin.username.value} `);
            $bLog.setAttribute('hidden','');
            $buse.removeAttribute('hidden');
            $buse.innerHTML = $formLoggin.username.value;
            $imge.removeAttribute('hidden')
            $panel.classList.remove('is-active');
            $formLoggin.reset();
            $slog.setAttribute('hidden','');
            $section.removeAttribute('hidden');
           }else {
             alert('Usuario no registrado');
           }
   
        }

   });
}

function cerrarSesion(btn){
    const  $bLog = d.querySelector('.b_l'),
           $buse = d.querySelector('.b_u'),
           $imge = d.querySelector('.user_img'),
           $slog = d.querySelector('.sin_loggin'),
          $section = d.querySelector('.logeado');

    d.addEventListener('click', e => {
        if(e.target.matches(btn)){
            $buse.setAttribute('hidden','');
            $imge.setAttribute('hidden','');
            $bLog.removeAttribute('hidden');
            $bLog.removeAttribute('disabled');
            $section.setAttribute('hidden','')
            $slog.removeAttribute('hidden');
            alert('Has Cerrado Session nos vemos pronto!')
        }
    });
}

function validacionRegistro(){
    const $form = d.getElementById('frm_registro'),
    $inputs = d.querySelectorAll('.fgr [required]');
    
    $inputs.forEach(input => {
        
        const $span = d.createElement('span');
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add('frm_registro-error','none')
        input.insertAdjacentElement('afterend', $span);
    });

    d.addEventListener('keyup', (e) => {

        if(e.target.matches('.fgr [required]')){
            let $input = e.target,
               pattern = $input.pattern;
               if(pattern){
                  let regex = new RegExp(pattern);
                  return !regex.exec($input.value)
                  ?d.getElementById($input.name).classList.add('is-active')
                  :d.getElementById($input.name).classList.remove('is-active')
                }
                if(!pattern){
                    return $input.value === ''
                    ?d.getElementById($input.name).classList.add('is-active')
                    :d.getElementById($input.name).classList.remove('is-active')
                }
            }
    });

    d.addEventListener('submit', e => {
        const $loader = d.getElementById('loader');
        $loader.classList.remove('none');
 
       const user = d.getElementById('r_uname').value;
       const pass = d.getElementById('r_pass').value;
       
        
        ls.setItem(user,pass);
        setTimeout(()=> {
            $loader.classList.add('none');
        },3000);


        
        
    });
}
