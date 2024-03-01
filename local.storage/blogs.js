const title = document.getElementById('blogTitle');
const image = document.getElementById('aplodImage');
const desc = document.getElementById('text-input');
const form = document.querySelector('form');
const button = document.getElementById('login-botton');
const content = document.querySelector('contents');
const blogImages = document.getElementById('blogImage');
let blogTitles = document.getElementById("blogTitle");
const blogContent = document.getElementById("blogContent")
let imageUrl;
// const blogs = JSON.parse(localStorage.getItem('blogs'));
const blogs = [];

image.addEventListener('change',() =>{
   const file = image.files[0];
 const fr = new FileReader();
 fr.addEventListener("load",() =>{
   imageUrl = fr.result;
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
//single pafe view.
const more = document.querySelectorAll(".more");
const blogimage = document.getElementById("blog-image");
const blogHeading = document.getElementById("blogHeading")
const mainpage = document.getElementById("blogDesc");
const single = document.querySelector(".single");
const all = document.querySelector('.all');

for(let i = 0;i<more.length;i++){
   for(let j = 0;j < dataFromLocalStorage.length;j++){
       more[i].addEventListener("click",() =>{
       if(i === j){
         blogimage.src= dataFromLocalStorage[i].image;
         blogHeading.innerHTML = dataFromLocalStorage[i].title;
         mainpage.innerHTML = dataFromLocalStorage[i].descriptionb;
       }
       single.style.display = 'block';
       single.animate({transform:['scale(0)','scale(0)','scale(1)']},500);
       all.style.display = "none"
       })
   } 
}
console.log(single)

const closing = () =>{
if(single.style.display = "block" &&(all.style.display = "none")){
   single.style.display = "none"
   all.style.display = "block"
   all.animate({transform:['scale(0)','scale(0)','scale(1)']},500);
}else{
   single.style.display = "none"
   all.style.display = "none" 
}
}

const contollerDiv = document.createElement('div');
contollerDiv.classList.add("controllers")
const image1 = document.createElement("img");
image1.src = "../images/like.JPG";
image1.classList.add('view');
const image2 = document.createElement("img");
image2.classList.add('edit');
image2.src = "../images/comment.JPG";
let nolike = document.createElement('span');
let nocomment = document.createElement('span')
nocomment.id = 'nocomment';
nolike.id = 'nolike';
nolike.innerHTML = 23;
nocomment.innerHTML = 2;

       
contollerDiv.appendChild(image1);
contollerDiv.appendChild(nolike);
contollerDiv.appendChild(image2);
contollerDiv.appendChild(nocomment);
// single.appendChild(contollerDiv);

// const comment 

const userName = document.getElementById("usename");
const userComment = document.getElementById("comment");
const sendCommentButton = document.getElementById("send-comment");
const form1 = document.querySelector('form')
let comment_from_users =JSON.parse(localStorage.getItem('comments'));
if(comment_from_users.length === 0){
   comment_from_users = [];
}else{
   comment_from_users =JSON.parse(localStorage.getItem('comments'));
}

sendCommentButton.addEventListener('click',(event) =>{
   event.preventDefault();
   let comment = {
      user_name: userName.value,
      userComment:userComment.value
   }
comment_from_users.push(comment);
localStorage.setItem("comments",JSON.stringify(comment_from_users));
form1.reset();
})
//Retrieving coment from local storage
const usersComment = JSON.parse(localStorage.getItem('comments'));
console.log(userComment) 



 














