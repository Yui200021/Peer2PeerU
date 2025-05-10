import React, { useState, useEffect } from 'react'
import './Listing.css';
import axios from "axios";

const Lisiting = () => {
    const[title, setTitle]= useState('');
    const[description, setDescription]= useState('');
    const[price, setPrice]= useState('');
    const[category,setCategory]= useState('');
    const[categories, setCategories]= useState([]);
    const[image, setImage]= useState(null)
    const[condition, setCondition]= useState('')
    const handleSubmit= async ()=>{
        if(!title || !description || !price || !image){
            alert("Please fill in all fields");
            return
        }
        const formData= new FormData();
        formData.append("title",title);
        formData.append("description", description);
        formData.append("price",price);
        formData.append("image", image);
        formData.append("categoryId", category);
        formData.append("condition", condition);

        try {
            const studentId = localStorage.getItem("studentId");
            await axios.post(`http://localhost:8000/items/${studentId}`, formData);
            alert("Item listed successfully! 🎉");
            setTitle('');
            setDescription('');
            setPrice('');
            setImage(null);
          } catch (err) {
            console.error(err);
            alert("Failed to list item.");
          }
    }
    useEffect(()=>{
        axios.get('http://localhost:8000/categories')
        .then(response=>{
            setCategories(response.data)
        })
        .catch(error=>{
            console.error('Failed to fetch categories:', error)
        });
    }, []);
  return (
    <div className='listing-page'>
        
        <div className='item-descriptiion'>
            <form className="item-form" onSubmit={(e)=>{e.preventDefault();handleSubmit();}}>
            <label htmlFor="Item Name" >Item Name</label>
            <input type="text"
                    id="itemname"
                    className='item-name' 
                    placeholder='Enter Item Name'
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}/>
            <label htmlFor="Item Description" >Description</label>
            <input type="text"
                    id="description"
                    className='item-description' 
                    placeholder='Enter Item Description'
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}/>
                    <label htmlFor="Item Price" >Item Price</label>
            <input type="text"
                    id="price"
                    className='item-price' 
                    placeholder='Enter Item Price'
                    value={price}
                    onChange={(e)=> setPrice(e.target.value)}/>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                <option value="">Select Category</option>
                {categories.map(cat => (
                    <option key={cat.CategoryID} value={cat.CategoryID}>
                    {cat.CategoryName}
                    </option>
                ))}
            </select>
            <select value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            </select>

            <label htmlFor="image">Upload Image</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button type="submit">Submit</button>

             </form>
            
        </div>
    </div>
  )
}

export default Lisiting
