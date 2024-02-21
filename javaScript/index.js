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
const navLinks = document.querySelectorAll('#link li');
navLinks.forEach((link) => {
  link.addEventListener("click",() =>{
    const navbar = document.getElementById("link");
    navbar.style.display = "none";
  })
})




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
    sidNav.style.display = "block"
  }else{
    sidNav.style.display = 'none';
  }
}

