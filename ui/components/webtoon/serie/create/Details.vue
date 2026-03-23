<template>
  <div class="row">
    <div class="col-3 text-right">
      <label>Title</label>
    </div>
    <div class="col-9">
      <input
        type="text"
        class="form-control"
        :class="{
          'is-valid': v$.serie.title.$dirty && !v$.serie.title.$error,
          'is-invalid': v$.serie.title.$dirty && v$.serie.title.$invalid,
        }"
        v-model="serie.title"
      />
    </div>
  </div>
  <div class="row">
    <div class="col-3 text-right">
      <label>Description</label>
    </div>
    <div class="col-9">
      <textarea
        type="text"
        class="form-control"
        v-model="serie.description"
        :class="{
          'is-valid':
            v$.serie.description.$dirty && !v$.serie.description.$error,
          'is-invalid':
            v$.serie.description.$dirty && v$.serie.description.$invalid,
        }"
      ></textarea>
    </div>
  </div>
  <div class="row">
    <div class="col-3 text-right">
      <label>Serie Number</label>
    </div>
    <div class="col-9">
      <input
        type="number"
        class="form-control"
        v-model="serie.serie"
        :class="{
          'is-valid': v$.serie.serie.$dirty && !v$.serie.serie.$error,
          'is-invalid': v$.serie.serie.$dirty && v$.serie.serie.$invalid,
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

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
    isStepOK() {
      this.v$.$touch();
      return !this.v$.$invalid;
    },
  },
  validations: {
    serie: {
      title: { required },
      description: { required },
      serie: { required, minValue: minValue(1) },
    },
  },
});
</script>

<style scoped>
.row:not(:first-child) {
  margin-top: 10px;
}
</style>
