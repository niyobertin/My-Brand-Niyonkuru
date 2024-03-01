const name = document.getElementById('name');
const email = document.getElementById('email');
const message  = document.getElementById('message');
const querries = [];
const send_button = document.getElementById('send-message');
const form = document.querySelector('.input-area');

send_button.addEventListener('click',(event) => {
    // local storage
    event.preventDefault();
    const query = {
        name:name.value,
        email:email.value,
        message:message.value
     }
    querries.push(query);
    console.log(querries)
localStorage.setItem('querries',JSON.stringify(querries));
form.reset();
});
