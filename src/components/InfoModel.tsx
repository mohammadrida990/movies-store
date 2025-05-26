"use client";
import useInfoModel from "@/hooks/useInfoModel";
import useMovie from "@/hooks/useMovie";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";

const InfoModel = ({
  visible,
  onClose,
}: {
  visible: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose: any;
}) => {
  const [isVisible, setIsVisible] = useState(!!visible);

  const { movieId } = useInfoModel();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className="transition duration-300  z-50  bg-black  bg-opacity-85 flex justify-center
     items-center overflow-x-hidden fixed inset-0 overflow-y-auto"
    >
      <div className="relative overflow-hidden  w-auto mx-auto max-w-3xl rounded-md">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300  relative  flex-auto bg-zinc-800 drop-shadow-md`}
        >
          <div className="relative h-96">
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

            <div
              onClick={handleClose}
              className="absolute top-3  right-3 rounded-full
             bg-black w-10 h-10 bg-opacity-70 justify-center items-center flex"
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>

            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>

              <div className="flex flex-row gap-4 items-center ">
                <PlayButton movieId={data.id} />
                <FavoriteButton movieId={data.id} />
              </div>
            </div>
          </div>

          <div className="py-8 px-12">
            <p className="text-green-300 font-semibold  text-lg">New</p>

            <p className="text-white  text-lg">{data.duration}</p>
            <p className="text-white  text-lg capitalize my-5">{data.genre}</p>
            <p className="text-white  text-lg">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModel;
