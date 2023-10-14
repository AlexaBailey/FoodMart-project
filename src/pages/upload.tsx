import React, { createRef } from 'react'
import Navbar from '../pages/components/Navbar'
import Infonav from '../pages/components/Infonav'
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import setToken from './utilities/setToken';
import jwtDecode from 'jwt-decode';
import Footer from './components/Footer'
import { ChangeEvent } from 'react';
import axios from 'axios';

export default function Upload() {
  const [hasLoaded, setLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [title,setTitle]= useState("")
  const [price,setPrice]= useState("")
  const [author,setAuthor]= useState("")
  const [cat, setCat]=useState("")
  const [weight, setWeight]=useState("")
  const [info,setInfo]=useState(null)

  const categoryHandle = (cat) => {
    console.log(cat)
    setCat(cat);
  }
  console.log("title", title)
      const inputRef = useRef<HTMLInputElement | null>(null);
      const handleUploadClick = () => {
        inputRef.current?.click();
       
      };
      let jwtUser;
 

useEffect((jwtUser?) => {
    setLoaded(true)
 
}, []);

       

   
   

  const changeProductImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
     
      setSelectedImage(e.target.files[0]);
      
    }
    setSelectedFile(e.target.files[0]);
  };

  const deleteImage = () => {
    setSelectedImage(null);
  };

  const [selectedFile, setSelectedFile] = useState(null);


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title',title),
    formData.append('price',price),
    formData.append('author',author),
    formData.append('cat',cat),
    formData.append('usersid',jwtUser.id )
    formData.append('weight',weight),



    axios.post('http://localhost:8800/upload', formData)
      .then((response) => {
        console.log(response.data);
        alert("✔️ Product added successfully!")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
useEffect(() => {
  setLoaded(true);
  const getData = async () => {
          
   

    try {

  
      
      const res = await axios.get(`http://localhost:8800/categories`);
 
      setInfo(res.data)


     

       console.log("Data",res.data)
    } catch (err) {
      console.log(err);
    }
  };
  getData();


  

}, []);
var categ=[];
if (info && info!='' && info!=null){
  info.map(function(c){
    categ.push(c.categname)
  

  })

}
if (hasLoaded){

    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setToken(jwt);
      jwtUser = jwtDecode(jwt);
      console.log(jwtUser)
  }
  return (
    <>
    <Navbar />      
    <Infonav/>
    <div className='upload'>


<h2 style={{textAlign:'center'}}>Add new product</h2>
<div className='container'>


{/* 👇 Our custom button to select and upload a file */}
<button id="b" style={{display:selectedImage&&"none", backgroundColor:'transparent', border:'none'}}  onClick={handleUploadClick}>
{!selectedImage &&  <img style={{height:300, borderRadius:16}} src="./add-image.png"/>}
</button>
{/* 👇 Notice the `display: hidden` on the input */}
<input
type="file"
ref={inputRef}
onChange={changeProductImg}
style={{ display: 'none' }}
/>
    {selectedImage && (
      <div className="preview" >
        <img 
        
      

          src={URL.createObjectURL(selectedImage)}
          className="preview-image"
          alt="Thumb"
          onClick={changeProductImg}
          
        />
        <button className='save-button remove' onClick={deleteImage}>
          Remove This Image
        </button>
      </div>
  
    )}

  </div>
  <div>
  <h3>Description</h3>
  <form style={{display:'flex', gap:10,flexDirection:'column'}} onSubmit={handleSubmit} >


  <p>Title</p>
    <input name="title"   onChange={(e)=>setTitle(e.target.value)} className='special-input green' placeholder='Enter title'/>
    <p>Author</p>
    <input  name="author" onChange={(e)=>setAuthor(e.target.value)}  className='special-input green' placeholder='Enter author'/>
    <p>Price</p>
    <input className='special-input green' name="price" onChange={(e)=>setPrice(e.target.value)}   placeholder='Enter price'/>
    <p>Weight</p>
    <input className='special-input green'name="weight" onChange={(e)=>setWeight(e.target.value)}  placeholder='Enter quantity/weight'/>
    <p>Category</p>
    <div  className="selecti">
      
            
      <label>
    <select  name='cat'  value={cat} onChange={event => categoryHandle(event.target.value)}>
    <option id="0"  onClick={()=>setCat('')} >Select category</option>

    {categ ? categ.map(c=>{return(<option onClick={()=>setCat(c)} >{c}</option>)}) 
      :null}
       
      </select>
      </label>
      </div>
    <br/>
    <button className='save-button green' style={{width:120, marginTop:18, alignSelf:'center'}} onClick={handleSubmit}> Save work</button>

   </form>



  </div>
  
 
  
</div>
<Footer/>


  



    </>
   
    
  )


}
else{
  return null
}
}


  