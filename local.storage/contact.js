
const loader = document.querySelector("#loading");
const displayLoading = () =>{
  loader.classList.add("display");
  setTimeout(() =>{
     loader.classList.remove("display")
  },1000 * 60 * 60);
}
const hideLoading = () =>{
  loader.classList.remove("display")
}
//Submminting querries.
const popMessage = document.querySelector(".pop-up-message");
const send_button = document.getElementById('send-message');
const form = document.querySelector('.input-area');
 const sendQuerries = (data) =>{
    let   url = "https://mybrand-be-nkyz.onrender.com/api/v1/querries";
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
            form.reset();
            // window.location.reload();
          }, 2000);
    })
    .catch(err =>{
        console.log(err.message)
    })
 }
send_button.addEventListener('click',() => {
    const visitor = document.getElementById('name').value;
    const UserMessage  = document.getElementById('message').value;
    const postQuerry = {
        visitor:visitor,
        message:UserMessage
    }
    sendQuerries(postQuerry);
});
