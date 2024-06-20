import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import AddMovie from './AddMovie';

function Home() {
    const [authorized, setAuthorized] = useState(false);
    const [role, setRole] = useState("");
    const [movies, setMovies] = useState([]);
    const [navigate,setNavigate] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');

        if (!token) {
            setAuthorized(false);
        } else {
            // Set the default authorization header for axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Fetch some protected data or verify token validity
            axios.get("http://localhost:8080/api/v1/movie/movies")
                .then(response => {
                    console.log(response.data);
                    setMovies(response.data);
                    setAuthorized(true);
                    setRole(userRole);
                })
                .catch(error => {
                    console.error("Error verifying token:", error);
                    setAuthorized(false);
                });
        }
    }, []);
    const deleteMovie = (id) => {
        axios.delete(`http://localhost:8080/api/v1/movie/delete/${id}`)
            .then(response => {
                console.log(response.data);
                setMovies(movies.filter(movie => movie.movieId !== id));
            })
            .catch(error => {
                console.error("Error deleting movie:", error);
            });
    };

    const handle = ()=>{
        setNavigate(true);
    }

    if(navigate){
        return <Navigate to='/' />
    }

    return (
        <div>
            {role === 'ADMIN' ? (
                <>
                    <h1 className='text-center mb-3 mt-3'>Welcome to Admin Page</h1>
                    <AddMovie />
                </>
            ) : (
                <div></div>
            )}
            <div>
                <div className='d-flex justify-content-between mt-3'>
                <h2 className='ms-4'>Movies</h2>
                <h2 className='text-end btn btn-danger me-4' onClick={handle}>Logout</h2>
                </div>
                <div className="row">
                    {movies.map(movie => (
                        <div className="col-md-4 mb-4 p-5" key={movie.movieId}>
                            <div className="card bg-dark rounded-5">
                                <img src={movie.posterUrl} className="card-img-top w-100 h-100 p-3" alt={movie.title} />
                                <div className="card-body">
                                    <h1 className="card-title text-white mb-3">{movie.title}</h1>
                                    <table className="table text-white">
                                        <tbody className='text-white'>
                                            <tr>
                                                <th scope="row">Director:</th>
                                                <td>{movie.director}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Studio:</th>
                                                <td>{movie.studio}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Year:</th>
                                                <td>{movie.year}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Caste:</th>
                                                <td>{movie.caste.join(', ')}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {role === 'ADMIN' && (
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-danger" onClick={() => deleteMovie(movie.movieId)}>Delete</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;

