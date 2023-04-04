import React, { useEffect, useState } from 'react'
import './CreateNewBlog.css'
import moment from 'moment'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateNewBlog = ({reload,setReload}) => {

    const navigate = useNavigate()

    //logged in user data
    const user = useSelector(state=>state.userDataReducer)

    //states
    const [file, setFile] = useState("");
    const [blogObj,setBlogObj] = useState({
        userName:user?.fullName,
        UserId:user?._id,
        title:'',
        image:'',
        content:'',
        date:moment().format('MMMM Do YYYY')
    })

    //handler function for file change
    const changeHandler = (e) => {
        const {name} = e.target;
        setFile( e.target.files[0]);  
        console.log(file);
        setBlogObj({ ...blogObj, [name]:  e.target.files[0] });
    };
    
    // handle function  for input change
    const changeHandle=(e)=>{
    const {name,value} = e.target;;
    setBlogObj({ ...blogObj, [name]: value });
    }

    // create blog funtion
    const addBlog=async(e)=>{
        setReload(false)
        e.preventDefault();
        const config = {headers:{"Content-Type":"multipart/form-data"}}
        await axios.post("http://localhost:3009/blog/add-blog",blogObj,config)
        .then(res=>{
            setReload(true)
            setFile('')
            setBlogObj({...blogObj,
            title:"",
            image:"",
            content:""})
            navigate(`../`, { replace: true })
        }) 
        .catch(err=>console.log(err))
      }

  return (
    <div className="create-blog-flex my-3 m d-flex justify-content-center">
        <div className="create-blog-form all-side-shadow p-3">
        <form method="post" className="post-form" encType="multipart/form-data">
            <div className="mb-3">
                <label htmlFor="title" className="form-label"><h5>Title</h5></label>
                <input 
                    type="text" 
                    value={blogObj.title} 
                    onChange={changeHandle}
                    autoFocus={true} 
                    name='title'
                    className="form-control" 
                    id="title"/>
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label"><h5>Content</h5></label>
                <textarea 
                    name='content'
                    value={blogObj.content} 
                    onChange={changeHandle}
                    className="form-control"
                    id="content" 
                    rows="3"
                ></textarea>
            </div>
            <div className="mb-3">
                <input 
                type='file' 
                name='image'
                onChange={changeHandler}
                className="form-control" 
                id="image" 
                accept=".png, .jpg, .jpeg"/>
            </div>
            <input 
                className="form-control"
                type='text'
                defaultValue={new Date()}
                name='date' 
                style={{display:"none"}}
            ></input>
            <button type='submit' onClick={addBlog} className='create-btn btn btn-primary px-3'><h5>Create</h5></button>
        </form>
        </div>
    </div>
  )
}

export default CreateNewBlog
