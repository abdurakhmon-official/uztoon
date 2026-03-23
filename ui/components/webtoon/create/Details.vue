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
          'is-valid': v$.webtoon.title.$dirty && !v$.webtoon.title.$error,
          'is-invalid': v$.webtoon.title.$dirty && v$.webtoon.title.$invalid,
        }"
        v-model="webtoon.title"
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
        v-model="webtoon.description"
        :class="{
          'is-valid':
            v$.webtoon.description.$dirty && !v$.webtoon.description.$error,
          'is-invalid':
            v$.webtoon.description.$dirty && v$.webtoon.description.$invalid,
        }"
      ></textarea>
    </div>
  </div>
  <div class="row">
    <div class="col-3 text-right">
      <label>Total Series</label>
    </div>
    <div class="col-9">
      <input
        type="number"
        class="form-control"
        v-model="webtoon.totalSeries"
        :class="{
          'is-valid': v$.webtoon.totalSeries.$dirty && !v$.webtoon.totalSeries.$error,
          'is-invalid': v$.webtoon.totalSeries.$dirty && v$.webtoon.totalSeries.$invalid,
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
      title: { required },
      description: { required },
      totalSeries: { required, minValue: minValue(1) },
    },
  },
});
</script>

<style scoped>
.row:not(:first-child) {
  margin-top: 10px;
}
</style>
