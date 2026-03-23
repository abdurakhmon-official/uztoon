<template>
  <div class="row">
    <div class="col-3 text-right">
      <label>Category</label>
    </div>
    <div class="col-9">
      <multiselect
        v-model="webtoon.category"
        value-prop="id"
        label="name"
        :options="categories"
        :searchable="true"
        :object="true"
        :class="{
          'is-valid':
            v$.webtoon.category.$dirty && !v$.webtoon.category.$error,
          'is-in-valid':
            v$.webtoon.category.$dirty && v$.webtoon.category.$invalid,
        }"
      ></multiselect>
    </div>
  </div>

  <div class="row">
    <div class="col-3 text-right">
      <label>Tags</label>
    </div>
    <div class="col-9">
      <multiselect
        ref="tagmultiselect"
        v-model="webtoon.tags"
        mode="tags"
        value-prop="id"
        label="name"
        track-by="name"
        :close-on-select="false"
        :searchable="true"
        :allow-absent="true"
        :object="true"
        :options="tags"
        :create-option="true"
        :on-create="handleTagCreate"
      ></multiselect>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useStore } from "@/store";
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  setup(): any {
    const store = useStore();
    const { createTag } = store;
    const { categories, tags } = storeToRefs(store);

    return {
      v$: useVuelidate(),
      categories,
      tags,
      createTag,
    };
  },
  components: { Multiselect },
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
    async handleTagCreate(option: any, select$: any) {
      return await this.createTag(option.name);
    },
  },
  validations: {
    webtoon: {
      category: { required },
    },
  },
});
</script>

<style lang="scss">
@import "@vueform/multiselect/themes/default.css";

.row:not(:first-child) {
  margin-top: 10px;
}

.is-in-valid {
  border-color: #dc3545;
}
.is-valid {
  border-color: #28a745;
}
</style>
