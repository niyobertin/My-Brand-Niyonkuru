
let menuList = document.getElementById("link");
 function showhide()
{
    if (menuList.style.display === "none") {
        menuList.style.display = "block";
        const navLinks = document.querySelectorAll('#link li');
        navLinks.forEach((link) => {
        link.addEventListener("click",() =>{
        const navbar = document.getElementById("link");
        navbar.style.display = "none";
        location.reload();
      })
    })
    }
    else {
        menuList.style.display = "none";
    }
}
window.onscroll =() => stickyNav();//excute the stickyNav on scroll
const navbar = document.getElementById("head");
const sticky = navbar.offsetTop;
const  stickyNav =()=> {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

function openNav() {
  const sidNav =  document.getElementById("sidenav");
  if(sidNav.style.display === "none"){
    sidNav.style.display = "block";
  }else{
    sidNav.style.display = 'none';
  }
}

const userProfile = document.getElementById("login-profile");
const loggedInUser = localStorage.getItem('logedInUser');
const logoutp = document.querySelector("#logout");
const userNameInfo = document.querySelector("#user-name");
const userEmail = document.querySelector("#user-email");
const dashboard = document.querySelector("#dashboard")
const userData = JSON.parse(loggedInUser);
if(loggedInUser){
  userNameInfo.innerHTML = userData.usersName;
    userEmail.innerHTML = userData.email;
  userProfile.innerHTML = '🙎‍♂️'
  userProfile.style.border = "yellow 1px solid";
  userProfile.style.borderRadius = "50%" 
}
logoutp.addEventListener('click',() =>{
  localStorage.removeItem("logedInUser");
  location.href ="../pages/home.html";
})
const logoutMenu = document.querySelector('.dropdown');
const userJsonData = JSON.parse(loggedInUser);
if(userJsonData.role){
    dashboard.style.display ='block';
}
userProfile.addEventListener('click',()=>{
if(loggedInUser){
  if(logoutMenu.style.display === 'none'){
    logoutMenu.style.display = 'block';
    logoutMenu.animate({transform:['scale(0)','scale(0)','scale(1)']},500);
  }else{
    logoutMenu.animate({transform:['scale(1)','scale(1)','scale(0)']},1000);
    logoutMenu.style.display = 'none';
  }
}else{
  location.href = "../pages/login.html";
}
})



const initSlider = () =>{
        const blogList = document.querySelector(".blogs-list")
        const sliderButtons = document.querySelectorAll(".slide-buton");
        const maxLeftScroll = blogList.scrollWidth - blogList.clientWidth;
      sliderButtons.forEach((button) => {
        button.addEventListener('click',() => {
          const direction = button.id ==="next-slide" ? -1 : 1;//ternary operations
          const scrollAmount = blogList.clientWidth * direction;
          blogList.scrollBy({left:scrollAmount,behavior:"smooth"});
        });
      });
};
//Function for calling func inside html
const buttonClick = (button,func) => {
  button.addEventListener("click",() => {
      return func();
  })
}
const menu_button = document.getElementById('menuIcon');
buttonClick(menu_button,showhide)
window.addEventListener('load',initSlider);


