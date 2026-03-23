<template>
  <CommonPreLoader />
  <CommonHeader />

  <slot />

  <CommonFooter />
  <CommonSearchModel />
</template>

<script lang="ts">
export default {
  mounted() {
    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");
  },
};
</script>
