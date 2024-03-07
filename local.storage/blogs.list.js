
const blogList = document.getElementById('blog-list');
 const dataFromLocalStorage = JSON.parse(localStorage.getItem("blogs"));
 
// console.log(dataFromLocalStorage);
let view,edit,deletes;
const blogContents = document.querySelector(".contents");
for(let i = 0;i < dataFromLocalStorage.length;i++){
 // adding in blogs page list
 const contollerDiv = document.createElement('div');
 contollerDiv.classList.add("controllers")
 const image1 = document.createElement("img");
 image1.src = "../images/Remove red eye.jpg";
 image1.classList.add('view');
 const image2 = document.createElement("img");
 image2.classList.add('edit');
 image2.src = "../images/Mode edit.jpg";
 const image3 = document.createElement("img");
 image3.classList.add('delete');
 const blogImages = document.createElement('img');
 blogImages.src = dataFromLocalStorage[i].image;
image3.src = "../images/Delete.jpg";        

contollerDiv.appendChild(image2);
contollerDiv.appendChild(image3);
view = document.querySelectorAll('.view');
edit = document.querySelectorAll('.edit');
deletes = document.querySelectorAll('.delete');

 const div = document.createElement('div');
 div.classList.add("blog2");
const head = document.createElement("h2");
const content = document.createElement("p");
const headings =  document.createTextNode(dataFromLocalStorage[i].title);
const textContent = document.createTextNode((dataFromLocalStorage[i].descriptionb).replace(/<[^>]*>?/gm, ''));
div.appendChild(blogImages);
head.appendChild(headings)
div.appendChild(head);
content.appendChild(textContent);
div.appendChild(textContent)
div.appendChild(contollerDiv);
blogContents.appendChild(div);
 }
 
 // updating blogs
    const title = document.getElementById('blogTitle');
    const image = document.getElementById('aplodImage');
    const desc = document.getElementById('text-input');
    const button = document.getElementById('login-botton');
    const conteiner = document.querySelector('.conteiner');
    const form = document.querySelector('form');
    let imageUrl;// hold the Image url from fileReader
    const newData = JSON.parse(localStorage.getItem('blogs'));
    //FileReader
    image.addEventListener('change',() =>{
        const file = image.files[0];
      const fr = new FileReader();
      fr.addEventListener("load",() =>{
        imageUrl = fr.result;
        // console.log(imageUrl);
      })
      fr.readAsDataURL(file);
      })


//editing a blog
 for(let i = 0;i < edit.length;i++){
    for(let j = 0; j < dataFromLocalStorage.length;j++){
        edit[i].addEventListener('click',() => {
            if(i === j){
                conteiner.style.display = 'block';
                 blogContents.style.display = 'none';
                 conteiner.animate({transform:['scale(0)','scale(0)','scale(1)']},500);
                if(dataFromLocalStorage[i]){
                   title.value = dataFromLocalStorage[i].title;
                   imageUrl = dataFromLocalStorage[i].image;
                   desc.innerHTML = dataFromLocalStorage[i].descriptionb; 
                   button.addEventListener("click",(event) => {
                    event.preventDefault();
                    newData[i].title = title.value;
                    newData[i].image = imageUrl || newData[i].dataFromLocalStorage[i].image;
                    newData[i].descriptionb=desc.innerHTML;
                
                    localStorage.setItem('blogs',JSON.stringify(newData));
                     form.reset();
                    alert('Blogs updated successfully!');
                })
                }else{
                    alert("the local storage is empty")
                } 
            }  
        })
    }
 }


//closing window function
const close_button = document.getElementById('close');
    close_button.addEventListener("click",(event) => {
        event.preventDefault();
        if((conteiner.style.display = "block") && (blogContents.style.display = 'none')){
            conteiner.style.display = "none";
            blogContents.style.display = 'block'
            blogContents.animate({transform:['scale(0)','scale(0)','scale(1)']},500);
            }else{
            conteiner.style.display = "block" 
            conteiner.animate({transform:['scale(1)','scale(0)','scale(0)']},500);
            blogContents.style.display = 'none';
            }
    })
  

 //deleting blog
 for(let i = 0;i<=deletes.length;i++){
    for(let j = 0;j < dataFromLocalStorage.length;j++){
        deletes[i].addEventListener("click",() =>{
        if(i === j){
            const index = dataFromLocalStorage.indexOf(dataFromLocalStorage[i]);
            if(index > -1){
                dataFromLocalStorage.splice(index,1);
               let  newData = JSON.stringify(dataFromLocalStorage);
                localStorage.setItem('blogs',newData);
                window.location.reload();
            }
        }
        })
    }
    
 }
 

 

 

 

 