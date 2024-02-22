let optionButton = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("creatLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButton = document.querySelectorAll(".spacing");
let formatButton = document.querySelectorAll(".format");
let scriptButton = document.querySelectorAll(".script");
//Intial settings

const intializer = () => {
    //function call for highlighting buttons
    //No highlits for link, unlink,list, undo,redo
    //since they are one time operation
    highlighter(alignButtons,true);
    highlighter(spacingButton,true);
    highlighter(formatButton,false);
    highlighter(scriptButton,true);
}
//Main logic
const textModification = (command,defaultValue,value) =>{
    //execCommand exectes command on selected text
    document.execCommand(command,defaultValue,value);
};

//adding event listeners on buttons of basic operations
//that do not need a value paramenter
optionButton.forEach((button) => {
    button.addEventListener('click',() =>{
        textModification(button.id,false,null);
    });
});

//Ones that requre paramenter value like colors or font 
advancedOptionButton.forEach((button) => {
    button.addEventListener("change",() =>{
        textModification(button.id,false,button.value);
    });
})

//link
linkButton.addEventListener('click',()=>{
    let userLink = prompt('Provide your link');
    if(/http/i.test(userLink)){//regex to test if user link has http
        textModification(linkButton.id,false,userLink);
    }else{
        userLink = "http://" + userLink;
        textModification(linkButton.id,false,userLink);
    }
})

//Fuction to highlight a cliked button

const highlighter = (className,needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click",() =>{
            if(needsRemoval){
                let AlreadyActive = false;
                //if currently cliked button is already 
                //active
                if(button.classList.contains("active")){
                    AlreadyActive = true;
                }

            //Removing highlight from other buttons
            highlighterRemover(className);
              if(!AlreadyActive){
                  button.classList.add("active");
                }
            }else{
              button.classList.toggle('active'); 
            }
        });
    });
};

//function to temove the highlight
const highlighterRemover = (className) =>{
className.forEach((button) =>{
    button.classList.remove('active');
})
}
window.onload = intializer('active');

//Open and Clossing side nav bar

function openNav() {
    const sidNav =  document.getElementById("sidenav");
    if(sidNav.style.display === "none"){
      sidNav.style.display = "block"
    }else{
      sidNav.style.display = 'none';
    }
  }
  