<template>
  <section className="my-[75px]">
    <div className="container">
      <FilterationComponent />
      <AllProducts />
    </div>
  </section>
</template>

<script>
import FilterationComponent from "@/components/Filteration/FilterationComponent.vue";
import AllProducts from "@/components/Products/AllProducts.vue";
export default {
  name: "HomeView",
  components: {
    FilterationComponent,
    AllProducts,
  },
};
</script>
