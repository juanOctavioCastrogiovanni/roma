import { botonMovil } from './btnUser.js'
import { menuAnimation } from './menuAnimation.js'
import { photoDetailAnimation } from "./photoDetailAnimation.js"

window.onload = () => {
      photoDetailAnimation();
      menuAnimation();
      botonMovil();
}


















































    // se utiliza el .addListener porque devuelve la llamada del ancho del media query
    // mediaqueryList.addListener(function (EventoMediaQueryList) {
    //     si estamos en movil (<992px) EventoMediaQueryList.matches va a ser "true" caso contrario false
    //     console.log('Ejecutado el listener', EventoMediaQueryList.matches);
        
    //     document.addEventListener('scroll', () => {
    //         scrolly (numero en pixeles del scroll)
    //         const scrolled = scrollY
    //         console.log(scrolled)
    //         console.log(EventoMediaQueryList.matches)
    //         if (EventoMediaQueryList.matches) {
    //             if (scrolled <= 215) {
    //                 detras.classList.add('d-none')
    //                 delante.classList.remove('d-none')
    //             } else {
    //                 detras.classList.remove('d-none')
    //                 delante.classList.add('d-none')
    //             }
    //         } else {
    //             if (scrolled <= 330) {
    //                 detras.classList.add('d-none')
    //                 delante.classList.remove('d-none')
    //             } else {
    //                 detras.classList.remove('d-none')
    //                 delante.classList.add('d-none')
    //             }
    //         }
    //     })
    // });