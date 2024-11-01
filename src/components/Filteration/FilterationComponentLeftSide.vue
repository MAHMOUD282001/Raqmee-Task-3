<template>
  <div class="left-side w-full md:w-[529px]">
    <div
      class="relative w-full h-[44px] border border-solid border-[#E5E5E5] rounded-[4px] flex items-center px-[13px] py-[11px]"
    >
      <input
        type="text"
        placeholder="Search"
        v-model="searchTerm"
        @input="updateSearch"
        class="border-none outline-none text-[#737373] placeholder-[#737373] text-[14px] w-full"
      />
      <MagnifyingGlassIcon
        class="w-[20px] h-[20px] absolute top-1/2 -translate-y-1/2 right-[11px]"
      />
    </div>
  </div>
</template>

<script>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";
import { useFilterationStore } from "@/stores/filterProductsStore";

export default {
  name: "FilterationComponentLeftSide",
  components: {
    MagnifyingGlassIcon,
  },
  setup() {
    const searchStore = useFilterationStore();

    const searchTerm = computed({
      get: () => searchStore.searchTerm,
      set: (value) => searchStore.setSearchTerm(value),
    });

    function updateSearch() {
      searchStore.setSearchTerm(searchTerm.value);
    }

    return {
      searchTerm,
      updateSearch,
    };
  },
};
</script>
