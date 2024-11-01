<template>
  <div
    className="right-side flex items-center gap-[15px] flex-wrap w-full md:w-auto"
  >
    <p className="text-[14px] text-[#171717]">Sort by</p>

    <CommonDropdown
      :options="sortingDropdownValues"
      :selectedOption="selectedSortingValue"
      @update:selectedOption="selectValue"
      :type="'sorting'"
      :isFilter="true"
    />

    <CommonDropdown
      :options="categoriesDropdownValues"
      :selectedOption="selectedCategoryValue"
      @update:selectedOption="selectValue"
      :type="'categories'"
      :isFilter="true"
    />

    <CommonBtn
      class="bg-[#D9F99D] font-[300] w-full md:w-auto flex items-center justify-center gap-[10px] h-[44px]"
      type="'button'"
      @click="toggleModal(true)"
    >
      <PlusIcon class="w-[20px] h-[20px] stroke-[3px]" />
      Add Item
    </CommonBtn>
  </div>

  <SellProductModal v-if="modalState" @closeModal="toggleModal(false)" />
</template>
<script>
import { PlusIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";
import { useFilterationStore } from "@/stores/filterProductsStore";
import { useModalStateStore } from "@/stores/modalStateStore";
import SellProductModal from "@/components/SellProductModal/SellProductModal.vue";
import CommonBtn from "@/components/common/CommonBtn.vue";
import CommonDropdown from "@/components/common/CommonDropdown.vue";

export default {
  name: "FilterationComponentLeftSide",
  data() {
    return {
      sortingDropdownValues: [
        "A - Z",
        "Z - A",
        "Price: Low to High",
        "Price: High to Low",
      ],

      categoriesDropdownValues: [
        "All",
        "Electronics",
        "Clothing",
        "Mobile Phones",
        "Home appliances",
      ],
      isSortingDropdownOpen: false,
      isCategoriesDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown(type) {
      if (type === "sorting") {
        this.isSortingDropdownOpen = !this.isSortingDropdownOpen;
      } else if (type === "categories") {
        this.isCategoriesDropdownOpen = !this.isCategoriesDropdownOpen;
      }
    },
    selectValue(type, value) {
      if (type === "sorting") {
        this.selectedSortingValue = value;
        this.isSortingDropdownOpen = false;
      } else if (type === "categories") {
        this.selectedCategoryValue = value;
        this.isCategoriesDropdownOpen = false;
      }
    },

    toggleModal(state) {
      this.modalState = state;
    },
  },

  components: {
    PlusIcon,
    SellProductModal,
    CommonBtn,
    CommonDropdown,
  },

  setup() {
    const filterationStore = useFilterationStore();
    const modalStateStore = useModalStateStore();

    const selectedSortingValue = computed({
      get: () => filterationStore.sortingSelectedValue,
      set: (value) => filterationStore.setSortingSelectedValue(value),
    });

    const selectedCategoryValue = computed({
      get: () => filterationStore.categorySelectedValue,
      set: (value) => filterationStore.setCategorySelectedValue(value),
    });

    const modalState = computed({
      get: () => modalStateStore.modalState,
      set: (value) => modalStateStore.setModalState(value),
    });

    function updateSortingDropdown() {
      filterationStore.setSortingSelectedValue(selectedSortingValue.value);
    }

    function updateCategoryDropdown() {
      filterationStore.setCategorySelectedValue(selectedCategoryValue.value);
    }

    function updateModalState() {
      modalStateStore.setModalState(modalState.value);
    }

    return {
      selectedSortingValue,
      selectedCategoryValue,
      modalState,
      updateSortingDropdown,
      updateCategoryDropdown,
      updateModalState,
    };
  },
};
</script>
