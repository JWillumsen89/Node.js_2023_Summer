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


document.addEventListener('DOMContentLoaded', event => {
    const testEmailButton = document.getElementById('test-email-btn');

    testEmailButton.addEventListener('click', async () => {

        const response = await fetch('/sendTestEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            toastr.success('Test email sent successfully!', 'Success!');
        } else {
            toastr.error('Error sending test email!', 'Error!');
        }
    });
});
