import { defineStore } from "pinia";

export const useFilterationStore = defineStore("search", {
  state: () => ({
    searchTerm: "",
    sortingSelectedValue: "Price: Low to High",
    categorySelectedValue: "All",
  }),
  actions: {
    setSearchTerm(term) {
      this.searchTerm = term;
    },

    setSortingSelectedValue(selectedValue) {
      this.sortingSelectedValue = selectedValue;
    },

    setCategorySelectedValue(selectedValue) {
      this.categorySelectedValue = selectedValue;
    },
  },
});
