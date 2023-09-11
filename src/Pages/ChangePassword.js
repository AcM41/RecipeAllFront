import React,{useState} from 'react'
import axios from 'axios' 

const ChangePassword = () => {
    const [oldPwd,setOldPwd] = useState('')
    const [newPwd,setNewPwd] = useState('')
    const updatePassword =(oldPwd,newPwd)=>{
        axios.put("https://recipe-all.onrender.com/updatePassword",{oldPwd:oldPwd,newPwd:newPwd},{headers: { accessToken: localStorage.getItem("accessToken") }})
        .then((res)=>{  
            alert(res.data)
        })
    }
    return (
        <div className="container mt-5">
          <h2>Change Password</h2>
          <div className="mb-3">
            <label htmlFor="oldPassword" className="form-label">
              Old Password
            </label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              placeholder="Old Password..."
              onChange={(event) => {
                setOldPwd(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="New Password..."
                onChange={(event) => {
                    setNewPwd(event.target.value);
                }}
                />
            </div>
            <button
                className="btn btn-primary"
                onClick={() => {
                updatePassword(oldPwd, newPwd);
                }}
            >
                Save Changes
            </button>
            </div>
        );
    };
    
    export default ChangePassword;