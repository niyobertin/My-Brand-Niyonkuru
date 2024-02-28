
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
    sidNav.style.display = "block"
  }else{
    sidNav.style.display = 'none';
  }
}

// Sliders

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
      const controllSlideButtons = () => {
        sliderButtons[0].style.display = blogList.scrollLeft <= 0 ? "none" : "block";
        sliderButtons[1].style.display = blogList.scrollLeft >= maxLeftScroll ? "none" : "block";

      }
      blogList.addEventListener("scroll",() => {
        controllSlideButtons();
      })

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

