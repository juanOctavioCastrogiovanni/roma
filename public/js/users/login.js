window.onload = () => {

    let err = [];
    let email;
    let pass;

    let emailFirstTime = false;
    let passFirstTime = false;

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
            case 'email':
                showError(e, validator.isEmail(e.value));
                email = test()
                emailFirstTime = true
                break;
            case 'pass':
                showError(e, validator.isLength(e.value, {
                    min: 8,
                    max: 99
                }));
                pass = test()
                passFirstTime = true
                break;
            default:

        }
    }

    let form = document.getElementById('login-form');

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

    form.email.addEventListener('blur', function (e) {
        if (!emailFirstTime) {
            switcheando('email', e.target);
        }
    })

    form.email.addEventListener('keyup', function (e) {
        if (emailFirstTime) {
            switcheando('email', e.target);
        }
    })

    form.password.addEventListener('blur', function (e) {
        if (!passFirstTime) {
            switcheando('pass', e.target);
        }
    })

    form.password.addEventListener('keyup', function (e) {
        if (passFirstTime) {
            switcheando('pass', e.target);
        }
    })

    form.submit.addEventListener('click', function (e) {
        switcheando('email', form.email);
        switcheando('pass', form.password);

        //console.log(err, email, pass)

        if (email || pass) {
            e.preventDefault();
        }
    })

}