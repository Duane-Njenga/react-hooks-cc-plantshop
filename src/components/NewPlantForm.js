import React, { useState } from "react";

function NewPlantForm({setPlants, plants}) {
  const [nameInput, setNameInput] = useState(" ")
  const [imageInput,setImageInput ] = useState(" ")
  const [priceInput,setPriceInput ] = useState(0)

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  }
  
  const handleImageChange = (e) => {
    setImageInput(e.target.value);
  }
  
  const handlePriceChange = (e) => {
    setPriceInput(e.target.value);
  }
  const handleSubmit =  (e)=> {
    e.preventDefault();
    const newPlant = {
      name:nameInput,
      image: imageInput,
      price:priceInput
    }
    fetch("http://localhost:6001/plants", {
      method:"POST",
      headers:{
        "Content-Type":"Application/JSON",
      },
      body:JSON.stringify(newPlant)
    })
    .then(res => res.json())
    .then(savedPlant => {
    setImageInput("")
    setNameInput("")
    setPriceInput(0)
    setPlants([...plants, savedPlant])})
  }
  
  

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="name" 
        placeholder="Plant name" 
        onChange={handleNameChange}
        value={nameInput}
        />

        <input 
        type="text" 
        name="image" 
        placeholder="Image URL" 
        onChange={handleImageChange}
        value={imageInput}
        />
        <input 
        type="number" 
        name="price" 
        step="0.01" 
        placeholder="Price" 
        onChange={handlePriceChange}
        value={priceInput}
        />
        <button type="submit"
        >Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
