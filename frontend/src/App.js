import { useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, redirect, useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import "./App.css";

// pages
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Homepage from "./pages/homepage/Homepage";
import BlogPage from "./pages/blogpage/BlogPage";
import CreateNewBlog from "./pages/createNewBlog/CreateNewBlog";
import NoPage from "./pages/noPage/NoPage";

// components
import Layout from "./components/layout/Layout";

// reducers
import { allBlogs } from './reducers/allBlogsSlice';
import { userData } from "./reducers/userDataSlice";

function App() {
  const dispatch = useDispatch()
  const usereData = useSelector(state=>state.userDataReducer)
  const [isUserLoggedin, setIsUserLoggedin] = useState(false);  
  const [blogs,setBlogs] = useState([])
  const [reload, setReload] = useState(false);

  const token = JSON.parse(localStorage.getItem("blogUser"));

  useEffect(()=>{
    if(token){
      // get user data
      axios.post(`http://localhost:3009/user/get-user`,{token})
      .then(res=>{
        setIsUserLoggedin(true)
        dispatch(userData(
          res.data._doc._id,
          res.data._doc.fullName,
          res.data._doc.email,
          ))
      })
      .catch(err=>console.log(err))
    }else{
      setIsUserLoggedin(false)
    }

    // get blogs
    axios.get(`http://localhost:3009/blog`)
    .then((res) => {
      setBlogs(res.data)
      res?.data?.map(blog=> dispatch(allBlogs(blog._id,blog.userId,blog.userName,blog.title,blog.image,blog.content,blog.date,blog.comments)))
    })
    .catch(err=>console.log(err))
  },[reload,token])
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="login" element={
              <Login
                isUserLoggedin={isUserLoggedin}
                setIsUserLoggedin={setIsUserLoggedin}
              />
          }/>
          <Route path="signup" element={
            <Signup
              isUserLoggedin={isUserLoggedin}
              setIsUserLoggedin={setIsUserLoggedin}
            />
          }/>
          <Route path="/" element={
            <Layout 
              isUserLoggedin={isUserLoggedin} 
              setIsUserLoggedin={setIsUserLoggedin}
            />
          }>
          <Route index element={
            <Homepage 
              reload={reload} 
              setReload={setReload} 
              blogs={blogs}
              
            />
          }/>
          <Route path="blog/:blogId" element={
            <BlogPage 
              reload={reload} 
              setReload={setReload}
            />
          } />
          <Route path="/create-new-blog" element={
            <CreateNewBlog 
              reload={reload} 
              setReload={setReload}
          />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;