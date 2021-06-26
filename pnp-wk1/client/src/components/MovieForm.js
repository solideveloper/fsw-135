import React, { useState } from "react";

export default function AddMovieForm(props) {
  const initInputs = { title: props.title || "", genre: props.genre || "", releaseYear: props.releaseYear || "" };
  const [inputs, setInputs] = useState(initInputs);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.submit(inputs, props._id);
    setInputs(initInputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={inputs.title}
        onChange={handleChange}
        placeholder="Title"
      />
           <select name="genre" onChange={handleChange}>
           <option value="reset">Choose Genre</option>
           <option value="Action">Action</option>
           <option value="Comedy">Comedy</option>
           <option value="Fantasy">Fantasy</option>
           <option value="Drama">Drama</option>
           <option value="Suspense">Suspense</option>
      </select>
      <input
        type="text"
        name="releaseYear"
        value={inputs.releaseYear}
        onChange={handleChange}
        placeholder="Release Year"
      />

      <button>{props.btnText}</button>
    </form>
  );
}