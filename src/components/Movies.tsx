"use client";
import React from "react";
import MovieList from "./MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavoriteMovies from "@/hooks/useFavoritesMovies";

// type Movie = {
//   id: number;
//   thumbnailUrl: string;
//   videoUrl: string;
//   title: string;
//   description: string;
// };
const Movies = () => {
  const { data } = useMovieList();
  const { data: favorites = [] } = useFavoriteMovies();
  //   console.log(data);
  //   const [movies, setMovies] = useState<Movie[] | null>(null);
  //   const [favoritesMovies, setFavoritesMovies] = useState<Movie[] | null>(null);

  //   useEffect(() => {
  //     // const fetchMovie = async () => {
  //     //   const res = await fetch("/api/random");
  //     //   const data = await res.json();
  //     //   setMovie(data);
  //     // };

  //     const fetchMovie = async () => {
  //       try {
  //         const res = await axios.get("/api/movies");
  //         setMovies(res.data);
  //       } catch (err) {
  //         console.error("Error fetching movie:", err);
  //       }
  //     };

  //     const fetchFavoriteMovie = async () => {
  //       try {
  //         const res = await axios.get("/api/favorites");
  //         setFavoritesMovies(res.data);
  //       } catch (err) {
  //         console.error("Error fetching movie:", err);
  //       }
  //     };

  //     fetchMovie();
  //     fetchFavoriteMovie();
  //   }, []);

  return (
    <div className="pb-40">
      <MovieList title="Trending now" data={data || []} />
      <MovieList title="My list" data={favorites || []} />
    </div>
  );
};

export default Movies;
