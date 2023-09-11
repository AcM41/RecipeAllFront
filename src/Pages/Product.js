import React, {useEffect,useState,useContext} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios' 
import { AuthContext } from "../helpers/AuthContext";

const Product = () => {
    let {id} = useParams()
    const [productObject, setProductObject] = useState({})
    const [commentList,setCommentList] = useState([])
    const [comment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);
    
    
    useEffect(()=>{
        axios.get(`https://recipe-all.onrender.com/products/id/${id}`).then((res)=>{
            setProductObject(res.data)
        })
        axios.get(`https://recipe-all.onrender.com/comments/${id}`).then((res)=>{
            setCommentList(res.data)
        })
        
    },[])
    const addComment=()=>{
        axios.post("https://recipe-all.onrender.com/comments",{
            commentBody: comment,
            ProductId: id
        },{
            headers:{
                accessToken:localStorage.getItem('accessToken')
            }
        }).then((res)=>{
            if(res.data.error){
                alert(res.data.error)
            }
            else{
                const commentToAdd={commentBody:comment,username:res.data.username};
                setCommentList([...commentList,commentToAdd])
                setNewComment("")
            }
            
        })
    }
    const deleteComment = (id) => {
        axios.delete(`https://recipe-all.onrender.coms/comments/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
            setCommentList(
            commentList.filter((val) => {
                return val.id != id;
            })
            );
        });
    };
    return (
            <div className="container mt-4">
            <div className="row">
                <div className="col">
                <h1>{productObject.title}</h1>
                <p>{productObject.instruction}</p>
                <p>{productObject.expireData}</p>
                <p>{productObject.productCode}</p>
                </div>
                <div className="col">
                <div className="mb-4">
                    <h2>Comments</h2>
                    <div className="mb-3">
                    <label>Comment:</label>
                    <input
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        placeholder="Add a comment"
                        value={comment}
                        onChange={(event) => {
                        setNewComment(event.target.value);
                        }}
                    />
                    <button className="btn btn-primary mt-2" onClick={addComment}>
                        Add Comment
                    </button>
                    </div>
                    <div className="list-group">
                    {commentList.map((value, key) => (
                        <div key={key} className="list-group-item">
                        {value.commentBody} - {value.username}
                        {authState.username === value.username && (
                            <button
                            className="btn btn-danger btn-sm float-end"
                            onClick={() => deleteComment(value.id)}
                            >
                            Delete
                            </button>
                        )}
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            </div>
        );
        }
    
    export default Product;