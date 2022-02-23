import { useEffect, useState } from 'react';
import React from "react";
import './App.css';
import Movie from "./Movie";
import Filter from './Filter';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=a8d2809ffb252ccf808f1d3e5c5cd3ba&language=en-US&page=1"
    );
    // turn the data into a json objects thats easy to work with
    const movies = await data.json();
    //store the movies so use useState
    setPopular(movies.results);
    setFiltered(movies.results);
    console.log(movies);
  }
  return (
    <div className="App">
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div layout className="popular-movies">
        <AnimatePresence>
          {filtered.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

  // https://api.themoviedb.org/3/movie/550?api_key=a8d2809ffb252ccf808f1d3e5c5cd3ba
  

export default App;