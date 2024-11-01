<template>
  <div
    :class="`dropdown text-[14px] relative ${
      isFilter ? 'w-full sm:flex-1 md:w-[202px] h-[44px]' : 'w-full'
    }`"
  >
    <!-- Dropdown Button -->
    <button
      type="button"
      @click="toggleDropdown"
      :class="`${
        isFilter ? 'h-[44px] w-full md:w-[202px]' : 'h-[42px] w-full'
      } border border-solid border-[#E5E5E5] rounded-[4px] text-[#737373] px-[13px] py-[11px] flex items-center justify-between`"
    >
      {{ selectedOption || "Select" }}
      <ChevronDownIcon class="w-[20px] h-[20px] text-[#171717]" />
    </button>

    <!-- Dropdown List -->
    <div
      v-if="isOpen"
      :class="`dropdown-values bg-white shadow-xl border border-solid border-[#E4E4E4] px-[15px] py-[11px] rounded-[4px] absolute top-[calc(100%_+_5px)] z-10 ${
        isFilter ? 'w-full md:w-[202px]' : 'w-full'
      }`"
    >
      <div
        class="dropdown-value leading-[22px] cursor-pointer hover:bg-gray-100"
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(type, option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

export default {
  name: "ReusableDropdown",
  components: {
    ChevronDownIcon,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    selectedOption: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "categories",
    },
    isFilter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(type, option) {
      this.$emit("update:selectedOption", type, option); // Emit the selected option to parent
      this.isOpen = false;
    },
  },
};
</script>
