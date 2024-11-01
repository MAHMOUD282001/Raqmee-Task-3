<template lang="">
  <div v-if="isPrice">
    <p class="text-[14px] font-[300] mb-1">{{ title }}</p>
    <div
      class="relative w-full h-[42px] border border-solid border-[#E5E5E5] rounded-[4px] px-[13px] py-[11px] flex"
    >
      <input
        :type="type"
        v-model="inputValue"
        :name="name"
        :class="'outline-none text-[#737373] text-[14px] ' + style"
        @input="updateValue"
        placeholder="0.00"
      />
      <CurrencyEuroIcon
        class="w-[20px] h-[20px] absolute top-1/2 -translate-y-1/2 left-[11px]"
      />
    </div>

    <p class="text-[12px] text-[#FF0000] mt-1" v-if="error">
      {{ error }}
    </p>
  </div>

  <div v-else>
    <p class="text-[14px] font-[300] mb-1">{{ title }}</p>
    <input
      :type="type"
      v-model="inputValue"
      :name="name"
      :class="'outline-none text-[#737373] text-[14px] ' + style"
      @input="updateValue"
    />

    <p class="text-[12px] text-[#FF0000] mt-1" v-if="error">
      {{ error }}
    </p>
  </div>
</template>
<script>
import { CurrencyEuroIcon } from "@heroicons/vue/24/outline";
export default {
  name: "CommonInput",
  components: {
    CurrencyEuroIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    isPrice: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    updateValue() {
      this.$emit("update:modelValue", this.inputValue);
    },
  },
};
</script>
<style lang=""></style>
