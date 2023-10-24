import toastr from 'https://cdn.skypack.dev/toastr';

toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: 'toast-bottom-center',
    preventDuplicates: false,
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '5000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
};


const form = document.getElementById('contact-form');
function attachEventListener(form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const requiredFields = form.querySelectorAll('input, textarea');
        let allFieldsFilled = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allFieldsFilled = false;
                field.value = '';

                switch (field.id) {
                    case 'name':
                        toastr.error('Please fill out your name.', 'Error!');
                        break;
                    case 'email':
                        toastr.error('Please fill out your email.', 'Error!');
                        break;
                    case 'message':
                        toastr.error('Please enter your message.', 'Error!');
                        break;
                }
            }
        });

        if (allFieldsFilled) {
            form.submit();
        }
    });
}

attachEventListener(form);
