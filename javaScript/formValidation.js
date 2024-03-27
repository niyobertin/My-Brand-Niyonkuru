//Email validation function
const emailValidation = (emailAdress) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailAdress.match(emailRegex);
}
//Validate input.
const generalInput  = (input) => {
    return (input.value === "" || input.value === null)
}
//Contact form Validation
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const nameLabel = document.getElementById("name-label");
const emailLabel = document.getElementById("email-label");
const messageLabel = document.getElementById("message-label");
//General input validation
const Validation = (variable,labelValue,content) => {
    if(generalInput(variable)){
        labelValue.style.color = 'red';
        labelValue.style.fontSize = 'small';
        labelValue.innerHTML = content;
    }
}
// Email validation
const emailVal = (variable,labelValue,content) =>{
    if(!emailValidation(variable.value)){
        labelValue.style.color = 'red';
        labelValue.style.fontSize = 'small';
        labelValue.innerHTML = content;
    }
}
//contact
const form_validation = () =>{
    Validation(name,nameLabel,'Please fill in your name');
    emailVal(email,emailLabel,'Provide a correct email');
    Validation(message,messageLabel,' Message can have at least  10 chracters!'); 
}
//Login
        const loginEmail = document.getElementById("loginEmail");
        const password  = document.getElementById("password");
        const login_email = document.getElementById('login-email');
        const password_label = document.getElementById("password-label");
        // Password Validation
        const passwordValidation = (passwordElement) =>{
            const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,8}$/;
            return passwordElement.match(passwordRegex);
        }

            // password
        const passwordVal = (variable,labelValue,content) =>{
            if(!passwordValidation(variable.value)){
                labelValue.style.color = 'red';
                labelValue.style.fontSize = 'small';
                labelValue.innerHTML = content;
            }
        }

        const loginValidation = () => {
            const user = {
                usernames:"Niynkuru Bertin",
                emails:'niyonkurubbertin@gmail.com',
                passworda:'Bertin12',
                passwordb:"Bertin12"
            }
        
            if(loginEmail.value === user.emails && password.value === user.passworda){
                window.location ='../pages/admin.html';  
              
            }else{
                emailVal(loginEmail,login_email,'Provide a correct email');
                passwordVal(password,password_label,"Your Password must be atleast 6-8 Chracters including numbers");
            }
        }
        
        // Sign up page
        const username = document.getElementById('username');
        const signUpEmail = document.getElementById('signupEmail');
        const signupPassword = document.getElementById('sign-up-password1');
        const confirmPas = document.getElementById('sign-up-password2');
        const username_label = document.getElementById('username-label');
        const emaillabel = document.getElementById('emailLabel');
        const passwordConfig1 = document.getElementById('password-config1');
        const passwordConfig2 = document.getElementById('password-config2');

        //sign up validator function
        const signUpValidate = () =>{
            Validation(username,username_label,"Provide a user name");
            emailVal(signUpEmail,emaillabel,"Provide a correct email");
            passwordVal(signupPassword,passwordConfig1,"Your Password must be atleast 6-8 Chracters including numbers");
            passwordVal(confirmPas,passwordConfig2,"Your Password must be the same");
            if(confirmPas.value !== signupPassword.value){
                passwordConfig2.style.color = 'red';
               passwordConfig2.style.fontSize = 'small';
               passwordConfig2.innerHTML = 'Password must be the same';
             }
        }
        //Adding blogs Variables
        const blogTitle = document.getElementById('blogTitle');
        const blogImage = document.getElementById('aplodImage');
        const description = document.getElementById('text-input');
        const blog = document.getElementById('blogTitle-label');
        const blogImg = document.getElementById('aplodImage-label');
        const blogDescription = document.getElementById('desc');
        //Blog validation Function

        const addBlogs = () =>{
            Validation(blogTitle,blog,"Blog Title is required*");
            Validation(blogImage,blogImg,"Image fild can not be empty");
            Validation(description,blogDescription,"Please Describe your blog");
        }
    
  //On key press function
    const keyPress = (element,content) => {
        element.style.color ="white";
        element.style.fontSize ='medium';
        element.innerHTML = content;
    }
    //contact  key press func
    const loardKeyPressFunc = () => {
        if(emailValidation(email.value)){
            keyPress(emailLabel,"Email");  
        }
        if(!generalInput(name)){
            keyPress(nameLabel,"Name");
        }
        if(!generalInput(message)){
            keyPress(messageLabel,"Message");
        }
    }
    //Login key press
    const loginFunc = () =>{
        if(emailValidation(loginEmail.value)){
            keyPress(login_email,'Email'); 
        }
       if(passwordValidation(password.value))
        keyPress(password_label,"Password");
     }
     //sign up key press funtion
    const signUpFunc = () =>{
        if(!generalInput(username)){
            keyPress(username_label,'Username');
        }
        if(emailValidation(signUpEmail.value)){
            keyPress(emaillabel,'Email'); 
        }
        if(passwordValidation(signupPassword.value)){
        keyPress(passwordConfig1,'Password');
        }
        if(passwordValidation(confirmPas.value)){
        keyPress(passwordConfig2,'Confirm password');
        }
    }
    //Key press on adding blogs func
    const hideError = () =>{
        if(!generalInput(blogTitle)){
            keyPress(blog,'Blog title');
        }
            keyPress(blogImg,'Uplod image');
        if(!generalInput(description)){
            keyPress(blogDescription,'Description');
        }
    }

    //Buttons click
    const contact_button = document.getElementById('send-message');
    const body = document.getElementById("body");
    //Function for calling func inside html
    const buttonClick = (button,func) => {
        button.addEventListener("click",() => {
            return func();
        })
        button.addEventListener("keypress",() =>{
            return func();
        })
    }
    const buttonKeyPress = (button,func) => {
        button.addEventListener("keypress",() =>{
            return func();
        })
    }
    buttonClick(contact_button,form_validation);
    buttonKeyPress(body,loardKeyPressFunc);
  

    
    




    
   
    
