<template>
  <div class="breadcrumb-option">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breadcrumb__links">
            <nuxt-link to="/"><i class="fa fa-home"></i> Home</nuxt-link>
            <nuxt-link :to="`/categories/${webtoon.category.id}`">
              {{ webtoon.category.name }}
            </nuxt-link>
            <nuxt-link :to="`/webtoon/${webtoon.id}`">
              {{ webtoon.title }}
            </nuxt-link>
            <span>Watch</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="anime-details spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="anime__video__player">
            <client-only>
              <video
                id="player"
                playsinline
                controls
                data-poster="/assets/videos/anime-watch.jpg"
              >
                <source src="/assets/videos/1.mp4" type="video/mp4" />
                <!-- Captions are optional -->
                <track
                  kind="captions"
                  label="English captions"
                  src="#"
                  srclang="en"
                  default
                />
              </video>
            </client-only>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8 col-md-8">
          <webtoon-review :id="webtoonId" />
        </div>

        <div class="col-lg-4 col-md-4">
          <webtoon-might-like :id="webtoonId" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { WebtoonService } from "~/services/webtoon.service";

const config = useRuntimeConfig();

const route = useRoute();
const { id } = route.params;

const webtoonId = `${id}`;

const webtoon = await WebtoonService.get(webtoonId);

const title = "Uztoon - " + webtoon.title;
const description = webtoon.description;
const imageURL = makeFullImageURL(webtoon.image);

useSeoMeta({
  ogSiteName: title,
  ogType: "website",
  ogUrl: `${config.public.baseUrl}/webtoon/${webtoon.id}/watch`,
  ogTitle: title,
  ogDescription: description,
  ogImage: imageURL,

  title: title,
  description: description,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: imageURL,
});

async function initPlayer() {
  /*------------------
          Video Player
      --------------------*/
  await nextTick(() => {
    const player = new Plyr("#player", {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "captions",
        "settings",
        "fullscreen",
      ],
      seekTime: 25,
    });
  });
}

onMounted(() => {
  initPlayer();
});
</script>
