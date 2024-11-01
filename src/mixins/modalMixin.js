export const modalMixin = {
  data() {
    return {
      modalState: false,
    };
  },
  methods: {
    toggleModalState(state) {
      this.modalState = state;
    },
  },
};
