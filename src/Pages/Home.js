import React from 'react'
import axios from 'axios' 
import {useEffect,useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

const Home = () => {
        const [listOfProducts,setListOfProducts] = useState([])
        const { authState } = useContext(AuthContext);
        useEffect(()=>{ 
            axios.get("https://recipe-all.onrender.com/products").then((response)=>{
                console.log(response.data)
            setListOfProducts(response.data)
            
            })},[])
        let navigate = useNavigate()
        const likeProduct=(productId)=>{
            axios.post("https://recipe-all.onrender.com/like",{ProductId:productId},
            {headers:{accessToken:localStorage.getItem("accessToken")}}).then((res)=>{
                
                setListOfProducts(listOfProducts.map((product)=>{
                    if(product.id===productId){
                        if(res.data.liked){
                            return {...product,Likes:[...product.Likes,0]}
                        }
                        else{
                            const likesArray = product.Likes
                            likesArray.pop()
                            return {...product,Likes:likesArray}
                        }
                    }
                    else{
                        return product
                    }
                }))
            })
        }
        const deleteProduct=(productId)=>{
            axios.delete(`https://recipe-all.onrender.com/products/${productId}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
            setListOfProducts((prevList) =>
                prevList.filter((val) => val.id !== productId)
                );
        });
        }

        return (
            <div>
                {
                    listOfProducts.map((value, key) => {
                        return (
                            <div className='card container mb-3' key={key}>
                                <div className='card-header'>
                                    <h2>{value.title}</h2>
                                </div>
                                <div className='card-body'>
                                    <div
                                        className='card-text'
                                        onClick={() => {
                                            navigate(`/product/${value.id}`);
                                        }}
                                    >
                                        {value.instruction}
                                    </div>
                                    <div className='card-text'>{value.expireDate}</div>
                                    <div className='card-text'>{value.username}</div>
                                    <div className='card-text'>
                                        <button
                                            className='btn btn-primary'
                                            onClick={() => {
                                                likeProduct(value.id);
                                            }}
                                        >
                                            Like ({value.Likes.length})
                                        </button>
                                    </div>
                                    <div className='card-text'>
                                        {authState.username === value.username && (
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => {
                                                    deleteProduct(value.id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

export default Home