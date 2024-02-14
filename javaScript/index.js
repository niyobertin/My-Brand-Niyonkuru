

let menuList = document.getElementById("nav");
menuList.style.maxHeight="0px";
function loadMenu(){
    
  if(menuList.style.maxHeight =="0px"){
    menuList.style.maxHeight ="100%";
  }else{
    menuList.style.maxHeight ="0px";
  }
}
