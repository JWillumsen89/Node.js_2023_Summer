//assignment: personalize the message

function sendName() {
    const clientName = document.getElementById('clientName').value;
    fetch(`/welcomeMessage?user=${clientName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(result => {
            console.log(result.data);
            const welcomeMessageHeader = document.getElementById('welcomeMessage');
            welcomeMessageHeader.innerText = result.data;
            welcomeMessageHeader.style.display = 'block';
        });
}
