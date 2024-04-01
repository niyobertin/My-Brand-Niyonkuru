
const loader = document.querySelector("#loading");
const loggedInUser = localStorage.getItem('logedInUser');
const userData = JSON.parse(loggedInUser);
const blogToAddLikesOn = localStorage.getItem('singleBlogId');
let  token;
let usersId
const initialiser = (data) =>{
    if(data === null){
        return;
    }else{
        token = data.token;
        usersId = data.userId;
    }
}
initialiser(userData)
const displayLoading = () =>{
loader.classList.add("display");
setTimeout(() =>{
    loader.classList.remove("display")
},1000 * 60 * 60);
}
const getLikes = () =>{
    if(!id){
        return "this is not allowed";
    }else{
        const url = `https://mybrand-be-nkyz.onrender.com/api/v1/blogs/${blogToAddLikesOn}/likes`;
        displayLoading();
        try {
            fetch(url, {
                method: 'GET',
                'Content-Type': 'application/json'
            })
            .then(response => {
                if (!response.ok) {
                    hideLoading()
                    throw new Error('Failed to Like');
                }
                response.json()
                .then((data)=>{
                    checkLikedStatus(blogToAddLikesOn,usersId,token);
                    likes_no.innerHTML = data.likes;
                })
            })
           
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
const hideLoading = () =>{
    displayComments();
    getLikes();
loader.classList.remove("display")
}
const id = localStorage.getItem('singleBlogId');
const blogimage = document.getElementById("blog-image");
const blogHeading = document.getElementById("blogHeading")
const mainpage = document.getElementById("blogDesc");
const singleView = document.querySelector(".singleView");
if(!id){
    console.log('blog Not found')
}else{
    const url = `https://mybrand-be-nkyz.onrender.com/api/v1/blogs/${id}`;
    displayLoading();
    try{
        fetch(url,{
            method:'GET'
        })
        .then((res) => res.json())
        .then(data =>{
        const obatainedBlog = data.blogs;
        hideLoading();
        singleView.style.display = "block";
        blogimage.src= obatainedBlog .image;
        blogHeading.innerHTML = obatainedBlog .title;
        mainpage.innerHTML = obatainedBlog .content;
        })
    }catch(err){
            throw new Error(err);
    }
}

const userName = document.getElementById("usename");
const userComment = document.getElementById("comment");
const sendCommentButton = document.getElementById("send-comment");
const form1 = document.querySelector('form')
const popMessage = document.querySelector(".pop-up");
const comments_no = document.querySelector('#likes-no');
const likes_no = document.querySelector('#comments-no');
const sendComment = (data) => {
    if(!id){
        return;
    }else{
        const url = `https://mybrand-be-nkyz.onrender.com/api/v1/blogs/${id}/comments`;
        displayLoading();
        try {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    hideLoading()
                    throw new Error('Failed to send comment');
                }
                 popMessage.innerHTML = "Comment sent!";
                 popMessage.style.display = "block";
                 hideLoading()
                 setTimeout(() => {
                 popMessage.style.display = "none";
                 location.reload()
             }, 2000);
                form1.reset(); 
            })
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

const userJsonData = JSON.parse(loggedInUser);
userName.value = userJsonData.usersName
sendCommentButton.addEventListener('click',(event) =>{
    event.preventDefault();
    const commentData = {
        visitor: userName.value,
        comments: userComment.value
    };
    sendComment(commentData);
 })

 const displayComments = () => {
    const url = `https://mybrand-be-nkyz.onrender.com/api/v1/blogs/${id}/comments`;
    displayLoading();
    fetch(url,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to loard comments');
        }
        res.json()
        .then((data) => {
            const commentsList = data.comments;
            comments_no.innerHTML = commentsList.length;
            for (let i = 0; i < commentsList.length; i++) {
                const commentsDiv = document.createElement("div");
                commentsDiv.classList.add("commentsDiv");
                const usercomment = document.querySelector(".usercomment");
                const user_name =  document.createElement("p")
                user_name.classList.add("user-name");
                const users_comments = document.createElement("p");
                users_comments.classList.add("user-comments");
                user_name.innerHTML = commentsList[i].visitor;
                users_comments.innerHTML = commentsList[i].comments;
                commentsDiv.appendChild(user_name);
                commentsDiv.appendChild(users_comments);
                usercomment.appendChild(commentsDiv);  
            } 
        });
    })
    .catch(err => console.log(err.popMessage));
 }

const addLikes = () =>{
    const token = userData.token;
    if(!id){
        return;
    }else{
        const url = `https://mybrand-be-nkyz.onrender.com/api/v1/blogs/${blogToAddLikesOn}/likes`;
        displayLoading();
        try {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    hideLoading()
                    throw new Error('Failed to Like');
                }
                response.json()
                .then(data =>{
                    popMessage.innerHTML = data.message;
                    popMessage.style.display = "block";
                    hideLoading()
                    setTimeout(() => {
                    popMessage.style.display = "none";
                   }, 2000);
                })
            })
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

const like = document.querySelector('.likesno-img');
const likeThumb = document.querySelector("#comments-image");
like.addEventListener("click",()=>{
    if(!loggedInUser){
        popMessage.innerHTML = 'login first';
        popMessage.style.display = "block";
        setTimeout(() => {
            location.href ='../pages/login.html'
           }, 2000);
    }else{
        likeThumb.style.opacity = "1";
        addLikes();
    }
})

const userProfile = document.getElementById("login-profile");
const logoutp = document.querySelector("#logout");
const userNameInfo = document.querySelector("#user-name");
const userEmail = document.querySelector("#user-email");
if(loggedInUser){
  userNameInfo.innerHTML = userData.usersName;
    userEmail.innerHTML = userData.email;
  userProfile.innerHTML = '🙎‍♂️'
  userProfile.style.border = "yellow 1px solid";
  userProfile.style.borderRadius = "50%" 
}
logoutp.addEventListener('click',() =>{
  localStorage.removeItem("logedInUser");
  location.href ="../pages/home.html";
})
const logoutMenu = document.querySelector('.dropdown');
userProfile.addEventListener('click',()=>{
if(loggedInUser){
  if(logoutMenu.style.display == 'none'){
    logoutMenu.style.display = 'block';
    logoutMenu.animate({transform:['scale(0)','scale(0)','scale(1)']},500);
  }else{
    logoutMenu.style.display = 'none';
  }
}else{
  location.href = "../pages/login.html";
}
});

function checkLikedStatus(blogId, userId, token) {
    if (!blogId || !userId || !token) {
        console.error('Blog ID, user ID, or token is missing.');
        return;
    }
    const url = `https://mybrand-be-nkyz.onrender.com/api/v1/blogs/${blogId}/likes`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to check liked status');
        }
        return response.json();
    })
    .then(data => {
        const likedUser = data.data;
        likedUser.forEach(ele => {
        if (ele.user === usersId) {
            likeThumb.style.opacity = "1";
        }else{
            likeThumb.style.opacity = "0.2";
        }
    });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

 



