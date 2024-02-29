const dataFromLocalStorage = JSON.parse(window.localStorage.getItem("blogs"));
 
console.log(dataFromLocalStorage);
const blog = document.getElementById('blogsContent');
const blogImageView = document.getElementById('blogImageView');
const blogsTitle = document.getElementById('blog-head');
// for(let i = 0; i< dataFromLocalStorage.length;i++){
    blogImageView.src = dataFromLocalStorage[0].image;
    blogsTitle.innerHTML = dataFromLocalStorage[0].title;
    blog.innerHTML = dataFromLocalStorage[0].descriptionb;
// }