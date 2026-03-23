<template>
  <div class="row">
    <div class="col-3 text-right">
      <label>Preview Image</label>
    </div>
    <div class="col-9">
      <base-dropzone
        :allowed-types="['.gif', '.jpg', '.jpeg', '.png', '.svg']"
        @on-removed="webtoon.image = null"
        @on-selected="(file: any) => webtoon.image = file"
        :is-valid="v$.webtoon.image.$dirty && !v$.webtoon.image.$error"
        :is-in-valid="v$.webtoon.image.$dirty && v$.webtoon.image.$invalid"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default defineComponent({
  setup(): any {
    return {
      v$: useVuelidate(),
    };
  },
  props: {
    webtoon: {
      type: Object,
    },
  },
  methods: {
    isStepOK() {
      this.v$.$touch();
      return !this.v$.$invalid;
    },
  },
  validations: {
    webtoon: {
      image: { required },
    },
  },
});
</script>

<style scoped>
.row:not(:first-child) {
  margin-top: 10px;
}
</style>
