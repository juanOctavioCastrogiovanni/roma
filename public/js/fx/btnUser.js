export function botonMovil () {
    
    //Variables para animacion boton user
    let btn = document.getElementById('userBtn')
    let animation = document.getElementById('userBtnClick')
    let body = document.querySelectorAll('.h')
    let flag = false;
    let flag2 = false;


        //function 
function close() {
    animation.classList.add('hiddenAnimation')
    animation.classList.remove('playing')
    flag = true;
    animation.style.height = "0"
    animation.style.width = "0"
    flag2 = false

}

    
//animation btn user

if(btn != null){
    btn.addEventListener('click', () => {
        if (!flag2) {
            animation.classList.add('playing')
            animation.style.height = "177px"
            animation.style.width = "150px"
            if (flag) {
                animation.classList.remove('hiddenAnimation')
            }
            flag2 = true
        } else {
            close()
        }
    })




    


    for (let i = 0; i < body.length; i++) {
       
        body[i].addEventListener('mouseover', () => {
            if (flag2) {
                close()
            }
        })
    }
 }
}






