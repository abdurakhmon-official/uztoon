<template>
  <common-breadcrumb title="Create New Serie" :description="webtoon.title" />

  <section class="anime-details spad">
    <div class="container">
      <div class="anime__details__content">
        <div class="row">
          <div class="col-lg-12">
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
                  <webtoon-serie-create-details
                    ref="serieDetails"
                    :serie="serie"
                  />
                </template>
                <template #2>
                  <webtoon-serie-create-settings
                    ref="serieSettings"
                    :serie="serie"
                  />
                </template>
                <template #3>
                  <webtoon-serie-create-images
                    ref="serieImages"
                    :serie="serie"
                  />
                </template>
                <template #4>
                  <webtoon-serie-create-preview
                    ref="seriePreview"
                    :serie="serie"
                  />
                </template>
              </Vue3MultiStepper>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { WebtoonService } from "~/services/webtoon.service";
import { SerieService } from "~/services/serie.service";
import { useAuthStore } from "@/store/auth";
import { Vue3MultiStepper } from "vue3-multi-stepper";

export default defineComponent({
  async setup() {
    definePageMeta({ middleware: "auth" });

    const route = useRoute();
    const { id } = route.params;
    const webtoonId = `${id}`;

    const { loggedIn, user } = useAuthStore();

    const webtoon = await WebtoonService.get(webtoonId);

    const isCreator = loggedIn && user?.id === webtoon.creator.id;

    if (!isCreator) {
      throw showError({
        statusCode: 400,
        message: "Webtoon can be edited by only creator.",
      });
    }

    return { webtoon };
  },
  components: {
    Vue3MultiStepper,
  },
  data() {
    return {
      serie: {
        title: null,
        description: null,
        serie: this.webtoon.availableSeries + 1,

        images: [{ order: 1, image: null, new: true }],

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
      const { success } = await SerieService.create(
        this.webtoon.id,
        this.serie
      );
      if (success) {
        this.$router.push(`/webtoon/${this.webtoon.id}`);
      }
      this.loading = false;
    },
    validateStep(step) {
      // Perform validation based on the current step
      // Return true if the step is valid, otherwise return false
      if (step === 1) {
        return this.$refs.serieDetails.isStepOK();
      } else if (step === 2) {
        return this.$refs.serieSettings.isStepOK();
      } else if (step === 3) {
        return this.$refs.serieImages.isStepOK();
      }
      return true; // Default to true if no validation is implemented
    },
  },
});
</script>

<style scoped>
.new-serie {
  background: #e53637 !important;
}
</style>
