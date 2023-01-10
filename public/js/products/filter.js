    
let data = {};
let filterMin;
let filterMax;
let err = [];
let dato = {
    filterMin: false,
    filterMax: false
}

let firstTime = {
    filterMin: false,
    filterMax: false
}

let form = document.getElementById('formFilter');

window.onload = () => {

    let btn = document.getElementById('userBtn')
    let animation = document.getElementById('userBtnClick')
    let body = document.querySelectorAll('.h')
    let detras = document.getElementById('detras')
    let delante = document.getElementById('delante')
    var mediaqueryList = window.matchMedia("(max-width: 992px)");
    let flag = false;
    let flag2 = false;

    

// la animacion de nav

mediaqueryList.addListener(function (EventoMediaQueryList) {
    console.log('Ejecutado el listener', EventoMediaQueryList.matches);
    document.addEventListener('scroll', () => {
        const scrolled = scrollY
        if (EventoMediaQueryList.matches) {
            if (scrolled < 215) {
                detras.classList.add('d-none')
                delante.classList.remove('d-none')
            } else {
                detras.classList.remove('d-none')
                delante.classList.add('d-none')
            }
        } else {
            if (scrolled < 330) {
                detras.classList.add('d-none')
                delante.classList.remove('d-none')
            } else {
                detras.classList.remove('d-none')
                delante.classList.add('d-none')
            }
        }
    })
});




document.addEventListener('scroll', () => {
    const scrolled = scrollY
    if (scrolled < 215) {
            detras.classList.add('d-none')
            delante.classList.remove('d-none')
} else {
            detras.classList.remove('d-none')
            delante.classList.add('d-none')
        }
    if (scrolled < 330) {
            detras.classList.add('d-none')
            delante.classList.remove('d-none')
    } else {
            detras.classList.remove('d-none')
            delante.classList.add('d-none')
    }
})


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




function close() {
    animation.classList.add('hiddenAnimation')
    animation.classList.remove('playing')
    flag = true;
    animation.style.height = "0"
    animation.style.width = "0"
    flag2 = false

}


for (let i = 0; i < body.length; i++) {
   
    body[i].addEventListener('mouseover', () => {
        if (flag2) {
            close()
        }
    })
}














    console.log('llega')
    function test() {
        if (err.length > 0) {
            err = [];
            return true
        } else {
            return false
        }
    }

    function switcheando(expression, e) {
        switch (expression) {
            case 'filterMin':
                showError(e, validator.isLength(e.value, {min: 0, max: 9999}));
                filterMin = e.value.toString()
                dato.filterMin = test() //false
                firstTime.filterMin = true
                break;
            case 'filterMax':
                showError(e, validator.equals(pass, e.value));
                filterMax = e
                dato.filterMax = test()
                firstTime.rePass = true
                break;
            default:

        }
    }

    

    let showError = (el, bool = false) => {
        if (bool) {
            el.classList.remove('is-invalid');
            el.classList.add('text-success');
            el.nextElementSibling.classList.replace('d-inline-block', 'd-none');
        } else {
            el.classList.remove('text-success');
            el.classList.add('is-invalid');
            el.nextElementSibling.classList.replace('d-none', 'd-inline-block');
            err.push('error');
        }
    }
    console.log('hola')
    form.filterPriceMin.addEventListener('blur', function (e) {
        
        if (!firstTime.filterMin) {
        switcheando('filterMin', e.target);
        if (filterMax) {
        switcheando('filterMax', filterMax)
        }}
    })
    
    form.filterPriceMin.addEventListener('keyup', function (e) {
        if (firstTime.filterMin) {
        switcheando('filterMin', e.target);
        if (filterMax) {
            switcheando('filterMax', filterMax)
            }}
    })

    form.filterPriceMax.addEventListener('blur', function (e) {
        if (!firstTime.filterMax) {
        switcheando('filterMax', e.target);
        }
    })
    
    form.filterPriceMax.addEventListener('keyup', function (e) {
        if (firstTime.filterMax) {
        switcheando('filterMax', e.target);
        }
    })

    form.submit.addEventListener('click', function (e) {
        switcheando('filterMin', form.filterMin);
        switcheando('filterMax', form.filterMax)
        

        let flag = false
        for (let v in dato) {
            if (dato[v] == true) {
                flag = true
            }
        }
        if (flag) {
            e.preventDefault();

        }
    })


}




