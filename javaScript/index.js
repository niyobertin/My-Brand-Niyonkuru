let menuList = document.getElementById("link");
 function showhide()
{
    if (menuList.style.display === "none") {
        menuList.style.display = "block";
    }
    else {
        menuList.style.display = "none";
    }
}

window.onscroll =() => stickyNav();//excute the stickyNav on scroll
const navbar = document.getElementById("head");
const sticky = navbar.offsetTop;
const  stickyNav =()=> {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
//side bar navigation
// function openNav() {
//   document.getElementById("mySidenav").style.width = "250px";
// }

// function closeNav() {
//   document.getElementById("mySidenav").style.width = "0";
// }

// function hideIt(){
//   let nav=document.getElementById('link')
//   if(nav.style.display=="" || nav.style.display=='block')
//   nav.style.display = 'none'
//   else nav.style.display='block'
//   }
//   document.getElementById('link').addEventListener('click',hideIt)