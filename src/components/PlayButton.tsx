import { useRouter } from "next/navigation";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";

const PlayButton = ({ movieId }: { movieId: string }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-sm lg:text-lg
     font-semibold flex flex-row items-center justify-center transition hover:bg-neutral-300 text-black"
    >
      <BsFillPlayFill size={25} className="mr-2 text-black" />
      Play
    </button>
  );
};

export default PlayButton;
