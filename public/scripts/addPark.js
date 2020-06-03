
const parkForm = document.getElementById('park-form');
const parkId = document.getElementById('park-id');
const parkAddress = document.getElementById('park-address');

// Send POST to API to add park
async function addPark(e) {
    e.preventDefault();
    if (parkId.value === '' || parkAddress.value === '') {
        alert('Please fill in fields');
    };
    const sendBody = {
        parkId: parkId.value,
        address: parkAddress.value
    };

    try {
        const res = await fetch('/api/v1/parks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)
        });
        if (res.status === 400) {
            throw Error('Park already exists!');
        };
        alert('Skatepark added successfully!');
        window.location.href = '/index.html';
    } catch (error) {
        console.log(error);
        alert(error);
        return;
    };
};

parkForm.addEventListener('submit', addPark);
