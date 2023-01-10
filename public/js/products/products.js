window.onload = ()=> {
    let unit_price = document.getElementById('unit_price')
    let interv_price = document.getElementById('interv_price')
    let unit = document.querySelectorAll('.unit')
    let interv = document.querySelector('.interv')

    
    unit_price.addEventListener('click', ()=>{

            interv.classList.add('d-none')
            unit[0].classList.remove('d-none')
            unit[1].classList.remove('d-none')
            interv_price.classList.remove('d-none')
            unit_price.classList.add('d-none')
    })

    interv_price.addEventListener('click', ()=>{
        interv.classList.remove('d-none')
        unit[0].classList.add('d-none')
        unit[1].classList.add('d-none')
        interv_price.classList.add('d-none')
        unit_price.classList.remove('d-none')
})


}