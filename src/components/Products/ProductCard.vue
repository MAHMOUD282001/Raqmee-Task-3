<template lang="">
  <div
    class="max-w-[326px] mx-auto sm:mx-0"
    v-for="product in products"
    :key="product.id"
  >
    <div class="w-full h-[326px]">
      <img
        :src="product.image"
        alt="Product Img"
        class="w-full h-full object-cover rounded-[4px]"
      />
    </div>

    <div class="flex items-center justify-between mt-[10px]">
      <div>
        <p class="text-[13px] font-[300]">{{ product.name }}</p>
        <h6 class="text-[16px] font-[400]">${{ product.price }}</h6>
      </div>

      <div
        class="border border-solid border-[#E5E5E5] p-[8px] rounded-[4px] flex items-center justify-center"
      >
        <HeartIcon class="w-[20px] h-[20px]" />
      </div>
    </div>

    <div class="mt-2 flex items-center gap-1">
      <div>
        <img
          src="@/assets/imgs/girl.png"
          alt="Product Img"
          class="w-[20px] h-[20px] object-cover rounded-full"
        />
      </div>

      <div>
        <p class="text-[10px] font-[400]">Josie Parker</p>
      </div>
    </div>
  </div>
</template>
<script>
import { HeartIcon } from "@heroicons/vue/24/outline";

export default {
  name: "ProductCard",
  props: ["products"],
  components: {
    HeartIcon,
  },
};
</script>
