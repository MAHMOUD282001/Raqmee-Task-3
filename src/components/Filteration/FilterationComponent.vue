<template>
  <div
    className="flex items-center justify-between flex-col 2xl:flex-row gap-5 w-full"
  >
    <FilterationComponentLeftSide />
    <FilterationComponentRightSide />
  </div>
</template>

<script>
import FilterationComponentLeftSide from "./FilterationComponentLeftSide.vue";
import FilterationComponentRightSide from "./FilterationComponentRightSide.vue";

export default {
  name: "FilterationComponent",
  components: {
    FilterationComponentLeftSide,
    FilterationComponentRightSide,
  },
};
</script>
