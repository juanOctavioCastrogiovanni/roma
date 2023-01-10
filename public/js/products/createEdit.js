const { botonMovil } = require("../fx/btnUser");

let data = {};
let pass;
let rePass;
let err = [];
let dato = {
    name: false,
    price: false,
    description: false,
    category: false,
    slices: false,
    stock: false
}

let firstTime = {
    name: false,
    price: false,
    description: false,
    slices: false,
    stock: false
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
            case 'name':
                showError(e, validator.isLength(e.value, {
                    min: 2
                }));
                dato.name = test()
                firstTime.name = true
                break;
            case 'price':
                showError(e, validator.isNumeric(e.value, {
                    min: 1
                }));
                dato.price = test()
                firstTime.price = true
                break;
            case 'description':
                showError(e, validator.isLength(e.value, {
                    min: 20
                }));
                dato.description = test()
                firstTime.description = true
                break;
            case 'category':
                showError(e, !validator.isEmpty(e.value))
                dato.category = test()
                firstTime.category = true
                break;
            case 'slices':
                showError(e, (validator.isNumeric(e.value)&&(validator.isLength(e.value, {min: 0, max: 2}))))
                dato.slices = test()
                firstTime.slices = true
                break;
            case 'stock':
                showError(e, (validator.isNumeric(e.value)&&(validator.isLength(e.value, {min: 0, max: 6}))));
                dato.stock = test()
                firstTime.stock = true
                break;
            default:

        }
    }

    let form = document.getElementById('form');

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

    form.name.addEventListener('blur', function (e) {
        if (!firstTime.name) {
            switcheando('name', e.target);
        }
    })

    form.name.addEventListener('keyup', function (e) {
        if (firstTime.name) {
            switcheando('name', e.target);
        }
    })

    form.price.addEventListener('blur', function (e) {
        if (!firstTime.price) {
            switcheando('price', e.target);
        }
    })

    form.price.addEventListener('keyup', function (e) {
        if (firstTime.price) {
            switcheando('price', e.target);
        }
    })

    form.description.addEventListener('blur', function (e) {
        if (!firstTime.description) {
            switcheando('description', e.target);
        }
    })

    form.description.addEventListener('keyup', function (e) {
        if (firstTime.description) {
            switcheando('description', e.target);
        }
    })

    form.category.addEventListener('change', function (e) {
        switcheando('category', e.target);
    })

    form.slices.addEventListener('blur', function (e) {
        if (!firstTime.slices) {
            switcheando('slices', e.target);
        }
    })
    
    form.slices.addEventListener('keyup', function (e) {
        if (firstTime.slices) {
            switcheando('slices', e.target);
        }
    })

    form.stock.addEventListener('blur', function (e) {
        if (!firstTime.stock) {
            switcheando('stock', e.target);
        }
    })

    form.stock.addEventListener('keyup', function (e) {
        if (firstTime.stock) {
            switcheando('stock', e.target);
        }
    })

    form.submit.addEventListener('click', function (e) {
        switcheando('name', form.name);
        switcheando('price', form.price)
        switcheando('description', form.description)
        switcheando('category', form.category)
        switcheando('slices', form.slices)
        switcheando('stock', form.stock);

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


    /* ------- OCTA --------- */

    botonMovil();

}