
const {useState, useEffect} = React;
const style ={
    alet:{
        backgroundColor: "rgb(44, 43, 41)",
        padding: "2%",
        top: "0",
        marginTop: "8%",
        position: "fixed",
        marginLeft: "20%",
        width: "50%",
        marginRight: "20%",
        textAlign: "center",
        fontSize: "medium",
        color: "yellow",
        fontWeight: "100",
        borderRadius: "10px",
        display: "none" 
     },
}
function Blog({blog,onDelete,onEdit}){
    const handleEdit = () =>{
        localStorage.setItem("blogsId", blog._id);
        onEdit(); 
    };

    return(
        <div className="blog" >
            <img src={blog.image} />
            <h2>{blog.title}</h2>
            <p>{blog.content.replace(/<[^>]*>?/gm, '').slice(0,250)+"..."}</p>
            <div className="controllers">
                <img src="../images/Mode edit.jpg" className="edit" onClick={handleEdit} />
                <img src="../images/Delete.jpg" className="delete" onClick={() => onDelete(blog._id)} />
            </div>
        </div>
    )
}

function Blogs(){
    const[blogs,setBlogs] = useState([]);
    const[deleteMessage,setDelete] = useState('');
    const [loading,setLoading] = useState(true);
   

    useEffect(() => {
        const fetchBlogs = async() => {
            try {
                const response = await fetch('https://mybrand-be-5zbq.onrender.com/api/v1/blogs');
                const data = await response.json();
            setBlogs(data.blogs);
            setLoading(false);
            } catch (error) {
                console.log(error.message)
            }

        }
        fetchBlogs()
    },[]);
    const handleDelete = async (id) => {
        const loggedIn = JSON.parse(localStorage.getItem('logedInUser'))
        const token = loggedIn.token;
        try {
            const url = `https://mybrand-be-5zbq.onrender.com/api/v1/blogs/${id}`
            setLoading(true)
             fetch(url,{
                method:"DELETE",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
             })
             .then(async(response) =>{
                if(!response.ok){
                    setDelete('Failed to delete blog')
                }
                const data = await response.json();
                setDelete(data.message);
                setLoading(false);
                window.location.reload(true);
             })
              
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleEdit = () => {
        // Implement edit logic
    };

    return (
        <div className="container">
            {deleteMessage && <div className = "alert" style = {style.alet}>{deleteMessage}</div>}
            {loading && <div className = "loading-react"></div>}
            <div className="contents">
                {blogs.map(blog => (
                    <Blog key={blog._id} blog={blog} onDelete={handleDelete} onEdit={handleEdit} />
                ))}
            </div>
        </div>
    );
}

ReactDOM.render(<Blogs />, document.getElementById('conts-blog'));