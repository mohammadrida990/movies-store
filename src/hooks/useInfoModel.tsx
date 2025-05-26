import { create } from "zustand";

type InfoModel = {
  movieId?: string;
  isOpen: boolean;
  openModel: (movieId: string) => void;
  closeModel: () => void;
};
const useInfoModel = create<InfoModel>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModel: (movieId: string) => set({ isOpen: true, movieId }),
  closeModel: () => set({ isOpen: false, movieId: undefined }),
}));

export default useInfoModel;
