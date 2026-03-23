<template>
  <div class="row">
    <div class="col-3 text-right">
      <label>Tags</label>
    </div>
    <div class="col-9">
      <multiselect
        ref="tagmultiselect"
        v-model="serie.tags"
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
    serie: {
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
    webtoon: {},
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
