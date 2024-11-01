import { defineStore } from "pinia";

export const useModalStateStore = defineStore("modalState", {
  state: () => ({
    modalState: false,
  }),
  actions: {
    setModalState(state) {
      this.modalState = state;
    },
  },
});
