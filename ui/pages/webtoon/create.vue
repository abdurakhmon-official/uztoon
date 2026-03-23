<template>
  <common-breadcrumb
    title="Create Webtoon"
    description="Create your new Webtoon here"
  />

  <div class="container mb-5">
    <client-only>
      <Vue3MultiStepper
        v-model:step="step"
        :tabs="tabs"
        primaryColor1="#79031D"
        primaryColor2="#F2E6E8"
        backText="Go Back"
        nextText="Next"
        doneText="Save"
        :loading="loading"
        :finalize="save"
        :validateStep="validateStep"
      >
        <template #1>
          <webtoon-create-details ref="webtoonDetails" :webtoon="webtoon" />
        </template>
        <template #2>
          <webtoon-create-settings ref="webtoonSettings" :webtoon="webtoon" />
        </template>
        <template #3>
          <webtoon-create-images ref="webtoonImages" :webtoon="webtoon" />
        </template>
        <template #4>
          <webtoon-create-preview ref="webtoonPreview" :webtoon="webtoon" />
        </template>
      </Vue3MultiStepper>
    </client-only>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Vue3MultiStepper } from "vue3-multi-stepper";
import { WebtoonService } from "~/services/webtoon.service";

export default defineComponent({
  setup() {
    definePageMeta({ middleware: "auth" });
  },
  components: {
    Vue3MultiStepper,
  },
  data() {
    return {
      webtoon: {
        title: null,
        description: null,
        image: null,
        totalSeries: 1,

        category: null,
        tags: [],
      },

      step: 1,
      loading: false,
      tabs: [
        {
          title: "Details",
          iconSuccess: null,
          isValid: true,
        },
        {
          title: "Settings",
          iconSuccess: null,
          isValid: true,
        },
        {
          title: "Images",
          iconSuccess: null,
          isValid: true,
        },
        {
          title: "Preview",
          iconSuccess: null,
          isValid: true,
        },
      ],
    };
  },
  methods: {
    async save() {
      this.loading = true;
      const { success } = await WebtoonService.create(this.webtoon);
      if (success) {
        this.$router.push("/user/my/webtoons");
      }
      this.loading = false;
    },
    validateStep(step) {
      // Perform validation based on the current step
      // Return true if the step is valid, otherwise return false
      if (step === 1) {
        return this.$refs.webtoonDetails.isStepOK();
      } else if (step === 2) {
        return this.$refs.webtoonSettings.isStepOK();
      } else if (step === 3) {
        return this.$refs.webtoonImages.isStepOK();
      }
      return true; // Default to true if no validation is implemented
    },
  },
});
</script>
