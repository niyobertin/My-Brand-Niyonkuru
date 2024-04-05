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

const popMessage = document.querySelector(".alet");
const loggedIn = JSON.parse(localStorage.getItem('logedInUser'))
const token = loggedIn.token;
const deletBlogs = (id) => {
    const url = `https://mybrand-be-5zbq.onrender.com/api/v1/blogs/${id}`;
    displayLoading();
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
    const UpdateBlogs = async (data, token) => {
        const loader = document.querySelector("#loading-loder");
        const displayLoading = () => {
            loader.classList.add("display");
            setTimeout(() => {
                loader.classList.remove("display")
            }, 1000 * 60 * 60);
        }
        const hideLoading = () => {
            loader.classList.remove("display")
        }
        const popUpMessage = document.querySelector(".alet-message");
        const blogId = localStorage.getItem('blogsId');
        const url = `https://mybrand-be-p2fh.onrender.com/api/v1/blogs/${blogId}`;
        displayLoading();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('image', data.image); 
    
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            hideLoading();
            popUpMessage.innerHTML = responseData.message;
            popUpMessage.style.display = "block";
            desc.innerHTML = '';
            localStorage.removeItem('blogId');
            setTimeout(() => {
                popUpMessage.style.display = "none";
                form.reset();
            }, 2000);
        } catch (error) {
            hideLoading();
            console.error(error.message);
        }
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
 
 

 

 

 

 