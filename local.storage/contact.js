
//Querry submission.
const name = document.getElementById('name');
const email = document.getElementById('email');
const message  = document.getElementById('message');
const send_button = document.getElementById('send-message');
const form = document.querySelector('.input-area');
let   querries = JSON.parse(localStorage.getItem('querries'))
if(querries === null){
    querries = [];
}
send_button.addEventListener('click',(event) => {
    // local storage
    event.preventDefault();
    const query = {
        name:name.value,
        email:email.value,
        message:message.value
     }
    querries.push(query);
localStorage.setItem('querries',JSON.stringify(querries));
form.reset();
});
