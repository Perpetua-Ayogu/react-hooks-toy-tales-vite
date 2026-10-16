
import React, { useState } from "react";

const API_URL = "http://localhost:4000/toys";

function ToyForm({ onAddToy }) {
  const [formData, setFormData] = useState({
    name: "",
    image: ""
  });

  function handleChange(event) {
    setFormData((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newToy = {
      name: formData.name,
      image: formData.image,
      likes: 0
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create toy");
        }

        return response.json();
      })
      .then((savedToy) => {
        onAddToy(savedToy);

        setFormData({
          name: "",
          image: ""
        });
      })
      .catch((error) => {
        console.error("Error creating toy:", error);
      });
  }

  return (
    <div className="container">
      <form
        className="add-toy-form"
        onSubmit={handleSubmit}
      >
        <h3>Create a toy!</h3>

        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />

        <br />

        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />

        <br />

        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
