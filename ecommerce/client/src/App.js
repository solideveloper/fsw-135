import React, { useState, useEffect } from "react";
import axios from "axios";
import Inventory from "./components/Inventory.js";
import InventoryForm from "./components/InventoryForm.js";

export default function App() {
  const [items, setItems] = useState([])

  function getItems() {
    axios
      .get("/inventory")
      .then(res => setItems(res.data))
      .catch(err => console.log(err.response.data.errMsg));
  }

  function addItem(newItem) {
    axios
      .post("/items", newItem)
      .then(res => {
        setItems(prevItems => [...prevItems, res.data]);
      })
      .catch(err => console.log(err.response.data.errMsg));
  }

  function deleteItem(inventoryId) {
    axios
      .delete(`/items/${inventoryId}`)
      .then(res => {
        setItems(prevItems =>
          prevItems.filter(item => item._id !== inventoryId)
        );
      })
      .catch(err => console.log(err));
  }

  function editItem(updates, inventoryId) {
    axios
      .put(`/items/${inventoryId}`, updates)
      .then(res => {
        setItems(prevItems =>
          prevItems.map(item => (item._id !== inventoryId ? item : res.data))
        );
      })
      .catch(err => console.log(err));
  }

  function handleFilter(e) {
    if(e.target.value === 'reset') {
      getItems()
    } else {
      axios.get(`/items/search/genre?genre=${e.target.value}`)
      .then(res => setItems(res.data))
      .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <div className="item-container">
        <InventoryForm submit={addItem} btnText="Add Item" />

       

        <h4>Filter by Price</h4>
        <select onChange={handleFilter} className="filter-form">
          <option value="Reset">All Items</option>
          <option value="Action">Action</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Drama">Drama</option>
          <option value="Suspense">Suspense</option>
          <option value="Comedy">Comedy</option>
        </select>

        {items.map(item => (
          <Inventory
            {...item}
            key={item.name}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        ))}
      </div>

    </div>
  );
}