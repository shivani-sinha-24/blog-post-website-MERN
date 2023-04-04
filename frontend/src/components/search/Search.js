import React from 'react'
import './Search.css'

const Search = () => {
  return (
    <div className="search my-5 d-flex justify-content-center">
    <form className='row search-form'>
        <div className="col-11">
        <input name="searchusertext"  type="search" className="form-control  " placeholder='&#128269; Search...' autoFocus={true}/>
        </div>
        <div className="col-1" >
        <button className="btn btn-primary" >Search</button>      
        </div>
    </form>
    </div>
  )
}

export default Search
