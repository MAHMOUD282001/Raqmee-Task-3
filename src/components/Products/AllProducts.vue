<template>
  <div>
    <div
      class="mt-[40px] mb-[50px] grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]"
      v-if="paginatedProducts.length > 0"
    >
      <ProductCard :products="paginatedProducts" />
    </div>

    <div
      class="flex items-center justify-center flex-col mt-32"
      v-if="filteredProducts.length === 0"
    >
      <img
        src="@/assets/imgs/no products.svg"
        class="w-[300px]"
        alt="No Products"
      />
      <p class="text-[20px] font-[400] mt-3">There are No Products</p>
    </div>

    <!-- Pagination Component -->
    <ProductsPagination
      v-if="filteredProducts.length > pageSize"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useFilterationStore } from "@/stores/filterProductsStore";
import ProductCard from "./ProductCard.vue";
import ProductsPagination from "@/components/Pagination/ProductsPagination.vue";
import { useModalStateStore } from "@/stores/modalStateStore";

export default {
  name: "AllProducts",
  components: {
    ProductCard,
    ProductsPagination,
  },
  setup() {
    const filterationStore = useFilterationStore();
    const modalStateStore = useModalStateStore();
    const products = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(4);

    onMounted(() => {
      products.value = JSON.parse(localStorage.getItem("allProducts")) || [];
    });

    watch(
      () => modalStateStore.modalState,
      (newModalState) => {
        if (!newModalState) {
          products.value =
            JSON.parse(localStorage.getItem("allProducts")) || [];
        }
      }
    );

    const filteredProducts = computed(() => {
      const searchTerm = filterationStore.searchTerm.toLowerCase();
      const sortingSelectedValue = filterationStore.sortingSelectedValue;
      const categorySelectedValue = filterationStore.categorySelectedValue;

      let result = products.value.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );

      if (categorySelectedValue.toLowerCase() !== "all") {
        result = result.filter((product) =>
          product.category
            .toLowerCase()
            .includes(categorySelectedValue.toLowerCase())
        );
      }

      if (sortingSelectedValue === "Price: Low to High") {
        result.sort((a, b) => a.price - b.price);
      } else if (sortingSelectedValue === "Price: High to Low") {
        result.sort((a, b) => b.price - a.price);
      } else if (sortingSelectedValue === "Z - A") {
        result.sort((a, b) =>
          b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        );
      } else if (sortingSelectedValue === "A - Z") {
        result.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      }

      return result;
    });

    const totalPages = computed(() =>
      Math.ceil(filteredProducts.value.length / pageSize.value)
    );

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return filteredProducts.value.slice(start, end);
    });

    const handlePageChange = (page) => {
      currentPage.value = page;
    };

    return {
      paginatedProducts,
      currentPage,
      totalPages,
      pageSize,
      filteredProducts,
      handlePageChange,
    };
  },
};
</script>
