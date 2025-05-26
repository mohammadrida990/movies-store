"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavoriteMovies from "@/hooks/useFavoritesMovies";
import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlinePlus } from "react-icons/ai";

const FavoriteButton = ({ movieId }: { movieId: number }) => {
  const { mutate: mutateFavorites } = useFavoriteMovies();
  const { data: currentUser, mutate } = useCurrentUser();
  // const [isFavorite, setIsFavorite] = useState(false);
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);
  // const fetchFavorites = useCallback(async () => {
  //   try {
  //     const res = await axios.get("/api/favorites");
  //     const isFav = res.data.some((fav: { id: number }) => fav.id === movieId);
  //     setIsFavorite(isFav);
  //   } catch (err) {
  //     console.error("Error fetching favorites:", err);
  //   }
  // }, [movieId]);
  // useEffect(() => {
  //   fetchFavorites();
  //   // console.log(isFavorite);
  // }, [fetchFavorites]);

  const toggleFavorite = useCallback(async () => {
    let response;
    try {
      if (isFavorite) {
        response = await axios.delete("/api/favorite", { data: { movieId } });
        // setIsFavorite(false);
      } else {
        response = await axios.post("/api/favorite", { movieId });
        // setIsFavorite(true);
      }

      mutate({
        ...currentUser,
        favoriteIds: response.data.favoriteIds,
      });

      mutateFavorites();
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  }, [currentUser, isFavorite, movieId, mutate, mutateFavorites]);

  return (
    <div
      onClick={toggleFavorite}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 
    rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      {isFavorite ? (
        <AiFillHeart className="text-red-500" size={25} />
      ) : (
        <AiOutlinePlus className="text-white" size={25} />
      )}
    </div>
  );
};

export default FavoriteButton;
