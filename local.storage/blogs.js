
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
let blogs = (JSON.parse(localStorage.getItem('blogs')));
image.addEventListener('change',() =>{
   const file = image.files[0];
 const fr = new FileReader();
 fr.addEventListener("load",() =>{
   imageUrl = fr.result;
 })
 fr.readAsDataURL(file);
 })

 if(blogs === null){
   blogs = [];
}
button.addEventListener('click',(event) => {
       // local storage
       event.preventDefault();
          const artical = {
              title:title.value,
              image:imageUrl,
              descriptionb:desc.innerHTML
           }
          blogs.push(artical);
      localStorage.setItem('blogs',JSON.stringify(blogs));
      form.reset();
      
});
const loader = document.querySelector("#loading");
 const displayLoading = () =>{
   loader.classList.add("display");
   setTimeout(() =>{
      loader.classList.remove("display")
   },1000 * 60 * 60);
}
const hideLoading = () =>{
   loader.classList.remove("display")
}
const blogimage = document.getElementById("blog-image");
const blogHeading = document.getElementById("blogHeading")
const mainpage = document.getElementById("blogDesc");
const singleBlogsView = async(id) =>{
   const single_blog_url = `https://mybrand-be-nkyz.onrender.com/api/v1/blogs/${id}`;
   displayLoading()
   try{
      const singleBlog = (await fetch(single_blog_url)).json();
      const blog = (await singleBlog).blogs;
      blogimage.src= blog.image;
      blogHeading.innerHTML = blog.title;
      mainpage.innerHTML = blog.content;
   }catch(error){
      throw new Error(error.mesage)
   }
}

const getlikes = async(id) => {
   const likes_url = `https://mybrand-be-nkyz.onrender.com/api/v1/blogs/${id}/likes`;
   displayLoading();
   try {
      const likeNo = (await fetch(likes_url)).json();
      const like_number = (await likeNo).likes; 
      return like_number;
   } catch (error) {
      
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
nolike.innerHTML = 0;
nocomment.innerHTML = 0;
      
contollerDiv.appendChild(image1);
contollerDiv.appendChild(nolike);
contollerDiv.appendChild(image2);
contollerDiv.appendChild(nocomment);
const comments = async(id) =>{
   const coment_url = `https://mybrand-be-nkyz.onrender.com/api/v1/blogs/${id}/comments`;
   displayLoading();
   try {
      const AllComments = ((await fetch(coment_url)).json());
      hideLoading();
      const comments_number = (await AllComments).comments; 
      return comments_number.length;
   } catch (error) {
      console.log(error.message)
   }
}
const fetchBlogs = async() =>{
            const url = 'https://mybrand-be-nkyz.onrender.com/api/v1/blogs';
            displayLoading();
      try{
               let response = (await fetch(url)).json();
               hideLoading();
               const blogList = document.getElementById('blog-list');
               let BlgsFromDb = await response;
               let blogsList = BlgsFromDb.blogs
         for(let i = 0;i < blogsList.length;i++){
            const ids =  blogsList[i]._id;
            const likes = await getlikes(ids);
            const comments_No = await comments(ids);
            const blogDiv = document.createElement("div");
            blogDiv.classList.add("blog1");
            const images = document.createElement('img');
            images.src = blogsList[i].image;
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
            let likeNo = document.createTextNode(likes);
            let comentNo = document.createTextNode(comments_No);
            like_coment.appendChild(likeNumber);
            like_coment.appendChild(like);
            likeNumber.appendChild(likeNo);
            like_coment.appendChild(comment);
            commentNumber.appendChild(comentNo);
            like_coment.appendChild(commentNumber);
            const summary = document.createElement('p');
            let  sumaryNote = document.createTextNode(blogsList[i].content);
            const summary_content = document.createTextNode(sumaryNote.textContent.replace(/<[^>]*>?/gm, '').slice(0,60) +"...");
            const readMore = document.createTextNode("Read More");
            des.classList.add("more");
            const pcontent = document.createTextNode(blogsList[i].title);
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
         const more = document.querySelectorAll(".more");
         const single = document.querySelector(".single");
         const all = document.querySelector('.all');
      for(let i = 0;i<more.length;i++){
         for(let j = i;j < blogsList.length;j++){
            more[i].addEventListener("click",() =>{
            if(i === j){
               const blogsId = blogsList[i]._id;
               singleBlogsView(blogsId);
            }
            single.style.display = 'block';
            single.animate({transform:['scale(0)','scale(0)','scale(1)']},500);
            all.style.display = "none"
            })
         } 
      } 
      const closing =  document.getElementById("close");
      closing.addEventListener("click",()=>{
         hideLoading();
         single.style.display = 'none';
         single.animate({transform:['scale(0)','scale(0)','scale(1)']},500);
         all.style.display = "block"
      })  
   }catch(err){
         throw new Error(err.message)
    }
}
fetchBlogs();
// post coment  
const userName = document.getElementById("usename");
const userComment = document.getElementById("comment");
const sendCommentButton = document.getElementById("send-comment");
const form1 = document.querySelector('form')
let comment_from_users =JSON.parse(localStorage.getItem('comments'));
if(comment_from_users === null){
   comment_from_users = [];
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





 














