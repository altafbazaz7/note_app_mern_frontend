import axios from 'axios';

const BASE_URL = "https://note-app-mern-backend.vercel.app"
// const BASE_URL = "http://localhost:8000"



export const  addBlog = async(blog) => {
    try{
       return await axios.post(`${BASE_URL}/add`,blog)
    }catch(err){
        console.log(err,'Error while caling API ')
    }
}

export const getBlogs = async()=>{
    try{
        return await axios.get(`${BASE_URL}/all`)
    }catch(err){
        console.log('Error while caling API ', err);
    }

}


export const getBlog = async(id) => {
    try{
            return await axios.get(`${BASE_URL}/${id}`);  
    }catch(err){
             console.log('Error while caling API', err)
    }

}


export const deleteBlog = async(id) => {
    try{
            return await axios.delete(`${BASE_URL}/${id}`);  
    }catch(err){
             console.log('Error while caling API', err)
    }

}
export const updateBlog = async(id, editblog) => {
    try {
      return await axios.put(`${BASE_URL}/${id}`, editblog);  
    } catch(err) {
      console.log('Error while calling API', err);
    }
  }
  


