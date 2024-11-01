<template lang="">
  <div
    class="w-full h-full bg-[#00000080] fixed top-0 left-0 flex items-center justify-center z-10"
  >
    <div
      class="w-[785px] h-[calc(100vh_-_165px)] bg-white rounded-[4px] p-[20px] sm:p-[50px] overflow-auto mx-5 relative modal"
    >
      <span
        class="absolute top-4 right-4 cursor-pointer"
        @click="$emit('closeModal')"
      >
        <XMarkIcon class="w-[20px] h-[20px] stroke-[3px]" />
      </span>

      <h2 class="text-[30px] font-[500] mb-[30px]">Sell an Item</h2>
      <form @submit.prevent="onSubmit">
        <div>
          <p class="text-[14px] font-[300] mb-1">Upload Photos</p>
          <div
            class="w-full h-[181px] border border-solid border-[#E5E5E5] rounded-[4px] flex items-center justify-center flex-col"
          >
            <input
              type="file"
              id="image"
              ref="imageFile"
              @change="onImageSelected"
              accept="image/jpeg,image/png,image/gif"
              class="hidden"
              v-if="!imagePreview"
            />

            <CommonBtn
              class="border border-solid border-[#D9F99D] w-[140px]"
              :type="'button'"
              @click="$refs.imageFile.click()"
              v-if="!imagePreview"
            >
              Upload File
            </CommonBtn>
            <img
              v-if="imagePreview"
              :src="imagePreview"
              class="w-[200px] h-[140px] object-cover rounded-[4px]"
            />
            <p class="text-[12px] text-[#FF0000] mt-1" v-if="errors.image">
              {{ errors.image }}
            </p>
          </div>
        </div>

        <div class="mt-[20px]">
          <CommonInput
            :title="'Name'"
            :name="'name'"
            v-model="name"
            :type="'text'"
            :error="errors.name"
            :style="'h-[44px] w-full border border-solid border-[#E5E5E5] rounded-[4px] px-[13px] py-[11px] outline-none text-[#737373] text-[14px]'"
          />
        </div>
        <div class="mt-[20px]">
          <p class="text-[14px] font-[300] mb-1">Description</p>
          <textarea
            type="text"
            v-model="description"
            class="w-full h-[148px] border border-solid border-[#E5E5E5] rounded-[4px] px-[13px] py-[11px] outline-none text-[#737373] text-[14px]"
          ></textarea>
          <p class="text-[12px] text-[#FF0000] mt-1" v-if="errors.description">
            {{ errors.description }}
          </p>
        </div>

        <div class="mt-[20px]">
          <p class="text-[14px] font-[300] mb-1">Category</p>

          <CommonDropdown
            :options="categoriesDropdownValues"
            :selectedOption="category"
            @update:selectedOption="selectValue"
          />

          <p class="text-[12px] text-[#FF0000] mt-1" v-if="errors.category">
            {{ errors.category }}
          </p>
        </div>

        <div class="mt-[20px]">
          <CommonInput
            :title="'Item Price'"
            :name="'price'"
            v-model="price"
            :type="'number'"
            :error="errors.price"
            :isPrice="true"
            :style="'w-full border-none placeholder-[#737373] text-right outline-none'"
          />
        </div>

        <CommonBtn :type="'submit'" class="bg-[#D9F99D] mt-[50px] w-full"
          >Upload Item</CommonBtn
        >
      </form>
    </div>
  </div>
</template>
<script>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, useField } from "vee-validate";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { z } from "zod";
import CommonBtn from "../common/CommonBtn.vue";
import CommonInput from "../common/CommonInput.vue";
import CommonDropdown from "../common/CommonDropdown.vue";
export default {
  name: "SellProductModal",
  data() {
    return {
      categoriesDropdownValues: [
        "Electronics",
        "Clothing",
        "Mobile Phones",
        "Home appliances",
      ],
      isCategoriesDropdownOpen: false,
      categorySelectedValue: "",
      form: {
        name: "",
        description: "",
        category: "",
        price: null,
        image: null,
      },
      imageFile: null,
    };
  },

  methods: {
    toggleDropdown(type) {
      if (type === "sorting") {
        this.isCategoriesDropdownOpen = !this.isSortingDropdownOpen;
      } else if (type === "categories") {
        this.isCategoriesDropdownOpen = !this.isCategoriesDropdownOpen;
      }
    },
    selectValue(type, value) {
      if (type === "sorting") {
        this.categorySelectedValue = value;
        this.isSortingDropdownOpen = false;
      } else if (type === "categories") {
        this.categorySelectedValue = value;
        this.category = value;
        this.isCategoriesDropdownOpen = false;
      }
    },
  },
  components: {
    XMarkIcon,
    CommonBtn,
    CommonInput,
    CommonDropdown,
  },

  setup(props, { emit }) {
    const imageFile = ref(null);
    const imagePreview = ref(null);

    const validationSchema = toTypedSchema(
      z.object({
        name: z.string().min(1, "This is required"),
        description: z.string().min(1, "This is required"),
        category: z.string().min(1, "This is required"),
        price: z.number().min(1, "Price must be greater than or equal to 0"),
        image: z
          .instanceof(File)
          .nullable()
          .refine((file) => {
            if (!file) return true;
            return ["image/jpeg", "image/png", "image/gif"].includes(file.type);
          }, "Only JPEG, PNG, and GIF files are allowed"),
      })
    );

    const onImageSelected = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
          errors.image = "Only JPEG, PNG, and GIF files are allowed";
          imageFile.value = null;
          imagePreview.value = null;
          return;
        }

        imageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
        errors.image = "";
      }
    };

    const { handleSubmit, errors } = useForm({
      validationSchema,
      initialValues: {
        name: "",
        description: "",
        category: "",
        price: null,
        image: null,
      },
    });

    const { value: name } = useField("name");
    const { value: description } = useField("description");
    const { value: category } = useField("category");
    const { value: price } = useField("price", (val) => Number(val));
    const { value: image } = useField("image");

    const onSubmit = handleSubmit((values) => {
      if (!imagePreview.value) {
        errors.image = "Please select an image";
        return;
      }
      const formData = {
        ...values,
        image: imagePreview.value,
      };

      try {
        // Retrieve and update products in localStorage
        const storedProducts =
          JSON.parse(localStorage.getItem("allProducts")) || [];
        storedProducts.push({ id: storedProducts.length + 1, ...formData });

        // Try to store updated products in localStorage
        localStorage.setItem("allProducts", JSON.stringify(storedProducts));

        // If successful, close modal and reset body style
        emit("closeModal");
        document.body.style.overflow = "auto";
        toast.success("Product added successfully");
      } catch (error) {
        // Handle QuotaExceededError (or any other error)
        if (error.name === "QuotaExceededError") {
          toast.error("Unable to add product. Storage limit exceeded.");
        } else {
          // Handle other potential errors
          toast.error("An unexpected error occurred.");
        }
      }
    });

    return {
      name,
      description,
      category,
      price,
      image,
      errors,
      onSubmit,
      onImageSelected,
      imagePreview,
    };
  },
};
</script>
