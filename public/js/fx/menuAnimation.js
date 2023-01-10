export function menuAnimation () {
    let detras = document.getElementById('detras')
    let delante = document.getElementById('delante')
   
        
        document.addEventListener('scroll', () => {
            //scrolly (numero en pixeles del scroll)
                if (scrollY <= 430) {
                    detras.classList.add('d-none')
                    delante.classList.remove('d-none')
                } else {
                    detras.classList.remove('d-none')
                }
        })
}