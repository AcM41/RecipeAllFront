import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios' 
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'


const Profile = () => {
    let navigate = useNavigate()
    const { authState } = useContext(AuthContext);
    const [listOfMyProducts,setListOfMyProducts] = useState([])
    const [listOfMyComments,setListOfMyComments] = useState([])
    const [listOfLikedProducts,setListOfLikedProducts] = useState([])
    const [listOfProducts,setListOfProducts] = useState([])
    useEffect(()=>{ 
        
        axios.get("https://recipe-all.onrender.com/products").then((response)=>{
                
            setListOfProducts(response.data)
            
            })
        const userId = authState.id
        console.log(userId)
        axios.get(`https://recipe-all.onrender.com/products/user/${userId}`,{headers:{accessToken:localStorage.getItem("accessToken")}}).then((response)=>{
            
        setListOfMyProducts(response.data)
        
        })
        axios.get(`https://recipe-all.onrender.com/comments/user/${userId}`,{headers:{accessToken:localStorage.getItem("accessToken")}}).then((response)=>{
            console.log(response.data)
        setListOfMyComments(response.data)
        
        })
        axios.get(`https://recipe-all.onrender.com/like/user/${userId}`,{headers:{accessToken:localStorage.getItem("accessToken")}}).then((response)=>{
            console.log(response.data)
            setListOfLikedProducts(response.data)
        
        })

    },[])
        

    return (
            <div className="container mt-4">
            <div className="row">
                <div className="col">
                <h1 className="mb-4">Profile</h1>
                
                <div className="mb-4">
                    <h2>My Products</h2>
                    <ul className="list-group">
                    {listOfMyProducts.map((value, key) => (
                        <li key={key} className="list-group-item">
                        <div>{value.title}</div>
                        <div>{value.instruction}</div>
                        <div>{value.expireDate}</div>
                        <div>{value.username}</div>
                        </li>
                    ))}
                    </ul>
                </div>
        
                <div className="mb-4">
                    <h2>My Comments</h2>
                    <ul className="list-group">
                    {listOfMyComments.map((value, key) => {
                        const matchingProduct = listOfProducts.find(product => product.id === value.ProductId);
                        return (
                        <li key={key} className="list-group-item">
                            <div>{value.commentBody}</div>
                            <div>Connected with: {matchingProduct.title}</div>
                        </li>
                        );
                    })}
                    </ul>
                </div>
        
                <div className="mb-4">
                    <h2>Liked Products</h2>
                    <ul className="list-group">
                    {listOfLikedProducts.map((value, key) => {
                        const matchingProduct = listOfProducts.find(product => product.id === value.ProductId);
                        return (
                        <li key={key} className="list-group-item">
                            {matchingProduct.title}
                        </li>
                        );
                    })}
                    </ul>
                </div>
                
                <button className="btn btn-primary" onClick={() => navigate('/profile/password')}>
                    Update Password
                </button>
                </div>
            </div>
            </div>
        );
        }
    
    export default Profile;