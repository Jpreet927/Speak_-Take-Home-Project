import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import {
    img500,
    bg1200,
    bgOriginal,
    posterUnavailable,
} from "../config/defaultImages";
import "../styles/HomePage/HomePage.css";
import GenreTag from "../components/GenreTag";

function HomePage() {
    const [headerMovie, setHeaderMovie] = useState({});
    const [headerMovieData, setHeaderMovieData] = useState({});
    const [popularMovies, setPopularMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);

    const getPopularMovies = async () => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&page=1`
        );

        setPopularMovies(response.data.results);
        const movieData = await getHeaderMovieData(response.data.results[0].id);
        console.log(movieData);
        setHeaderMovie(movieData);
    };

    const getHeaderMovieData = async (movieID) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US`
        );

        return response.data;
    };

    const getTrendingMovies = async () => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API}`
        );
        console.log(response.data.results);
        setTrendingMovies(response.data.results);
    };

    useEffect(() => {
        getPopularMovies();
        getTrendingMovies();
    }, []);

    return (
        <div className="home__container">
            <div className="home__header">
                <div className="home__header-details">
                    <div className="home__header-poster">
                        <img
                            src={
                                `${img500}${headerMovie.poster_path}` ||
                                posterUnavailable
                            }
                            alt=""
                        />
                    </div>
                    <div className="home__header-heading">
                        <h1>{headerMovie.title}</h1>
                        <div className="home__header-rating">
                            <p>
                                Rating:{" "}
                                <span>
                                    {Math.round(headerMovie.vote_average * 10) /
                                        10}{" "}
                                    / 10
                                </span>
                            </p>
                        </div>
                        <p>{headerMovie.overview}</p>
                        <div className="headerMovie-stats">
                            <p>
                                Release Date:{" "}
                                <span>{headerMovie.release_date}</span>
                            </p>
                            <p>
                                Runtime:{" "}
                                <span>{headerMovie.runtime} Minutes</span>
                            </p>
                        </div>
                        <div className="home__header-genres">
                            {headerMovie?.genres?.map((genre) => (
                                <GenreTag key={genre.id} genre={genre.name} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="home__header-vignette top"></div>
                <div className="home__header-vignette bottom"></div>
                <img src={`${bgOriginal}${headerMovie.backdrop_path}`} alt="" />
            </div>
            <div className="home__content">
                <div className="home__content-trending">
                    <h1>Trending</h1>
                    <MovieList movieList={trendingMovies} />
                </div>
                <div className="home__content-popular">
                    <h1>Popular</h1>
                    <MovieList movieList={popularMovies} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
