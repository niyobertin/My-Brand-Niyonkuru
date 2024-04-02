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
const blogList = document.getElementById('blog-list');
const fetchBlogs = async() =>{
    const url = 'https://mybrand-be-5zbq.onrender.com/api/v1/blogs';
    displayLoading();
try{
       let response = (await fetch(url)).json();
       hideLoading();
       let BlgsFromDb = await response;
       let blogsList = BlgsFromDb.blogs
        
        let view,edit,deletes;
        const blogContents = document.querySelector(".contents");
        for(let i = 0;i <= blogsList.length;i++){
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
            blogImages.src = blogsList[i].image;
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
            const headings =  document.createTextNode(blogsList[i].title);
            const textContent = document.createTextNode((blogsList[i].content).replace(/<[^>]*>?/gm, '').slice(0,200) +"...");
            div.appendChild(blogImages);
            head.appendChild(headings)
            div.appendChild(head);
            content.appendChild(textContent);
            div.appendChild(textContent)
            div.appendChild(contollerDiv);
            blogContents.appendChild(div);
            const blogId = blogsList[i]._id;
            image3.addEventListener('click', () =>{
               deletBlogs(blogId)
            });
            image2.addEventListener('click', () =>{
                localStorage.setItem("blogsId",blogId);
                containShow();
             });
        }
        
    }catch(err){

    }  
} 
fetchBlogs()
const popMessage = document.querySelector(".alet");
const loggedIn = JSON.parse(localStorage.getItem('logedInUser'))
const token = loggedIn.token;
const deletBlogs = (id) => {
    const url = `https://mybrand-be-5zbq.onrender.com/api/v1/blogs/${id}`;
    console.log(displayLoading())
    fetch(url, {
        method: 'DELETE',
        headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            hideLoading();
            popMessage.innerHTML = 'Network response was not ok';
            popMessage.style.display = "block";
            setTimeout(() => {
                popMessage.style.display = "none";
              }, 2000);
        }
        return response.json();
    })
    .then((data) => {
        popMessage.innerHTML = data.message;
        popMessage.style.display = "block";
        setTimeout(() => {
            popMessage.style.display = "none";
            window.location.reload();
          }, 2000);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}
//  updating blogs
    const title = document.getElementById('blogTitle');
    const images = document.getElementById('aplodImage');
    const desc = document.getElementById('text-input');
    const button = document.getElementById('login-botton');
    const conteiner = document.querySelector('.conteiner');
    const form = document.querySelector('form');

    const fetchBlogData = async() => {
        const blogId = localStorage.getItem('blogsId');
        const url = `https://mybrand-be-5zbq.onrender.com/api/v1/blogs/${blogId}`;
        const response = await fetch(url, {
            method: 'GET'
        })
        if (!response.ok) {
            throw new Error('Failed to fetch blog data');
        }
        const data = await response.json();
            title.value = data.blogs.title;
            desc.innerHTML = data.blogs.content;
    };
    const UpdateBlogs = (data,token) => {
        const displayLoading = () => {
            const loader = document.querySelector("#loading-loder");
            if (loader) {
                loader.classList.add("display");
                setTimeout(() => {
                    loader.classList.remove("display");
                }, 1000 * 60 * 60);
            }
        };
        
        const hideLoading = () => {
            const loader = document.querySelector("#loading-loder");
            if (loader) {
                loader.classList.remove("display");
            }
        };
        
        const popUpMessage = document.querySelector(".alet-message");
        const blogId = localStorage.getItem('blogsId');
        const url = `https://mybrand-be-5zbq.onrender.com/api/v1/blogs/${blogId}`;
        displayLoading();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('image', data.images);
        formData.append('content', data.content);
    
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            hideLoading();
            popUpMessage.innerHTML = data.message;
            popUpMessage.style.display = "block";
            desc.innerHTML = '';
            localStorage.removeItem('blogId');
            setTimeout(() => {
                popUpMessage.style.display = "none";
                form.reset();
            }, 2000);
        })
        .catch(error => {
            hideLoading();
            console.error('An error occurred:', error);
            popUpMessage.innerHTML = 'An error occurred while updating the blog post. Please try again later.';
            popUpMessage.style.display = "block";
            setTimeout(() => {
                popUpMessage.style.display = "none";
                form.reset();
            }, 2000);
        });
    }

    button.addEventListener('click',async(event) => {
        event.preventDefault();
        const artical = {
           title:title.value,
           image:images.files[0],
           content:desc.innerHTML
        }
        UpdateBlogs(artical,token);
     form.reset();
     
});
    const blog_container = document.querySelector(".conteiner");
    const blogContents = document.querySelector(".contents");
    const containShow = () => {
        fetchBlogData();
        blog_container.style.display = 'block';
        blogContents.style.display = 'none';
       blog_container.animate({transform:['scale(0)','scale(0)','scale(1)']},500);
    }
const close_button = document.getElementById('close');
    close_button.addEventListener("click",(event) => {
        event.preventDefault();
        if((blog_container.style.display = "block") && (blogContents.style.display = 'none')){
            blog_container.style.display = "none";
            blogContents.style.display = 'block'
            blogContents.animate({transform:['scale(0)','scale(0)','scale(1)']},500);
            }else{
            blog_container.style.display = "block" 
            blog_container.animate({transform:['scale(1)','scale(0)','scale(0)']},500);
            blogContents.style.display = 'none';
            }
    })
 
 

 

 

 

 
