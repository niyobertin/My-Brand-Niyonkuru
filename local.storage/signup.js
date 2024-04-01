const form = document.querySelector(".input-area");
const loader = document.querySelector("#loading-div");
const displayLoading = () =>{
loader.classList.add("display");

setTimeout(() =>{
    loader.classList.remove("display")
},1000 * 60 * 60);
}
const hideLoading = () =>{
loader.classList.remove("display")
}
const popMessage = document.querySelector(".pop-up-message");
const siginUp = (data) =>{
    const url = `https://mybrand-be-5zbq.onrender.com/api/v1/users`;
    displayLoading();
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        .then((response) => response.json())
        .then((data) =>{
            hideLoading();
            popMessage.innerHTML = data.message;
            popMessage.style.display = "block";
            setTimeout(() => {
                popMessage.style.display = "none";
                if(data.status === 201){
                    location.href = "../pages/login.html"
                }
                form.reset();
            }, 2000);
        })
        .catch(err =>{
            console.log(err.message)
        })
}
const siginUpButton = document.querySelector('.signUp');
siginUpButton.addEventListener('click',() => {
    const username = document.getElementById('username').value;
    const signUpEmail = document.getElementById('signupEmail').value;
    const signupPassword = document.getElementById('sign-up-password1').value;
const userDetails = {
    username:username,
    email:signUpEmail,
    password:signupPassword
}
siginUp(userDetails);
});