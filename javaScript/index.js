
 function showhide()
{
  let menuList = document.getElementById("link");
    if (menuList.style.display !== "none") {
        menuList.style.display = "none";
    }
    else {
      menuList.style.transition = "1s"; 
        menuList.style.display = "block";
    }
}
