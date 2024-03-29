
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
          }, 2000);
                form1.reset(); 
            })
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
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
    .catch(err => console.log(err.popMessage))
 }
 displayComments()