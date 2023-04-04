import React, { useEffect, useState } from 'react'
import './BlogPage.css'
import Comment from '../../components/comment/Comment'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogPage = ({reload,setReload}) => {
  const {blogId} = useParams()
  const usereData = useSelector(state=>state.userDataReducer)

  const [comntInput,setCmntTnput] = useState('')
  const [comments,setComments] = useState([])
  const [blog,setBlog] = useState({})
  
  useEffect(()=>{
    axios.get(`http://localhost:3009/blog/${blogId}`)
    .then(res=>{
      console.log(res.data);
      setBlog(res.data);
    })
    .catch(err=>console.log(err))
  },[blogId,reload])
  
  // blogObj created to passs in add cmnt funtion
  const blogDetail = {
    blogId,
    comntInput,
    userName:usereData?.fullName,
    userId:usereData?._id
  };
    
  //add cmnt funtion
  const addCmnt= () =>{
    setReload(false);
    if (comntInput) {
      axios.post(`http://localhost:3009/blog/add-comment`, blogDetail)
      .then((res) => {
        setComments(res.data);
        setReload(true);
        setCmntTnput("");
      })
      .catch(err=>console.log(err))
    }
  }

  return (
    <div className="blog d-flex justify-content-center">
    <div className="card all-side-shadow">
      <div className="card-header text-center">
        <h1 className='card-title'>{blog?.title?blog?.title: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.` }</h1>
        <span className="publishe-date">🗓️ Published on {blog?.date?blog?.date:'date'}, </span>
        <span className="published-by">  by {blog?.userName?blog?.userName:'userName'}</span>
      </div>
      <div className="card-bottom">
      <div className="card-body text-center">   
        <div className="text-center">
          {blog?.image&&<img src={`http://localhost:3009/uploads/${blog?.image}`} className="card-img-top blog-image" alt="..."/>}
        </div>
        <p className="card-text text-start">{blog?.content?blog?.content:null}</p>
        <hr />
        <div className="comnt-form d-flex">
          <div className='cmnt-form-right text-start'>
            <span className='m-2 user-name'>{usereData?.fullName?usereData.fullName:null}</span>
            <input 
              name="cmntinput"
              type="text"
              className="form-control px-3 m-2"
              placeholder="Add comments...."
              onChange={(e) => { setCmntTnput(e.target.value) }}
              value={comntInput} 
            />
            </div>
            <div className="cmnt-form-left p-4">
            <button 
              className='px-4 m-2 btn btn-primary'
              onClick={(e) => {
                  e.preventDefault();
                  addCmnt();
                }}
            >
              Post
            </button>
            </div>
        </div>
        <hr />
        {blog?.comments?.map((cmnt,index)=>
        <Comment 
          key={index} 
          cmntUserId={cmnt.userId} 
          userName={cmnt.userName} 
          cmnt={cmnt.cmnt} 
          setReload={setReload}
        />)}
      </div>
      </div>
    </div>
    </div>
  )
}

export default BlogPage
