
const blogList = document.getElementById('blog-list');
 const dataFromLocalStorage = JSON.parse(window.localStorage.getItem("blogs"));
 
console.log(dataFromLocalStorage);
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
contollerDiv.appendChild(image1);
contollerDiv.appendChild(image2);
contollerDiv.appendChild(image3);
view = document.querySelector('.view');
edit = document.querySelector('.edit');
deletes = document.querySelector('.delete');

 const div = document.createElement('div');
 div.classList.add("blog2");
const head = document.createElement("h2");
const content = document.createElement("p");
const headings =  document.createTextNode(dataFromLocalStorage[i].title);
const textContent = document.createTextNode(dataFromLocalStorage[i].descriptionb);
div.appendChild(blogImages);
head.appendChild(headings)
div.appendChild(head);
content.appendChild(textContent);
div.appendChild(textContent)
div.appendChild(contollerDiv);
blogContents.appendChild(div);
 }
 
 

 

 