"use client";

import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useInfoModel from "@/hooks/useInfoModel";

// type Movie = {
//   thumbnailUrl: string;
//   videoUrl: string;
//   title: string;
//   description: string;
// };
const Billboard = () => {
  const { data } = useBillboard();
  const { openModel } = useInfoModel();
  const handelOpenModel = useCallback(() => {
    openModel(data?.id);
  }, [data?.id, openModel]);
  // const [movie, setMovie] = useState<Movie | null>(null);

  // useEffect(() => {
  //   // const fetchMovie = async () => {
  //   //   const res = await fetch("/api/random");
  //   //   const data = await res.json();
  //   //   setMovie(data);
  //   // };

  //   const fetchMovie = async () => {
  //     try {
  //       const res = await axios.get("/api/random");
  //       setMovie(res.data);
  //     } catch (err) {
  //       console.error("Error fetching movie:", err);
  //     }
  //   };

  //   fetchMovie();
  // }, []);

  if (!data) return <div>Loading...</div>;
  return (
    <div className="relative h-1/2">
      <video
        // controls
        poster={data?.thumbnailUrl}
        // autoPlay
        muted
        // loop
        className="w-full h-full object-cover brightness-[60%]"
      >
        {/* <source src={movie.videoUrl} type="video/mp4" /> */}
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-2xl md:text-5xl h-full w-full lg:text-6xl font-bold drop-shadow-xl capitalize">
          {data.title}
        </p>

        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-1/2 drop-shadow-xl">
          {data.description}
        </p>

        <div className="flex flex-row items-center mt-3 gap-4 md:mt-3">
          <PlayButton movieId={data?.id} />

          <button
            onClick={handelOpenModel}
            className="bg-white text-white bg-opacity-30  rounded-md py-1 mdLpy-2 px-2
           md:px-4 w-auto text-sm lg:text-lg font-semibold flex flex-row items-center 
           hover:bg-opacity-20 transition"
          >
            <AiOutlineInfoCircle className="mr-1" />
            More info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
