const { useState, useEffect } = React;
const style = {
    commentsDiv:{
        marginLeft:"10%"
    },
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
     },
}
function Comment({comment}){
    return(
       <div className="controllComments">
         <div className = 'commentsDiv'style={style.commentsDiv} >
            <div className = "user-comments">
            <p className="user-name">{comment.visitor}</p>
            <p className = "user-comments">{comment.comments}</p>
        </div>
        </div>
       </div>
    )
}
function SingleBlog() {
    const singleBlogId = localStorage.getItem("singleBlogId");
    const loggedInUser = localStorage.getItem('logedInUser');
    const userData = JSON.parse(loggedInUser);
    const [blogs, setBlogs] = useState(null);
    const [like, setLike] = useState(null);
    const [likeNumber, setLikes] = useState(null);
    const [loading,setLoading] = useState(true);
    const [visitor, setUser] = useState('');
    const [comments,setComments] = useState([]);
    const [commentsList,setCommentsList] = useState([])
    const [commentsNumber,setCommentsNumber] = useState(null)
    const [notification,setNotification] = useState('');
    const [showPopMessage, setShowPopMessage] = useState(true);
    useEffect(() => {
        const fetchSingleBlog = async () => {
            const url = `https://mybrand-be-5zbq.onrender.com/api/v1/blogs/${singleBlogId}`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch a blog");
                }

                const data = await response.json();
                setBlogs(data.blogs);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching blog:", error);
                setBlogs([{ _id: null, title: "Error", content: error.message }]);
            }
        };
        fetchSingleBlog();
    }, []);
    const  onLike = async() =>{
        const token = userData.token;
        const url = `https://mybrand-be-5zbq.onrender.com/api/v1/blogs/${singleBlogId}/likes`;
        try {
            setLoading(true)
            fetch(url,{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${token}`
            }
            })
            .then(async(res) => {
                setLoading(false);
                if(!res.ok){
                    setLike("Failed to Add Like")
                }
                const data = await res.json();
                setLike(data.message)
                setTimeout(() => {
                    setShowPopMessage(false);
                }, 2000); 
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }
    

    useEffect(() =>{
        const displayNumberOfLikes  = async() =>{
           try {
            const response =await fetch(`https://mybrand-be-5zbq.onrender.com/api/v1/blogs/${singleBlogId}/likes`);
                if (!response.ok) {
                    throw new Error('Failed to check liked status');
                }
                const data = await response.json();
                setLikes(data.likes)
           } catch (error) {
            throw new Error(error.message)
           }
        }
        displayNumberOfLikes();
    },[singleBlogId])

        const comment = {visitor,comments};
        const onComments = async() =>{
            const url = `https://mybrand-be-5zbq.onrender.com/api/v1/blogs/${singleBlogId}/comments`;
            setLoading(true)
            try {
                fetch(url,{
                    method:'POST',
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(comment)
                })
                .then(async(res) =>{
                    setLoading(false)
                    if(!res.ok){
                        console.log("Failed to send comments")
                    }
                    const data = await res.json();
                    setNotification(data.message)
                     setTimeout(() => {
                            window.location.reload(true);
                        }, 2000); 
                })
            } catch (error) {
                throw new Error(error.message)
            }
        }

    useEffect(() =>{
        const fetchComment = async() =>{
            try {
                const response = await fetch(`https://mybrand-be-5zbq.onrender.com/api/v1/blogs/${singleBlogId}/comments`);
                if(!response.ok){
                    console.log("failed to fetch comments")
                }
                const data = await response.json();;
                setCommentsList(data.comments);
                setCommentsNumber(data.comments.length);
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchComment()
    },[singleBlogId])
    if(!blogs){
        return <div className = "waitResponse" id = "loader"></div>
    }
    return(
        <div className="single-View">
             {loading && <div className = "loading-react"></div>}
            {showPopMessage && notification && (
            <div className = "alert" style = {style.alet}>
                {notification}
            </div>)}

            {showPopMessage && like && (
            <div className = "alert" style = {style.alet}>
                {like}
            </div>)}
            <h3 id="blogHeading">{blogs.title}</h3>
            <img src={blogs.image} alt="Blog Cover" />
            <p id="blogDesc">{blogs.content.replace(/<[^>]*>?/gm, '')}</p>
            <div className="commenting-liking">
                <div className="commentsno-img">
                    <p id="likes-no">{commentsNumber}</p>
                    <p id="likes-image">💬</p>
                </div>
                <div className="likesno-img">
                    <p id="comments-no">{likeNumber}</p>
                    <p
                        id="comments-image"
                        className="comments-image"
                        onClick={() => onLike()}
                    >
                        👍
                    </p>
                </div>
            </div>
            <h2 id="comments-title">Comments</h2>
            <div className = "comments">
            {commentsList.map(comment => (
                    <Comment comment={comment} />
                ))}
            </div>
            <form action="" className="comment-area">
                <div className="name">
                    <label htmlFor="name" id="name-label">
                        Name
                    </label>
                    <br />
                    <input type="text" id="usename"  
                    value ={visitor} 
                    onChange = {(e) =>setUser(e.target.value)}
                    />
                </div>
                <div className="comment">
                    <label htmlFor="comment" id="comment-label">
                        Comment
                    </label>
                    <br />
                    <textarea name="comment" id="comment" cols="50" rows="5"
                    value={comments} 
                    onChange ={(e) => setComments(e.target.value)}
                    ></textarea>
                    <br />
                    <br />
                </div>
                <button
                    type="button"
                    id="send-comment"
                    onClick={() => onComments()}
                >
                    Send
                </button>
            </form>
        </div>
    )
}

ReactDOM.render(<SingleBlog />, document.getElementById("root"));
