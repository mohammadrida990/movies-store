import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useMovie = (id?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  );

  return { data, error, isLoading, mutate };
};

export default useMovie;
