import React, { useState } from 'react';
import axios from 'axios';

const AddMovieForm = () => {
  const [file, setFile] = useState(null);
  const [movieDto, setMovieDto] = useState({
    movieId: 1,
    title: '',
    director: '',
    studio: '',
    caste: [],
    year: 0,
    poster: 'default.png',
    posterUrl: 'url'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieDto(prevState => ({
      ...prevState,
      [name]: name === 'caste' ? value.split(',') : value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('movieDto', JSON.stringify(movieDto));

    try {
      const response = await axios.post('http://localhost:8080/api/v1/movie/add-movie', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Movie added successfully:', response.data);
      // Reset form fields
      setFile(null);
      setMovieDto({
        movieId: 1,
        title: '',
        director: '',
        studio: '',
        caste: [],
        year: 0,
        poster: 'default.png',
        posterUrl: 'url'
      });
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={movieDto.title} 
          onChange={handleChange} 
          className="form-control" 
          required 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="director" className="form-label">Director</label>
        <input 
          type="text" 
          id="director" 
          name="director" 
          value={movieDto.director} 
          onChange={handleChange} 
          className="form-control" 
          required 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="studio" className="form-label">Studio</label>
        <input 
          type="text" 
          id="studio" 
          name="studio" 
          value={movieDto.studio} 
          onChange={handleChange} 
          className="form-control" 
          required 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="year" className="form-label">Year</label>
        <input 
          type="number" 
          id="year" 
          name="year" 
          value={movieDto.year} 
          onChange={handleChange} 
          className="form-control" 
          required 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="caste" className="form-label">Caste (Comma-separated)</label>
        <input 
          type="text" 
          id="caste" 
          name="caste" 
          value={movieDto.caste.join(',')} 
          onChange={handleChange} 
          className="form-control" 
          required 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="file" className="form-label">Poster</label>
        <input 
          type="file" 
          id="file" 
          name="file" 
          onChange={handleFileChange} 
          className="form-control" 
          required 
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;
