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

   const like_coment = document.createElement("div");
   like_coment.classList.add('linke-coment');
   const like = document.createElement('img');
   like.src = "../images/like.JPG";
   const comment = document.createElement('img');
   comment.src = "../images/comment.JPG";
   const likeNumber = document.createElement('p');
   const commentNumber = document.createElement('p');
   let likeNo = document.createTextNode('12');
   let comentNo = document.createTextNode('20');
   like_coment.appendChild(likeNumber);
   like_coment.appendChild(like);
   likeNumber.appendChild(likeNo);
   like_coment.appendChild(comment);
   commentNumber.appendChild(comentNo);
   like_coment.appendChild(commentNumber);

   const summary = document.createElement('p');
   let  sumaryNote = document.createTextNode(dataFromLocalStorage[i].descriptionb);
   const summary_content = document.createTextNode(sumaryNote.textContent.slice(0,60) +"...");
   const readMore = document.createTextNode("Read More");
   des.classList.add("more");
   const pcontent = document.createTextNode(dataFromLocalStorage[i].title);
   blogDiv.appendChild(images);
   h3.appendChild(pcontent);
   blogDiv.appendChild(h3);
   summary.appendChild( summary_content);
   blogDiv.appendChild(summary)
   des.appendChild(readMore);
   blogDiv.appendChild(des);
   blogDiv.appendChild(like_coment)
   blogList.appendChild(blogDiv);
}
//reading single blog
const more = document.querySelectorAll(".more");
for(let i = 0;i<more.length;i++){
   more[i].addEventListener('click',() =>{
      window.location.href = "../pages/blog.html"; 
   })
}



















