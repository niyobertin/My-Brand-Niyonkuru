const title = document.getElementById('blogTitle');
const image = document.getElementById('aplodImage');
const desc = document.getElementById('text-input');
const form = document.querySelector('form');
const button = document.getElementById('login-botton');
const content = document.querySelector('contents');
const blogImages = document.getElementById('blogImage');
let blogTitles = document.getElementById("blogTitle");
const blogContent = document.getElementById("blogContent")
const blogs =[];
let imageUrl;

image.addEventListener('change',() =>{
   const file = image.files[0];
 const fr = new FileReader();
 fr.addEventListener("load",() =>{
   imageUrl = fr.result;
   console.log(imageUrl);
 })
 fr.readAsDataURL(file);
 })






button.addEventListener('click',(event) => {
       // local storage
       event.preventDefault();
          const artical = {
              title:title.value,
              image:imageUrl,
              descriptionb:desc.innerText
           }
          blogs.push(artical);
      localStorage.setItem('blogs',JSON.stringify(blogs));
      form.reset();
      
});

const blogList = document.getElementById('blog-list');
 const dataFromLocalStorage = JSON.parse(window.localStorage.getItem("blogs"));
 
console.log(dataFromLocalStorage);

for(let i = 0;i < dataFromLocalStorage.length;i++){
   const blogDiv = document.createElement("div");
   blogDiv.classList.add("blog1");
   const images = document.createElement('img');
   images.src = dataFromLocalStorage[i].image;
   const des = document.createElement('p');
   const h3 = document.createElement('h3');
   const readMore = document.createTextNode("Read More");
   des.classList.add("more");
   const pcontent = document.createTextNode(dataFromLocalStorage[i].title);
   blogDiv.appendChild(images);
   h3.appendChild(pcontent);
   blogDiv.appendChild(h3);
   des.appendChild(readMore);
   blogDiv.appendChild(des);
   blogList.appendChild(blogDiv);
// adding in blogs section
}
const blogContents = document.querySelector(".blog2");
console.log(blogContents)
















