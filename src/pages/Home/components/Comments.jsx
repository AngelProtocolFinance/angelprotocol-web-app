import { Link } from "react-router-dom";
import "../styles/comments.css";
import { useContext, useState } from "react";
import { UserContext } from "../state/UserState";
import axios from "axios";



const Comments = ({ comments, blogId, getBlog }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [description, setDescription] = useState("");

  const { user } = useContext(UserContext)

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    
    const options = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
  
    return date.toLocaleDateString('en-GB', options);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios({
        url : `/api/comments`,
        method : "post",
        data : {
          description, blogId
        },
        headers : {
          authToken : localStorage.getItem("token")
        }
      })
      if(res.data.success !== true){
        return alert(res.data.message)
      }
      setDescription("")
      getBlog()
      alert("Comment Added")
    } catch (error) {
      alert(error.message)
    }
  };
  return (
    <div className={"comment_container"}>
      <h1 className={"title"}>Comments</h1>
      {user ? (
        <div className={"write"}>
          <textarea
            placeholder="write a comment..."
            className={"input"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className={"button"} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link to="/login">Login to write a comment</Link>
      )}
      <div className={"comments"}>
        {isLoading
          ? "loading"
          : comments?.map((comment) => (

            <div className={"comment"} key={comment._id}>
              <div className={"user"}>
                {comment?.user?.avatar && (
                  <img
                    src={`${process.env.REACT_APP_API_HOST}/uploads/${comment.user.avatar}`}
                    alt=""
                    width={50}
                    height={50}
                    className={"image"}
                  />

                )}
                <div className={"userInfo"}>
                  <span className={"username"}>{comment.user.name}</span>
                  <span className={"date"}>{formatDate(comment.createdAt)}</span>
                </div>
              </div>
              <p className={"desc"}>{comment.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
