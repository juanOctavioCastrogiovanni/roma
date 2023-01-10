let data = {};
let err = [];
let dato = {
    alias: false,
    city: false,
    prov: false,
    street: false,
    number: false,
    floor: false,
    departament: false,
    zip_code: false
}

let firstTime = {
    alias: false,
    city: false,
    prov: false,
    street: false,
    number: false,
    floor: false,
    departament: false,
    zip_code: false
}


window.onload = () => {

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
            case 'alias':
                showError(e, validator.isLength(e.value, {
                    min: 0
                }));
                dato.alias = test()
                firstTime.alias = true
                break;
            case 'city':
                showError(e, validator.isLength(e.value, {
                    min: 2
                }));
                dato.city = test()
                firstTime.city = true
                break;
            case 'prov':
                showError(e, validator.isLength(e.value, {
                    min: 2
                }));
                dato.prov = test()
                firstTime.prov = true
                break;
            case 'street':
                showError(e, validator.isLength(e.value, {
                    min: 2
                }));
                dato.street = test()
                firstTime.street = true
                break;
            case 'number':
                showError(e, validator.isNumeric(e.value, {
                    min: 2
                }));
                dato.number = test()
                firstTime.number = true
                break;
            case 'floor':
                showError(e, (e.value.length == 0 || (validator.isNumeric(e.value)&&(validator.isLength(e.value, {min: 1, max: 6}) ))));
                dato.floor = test()
                firstTime.floor = true
                break;
            case 'departament':
                showError(e, (true));
                dato.departament = test()
                firstTime.departament = true
                break;
            case 'zip_code':
                showError(e, (validator.isLength(e.value, {min: 4, max: 12})));
                dato.zip_code = test()
                firstTime.zip_code = true
                break;
            default:

        }
    }


    let form = document.getElementById('register-form');

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

    form.alias.addEventListener('blur', function (e) {
        if (!firstTime.alias) {
        switcheando('alias', e.target);
        }
    
    })
    form.alias.addEventListener('keyup', function (e) {
        if (firstTime.alias) {
        switcheando('alias', e.target);
        }
    })

    form.city.addEventListener('blur', function (e) {
        if (!firstTime.city) {
        switcheando('city', e.target);
        }
    })
    form.city.addEventListener('keyup', function (e) {
        if (firstTime.city) {
        switcheando('city', e.target);
        }
    })


    form.prov.addEventListener('blur', function (e) {
        if (!firstTime.prov) {
        switcheando('prov', e.target);
        }
    })
    form.prov.addEventListener('keyup', function (e) {
        if (firstTime.prov) {
        switcheando('prov', e.target);
        }
    })

   form.street.addEventListener('blur', function (e) {
        if (!firstTime.street) {
        switcheando('street', e.target);
        }
    })
    form.street.addEventListener('keyup', function (e) {
        if (firstTime.street) {
        switcheando('street', e.target);
        }
    })
    form.number.addEventListener('blur', function (e) {
        if (!firstTime.number) {
        switcheando('number', e.target);
        }
    })
    form.number.addEventListener('keyup', function (e) {
        if (firstTime.number) {
        switcheando('number', e.target);
        }
    })
    form.floor.addEventListener('blur', function (e) {
        if (!firstTime.floor) {
        switcheando('floor', e.target);
        }
    })
    form.floor.addEventListener('keyup', function (e) {
        if (firstTime.floor) {
        switcheando('floor', e.target);
        }
    })
    form.departament.addEventListener('blur', function (e) {
        if (!firstTime.departament) {
        switcheando('departament', e.target);
        }
    })
    form.departament.addEventListener('keyup', function (e) {
        if (firstTime.departament) {
        switcheando('departament', e.target);
        }
    })
    form.zip_code.addEventListener('blur', function (e) {
        if (!firstTime.zip_code) {
        switcheando('zip_code', e.target);
        }
    })
    form.zip_code.addEventListener('keyup', function (e) {
        if (firstTime.zip_code) {
        switcheando('zip_code', e.target);
        }
    })
    
    form.submit.addEventListener('click', function (e) {
        switcheando('alias', form.alias);
        switcheando('city', form.city)
        switcheando('prov', form.prov)
        switcheando('street', form.street)
        switcheando('number', form.number)
        switcheando('floor', form.floor);
        switcheando('departament', form.departament)
        switcheando('zip_code', form.zip_code);

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

    form.btnAddAddresses.addEventListener('click', function (e) {
        e.preventDefault()
    })



}