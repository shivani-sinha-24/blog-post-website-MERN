import React from 'react'
import './Blog.css'
import { Link } from 'react-router-dom'

const Blog = ({isUserLoggedin,title,image,id,date,content}) => {
  return (
    <div className="card blog-enlarge m-4 all-side-shadow" style={{width: "20rem",height:"fit-content"}}>
        {image &&
          <img src={`http://localhost:3009/uploads/${image}`} className="card-img-top" alt="..."/>
        }
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text content">{content?.length>100?content.substr(0,100)+'...':content}</p>
          <Link to={`/blog/${id}`} className=" btn-primary">Read more &rarr;</Link>
          <p className="card-text text-sm text-muted"> {date} </p>
        </div>
    </div>
  )
}

export default Blog
