"use client";

import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

type Props = {
  id: string;
};

const WatchClient = ({ id }: Props) => {
  const router = useRouter();
  const { data } = useMovie(id);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full z-10 p-4 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          className="text-white cursor-pointer"
          size={40}
          onClick={() => router.push("/")}
        />
        <p className="text-white text-xl lg:text-3xl font-bold">
          <span className="font-light">Watching</span> {data?.title}
        </p>
      </nav>

      <video
        controls
        muted
        poster={data?.thumbnailUrl}
        className="w-full h-full object-cover"
      >
        <source src={data?.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default WatchClient;
