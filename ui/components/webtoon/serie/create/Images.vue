<template>
  <div
    class="row"
    v-for="(img, index) in serie.images"
    :key="`serie-image-${index}`"
  >
    <div class="col-3 text-right">
      <label>Image {{ img.order }}</label>
    </div>
    <div class="col-9">
      <base-dropzone
        :allowed-types="['.gif', '.jpg', '.jpeg', '.png', '.svg']"
        @on-removed="img.image = null"
        @on-selected="(file: any) => img.image = file"
        :is-valid="
          v$.serie.images.$dirty &&
          !v$.serie.images.$each.$response.$data[index].image.$error
        "
        :is-in-valid="
          v$.serie.images.$dirty &&
          v$.serie.images.$each.$response.$data[index].image.$invalid
        "
      />
    </div>
    <div class="col-12">
      <hr />
    </div>
  </div>
  <div class="row">
    <div class="col-12 text-right">
      <button type="button" class="site-btn mr-2" @click="addImage">
        <span class="icon_plus"></span> New Image
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, helpers } from "@vuelidate/validators";

export default defineComponent({
  setup(): any {
    return {
      v$: useVuelidate(),
    };
  },
  props: {
    serie: {
      type: Object,
    },
  },
  methods: {
    addImage() {
      this.serie.images.push({
        order: this.serie.images.length + 1,
        image: null,
        new: true,
      });
    },
    isStepOK() {
      this.v$.$touch();
      return !this.v$.$invalid;
    },
  },
  validations: {
    serie: {
      images: {
        $each: helpers.forEach({
          order: {
            required,
            minValue: minValue(1),
          },
          image: {
            required,
          },
        }),
      },
    },
  },
});
</script>

<style scoped>
.row:not(:first-child) {
  margin-top: 10px;
}
</style>
