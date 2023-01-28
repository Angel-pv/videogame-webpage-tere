import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './Form.module.css';
import { validate, } from './formValidate.js';

export const Form = () => {

  const genres = useSelector((state) => state.genres);
  const platforms = [
    "PC",
    "PlayStation 5",
    "Xbox One",
    "PlayStation 4",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
    "Linux",
    "Xbox 360",
    "Xbox",
    "PlayStation 3",
    "PlayStation 2",
    "PlayStation",
    "PS Vita",
    "PSP",
    "Wii U",
    "Wii",
    "GameCube",
    "Nintendo 64",
    "Game Boy Advance",
    "Game Boy Color",
    "Game Boy",
    "SNES",
    "NES",
    "Classic Macintosh",
    "Apple II",
    "Commodore / Amiga",
    "Atari 7800",
    "Atari 5200",
    "Atari 2600",
    "Atari Flashback",
    "Atari 8-bit",
    "Atari ST",
    "Atari Lynx",
    "Atari XEGS",
    "Genesis",
    "SEGA Saturn",
    "SEGA CD",
    "SEGA 32X",
    "SEGA Master System",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
  ];

  const [form, setForm] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    platforms: [],
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: '',
    genres: '',
  });

  const handleOnChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setErrors(validate({ ...form, [property]: value }))
    setForm({ ...form, [property]: value })
  };

  const handlerSubmit = (event) => {
    event.preventDefault()
    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:3001/videogames', form)
        .then(res => alert(res.data))
        .catch(err => alert(err))

    } else {
      alert('ERROR: there are unfilled fields😕');
      console.log(errors)
    }
  };

  const handleGenres = (event) => {
    setForm({ ...form, genres: [...form.genres, event.target.value] });
  };
  const handleDeleteGenre = (event) => {
    setForm({ ...form, genres: form.genres.filter((g) => g !== event) });
  };

  const handlePlatform = (event) => {
    setForm({ ...form, platforms: [...form.platforms, event.target.value] });
  };
  const handleDeletePlataform = (event) => {
    setForm({ ...form, platforms: form.platforms.filter((p) => p !== event) });
  };
  return (
    <div className={style.formcontainer}>
      <h1>✨Add your own videogame✨</h1>
      <form onSubmit={handlerSubmit}>
        <div>
          <label htmlFor='name'>🕹️Game name: *</label>
          <input type='text' value={form.name} onChange={handleOnChange} name='name' placeholder='Write the game name...' autoComplete='off' />
          {errors.name && <p className={style.errorText}>{errors.name}</p>}
        </div>

        <div>
          <label>📝Description: *</label>
          <p>
            <textarea type='text' value={form.description} onChange={handleOnChange} name='description' placeholder='Write a short game description...' />
          </p>
          {errors.description && <p className={style.errorText}>{errors.description}</p>}
        </div>

        <div>
          <label>📆Released date: </label>
          <input type='text' value={form.released} onChange={handleOnChange} name='released' placeholder='dd-mm-yyyy' />
          {errors.released && <p className={style.errorText}>{errors.released}</p>}
        </div>

        <div>
          <label>⭐Rating: </label>
          <input type='text' value={form.rating} onChange={handleOnChange} name='rating' placeholder='Rating from 1 to 5...' />
          {errors.rating && <p className={style.errorText}>{errors.rating}</p>}
        </div>

        <div>
          <label>⚜️Genres: *</label>
          <select defaultValue="Seleccionar" onChange={(event) => handleGenres(event)}>
            <option disabled>Seleccionar</option>
            {genres?.map((g) => (<option value={g.name} key={g.id}> {g.name}</option>))}
          </select>
          {/* {errors.genres && <p className={style.errorSelectText}>{errors.genres}</p>} */}
        </div>

        <div>
          {form.genres.map((g) => (
            <div key={g}>
              {g + " "}
              <button key={g.id} value={g.name} onClick={() => handleDeleteGenre(g)}>X</button>
            </div>))}
        </div>

        <div>
          <label>🎮Platforms: *</label>
          <select defaultValue="Seleccionar" onChange={(event) => handlePlatform(event)}>
            <option disabled>Seleccionar</option>
            {platforms?.map((p) => (<option value={p} key={p}>{p}</option>))}
          </select>
          {/* {errors.platforms && <p className={style.errorSelectText}>{errors.platforms}</p>} */}
        </div>

        <div>
          {form.platforms.map((p) => (
            <div key={p}>
              {p + " "}
              <button onClick={() => handleDeletePlataform(p)}>X</button>
            </div>))}
        </div>

        <button type='submit'>Create Game</button>
        <div>
          <Link to='/home'>
            <button>◀ Return Home</button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Form;