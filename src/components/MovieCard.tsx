import Image from "next/image";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/navigation";
import useInfoModel from "@/hooks/useInfoModel";
import { BiChevronsDown } from "react-icons/bi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MovieCard = ({ data }: { data: any }) => {
  const router = useRouter();
  const { openModel } = useInfoModel();
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <Image
        src={data.thumbnailUrl}
        alt=""
        priority
        sizes=""
        fill
        className="cursor-pointer
            object-cover transition duration shadow-xl rounded-md
        group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-full"
      />

      <div
        className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible 
            delay-300 w-full h-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw]
            group-hover:translate-x-[2vw] group-hover:opacity-100
            "
      >
        <div className="relative w-full h-full">
          <Image
            src={data.thumbnailUrl}
            alt=""
            priority
            sizes=""
            fill
            className="cursor-pointer
                object-cover transition duration shadow-xl rounded-t-md
                w-full h-full"
          />
        </div>

        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              className="
                cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center
                items-center transition  hover:bg-neutral-300
            "
              onClick={() => router.push(`/watch/${data?.id}`)}
            >
              <BsFillPlayFill className="text-black" size={30} />
            </div>

            <FavoriteButton movieId={data?.id} />

            <div
              onClick={() => openModel(data?.id)}
              className="cursor-pointer group/item ml-auto w-6 h-6 lg:w-10 lg:h-10
             border-white border-2  rounded-full flex justify-center  items-center transition hover:bg-neutral-300"
            >
              <BiChevronsDown
                className="text-white group-hover/item:text-neutral-300"
                size={30}
              />
            </div>
          </div>

          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white ">2023</span>
          </p>

          <div className="flex flex-row mt-4 items-center gap-2 capitalize">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>

          <div className="flex flex-row mt-4 items-center gap-2 capitalize">
            <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
