
import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:4000/toys";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // READ: Get all toys when the app loads
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch toys");
        }

        return response.json();
      })
      .then((data) => {
        setToys(data);
      })
      .catch((error) => {
        console.error("Error loading toys:", error);
      });
  }, []);

  // Show or hide the new toy form
  function handleClick() {
    setShowForm((previousValue) => !previousValue);
  }

  // CREATE: Add a saved toy to React state
  function handleAddToy(newToy) {
    setToys((previousToys) => [
      ...previousToys,
      newToy
    ]);
  }

  // UPDATE: Replace one toy with its updated version
  function handleUpdateToy(updatedToy) {
    setToys((previousToys) =>
      previousToys.map((toy) =>
        toy.id === updatedToy.id
          ? updatedToy
          : toy
      )
    );
  }

  // DELETE: Remove the matching toy from React state
  function handleDeleteToy(deletedId) {
    setToys((previousToys) =>
      previousToys.filter(
        (toy) => toy.id !== deletedId
      )
    );
  }

  return (
    <>
      <Header />

      {showForm ? (
        <ToyForm onAddToy={handleAddToy} />
      ) : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>
          Add a Toy
        </button>
      </div>

      <ToyContainer
        toys={toys}
        onUpdateToy={handleUpdateToy}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;
