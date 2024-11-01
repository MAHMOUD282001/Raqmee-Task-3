<!-- Pagination.vue -->
<template>
  <div class="pagination mt-10 flex items-center justify-center gap-5 relative">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="absolute left-0 top-[50px] md:top-1/2 md:translate-y-[-50%] text-sm previous"
    >
      Previous
    </button>

    <!-- Page Numbers with Ellipsis Logic -->
    <span
      v-for="page in pageNumbers"
      :key="page"
      class="select-none text-sm w-9 h-9 flex items-center justify-center"
    >
      <button
        v-if="page !== '...'"
        @click="changePage(page)"
        :class="{
          'border-2 border-[#d9f99d] w-full h-full active-page':
            page === currentPage,
          'page-number': page !== currentPage,
        }"
      >
        {{ page }}
      </button>
      <span v-else>...</span>
    </span>

    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="absolute right-0 top-[50px] md:top-1/2 md:translate-y-[-50%] text-sm next"
    >
      Next
    </button>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "ProductsPagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ["page-changed"],
  setup(props, { emit }) {
    const pageNumbers = computed(() => {
      const pages = [];
      const maxPagesToShow = 5;

      if (props.totalPages <= maxPagesToShow) {
        for (let i = 1; i <= props.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (props.currentPage > 3) pages.push("...");
        for (
          let i = Math.max(2, props.currentPage - 1);
          i <= Math.min(props.totalPages - 1, props.currentPage + 1);
          i++
        ) {
          pages.push(i);
        }
        if (props.currentPage < props.totalPages - 2) pages.push("...");
        pages.push(props.totalPages);
      }

      return pages;
    });

    const changePage = (page) => {
      if (page !== "...") {
        emit("page-changed", page);
      }
    };

    const nextPage = () => {
      if (props.currentPage < props.totalPages)
        emit("page-changed", props.currentPage + 1);
    };

    const prevPage = () => {
      if (props.currentPage > 1) emit("page-changed", props.currentPage - 1);
    };

    return { pageNumbers, changePage, nextPage, prevPage };
  },
};
</script>

<style>
[disabled] {
  color: #737373;
}

@media (max-width: 768px) {
  .pagination .previous {
    top: 50px;
  }

  .pagination .next {
    top: 50px;
  }
}
</style>
