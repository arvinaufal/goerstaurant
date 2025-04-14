import { create } from 'zustand';

const useNavbarStore = create((set) => ({
    currentMenu: 'home',
    updateCurrentMenu: (newMenu) => set({ currentMenu: newMenu }),
}));

export default useNavbarStore;