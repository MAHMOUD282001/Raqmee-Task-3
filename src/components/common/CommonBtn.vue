<template lang="">
  <button
    :type="type === 'submit' ? 'submit' : 'button'"
    :class="`px-[23px] py-[11px] font-[400] rounded-[4px] text-center`"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "CommonBtn",
  props: {
    type: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
