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
            <span>{{ webtoon.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="anime-details spad">
    <div class="container">
      <div class="anime__details__content">
        <div class="row">
          <div class="col-lg-3">
            <div
              class="anime__details__pic set-bg"
              :style="{
                'background-image':
                  'url(' + makeFullImageURL(webtoon.image) + ')',
              }"
            >
              <div class="comment">
                <i class="fa fa-comments"></i>
                {{ new Intl.NumberFormat().format(webtoon.reviewCount) }}
              </div>
              <div class="view">
                <i class="fa fa-eye"></i>
                {{ new Intl.NumberFormat().format(webtoon.purchaseCount) }}
              </div>
            </div>
          </div>
          <div class="col-lg-9">
            <div class="anime__details__text">
              <div class="anime__details__title">
                <h3>{{ webtoon.title }}</h3>
                <span>{{ webtoon.description }}</span>
              </div>
              <div class="anime__details__rating">
                <webtoon-rating :id="webtoon.id"></webtoon-rating>
              </div>
              <div class="anime__details__widget">
                <div class="row">
                  <div class="col-lg-6 col-md-6">
                    <ul>
                      <li>
                        <span>Category:</span> {{ webtoon.category.name }}
                      </li>
                      <li>
                        <span>Author:</span> {{ webtoon.creator.fullName }}
                      </li>
                      <li>
                        <span>Date created:</span>
                        {{ formatDate(webtoon.createdAt) }}
                      </li>
                      <li>
                        <span>Tags:</span>
                        {{
                          webtoon.tags.map((tag: any) => tag.name).join(", ")
                        }}
                      </li>
                    </ul>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <ul>
                      <li><span>Rating:</span> 8.5 / 161 times</li>
                      <li>
                        <span>Following:</span>
                        {{
                          new Intl.NumberFormat().format(
                            webtoon.followingWebtoons
                          )
                        }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="anime__details__btn">
                <webtoon-follow :id="webtoon.id" />
                <nuxt-link
                  v-if="false"
                  :to="`/webtoon/${webtoonId}/watch`"
                  class="watch-btn"
                >
                  <span>Watch Now</span> <i class="fa fa-angle-right"></i>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="anime__details__episodes">
            <div class="section-title">
              <h5>Series</h5>
            </div>
            <nuxt-link
              v-for="serie in series"
              :key="`webtoon-serie-${serie.id}`"
              :to="`/webtoon/${webtoon.id}/series/${serie.id}`"
            >
              S {{ serie.serie > 9 ? serie.serie : `0${serie.serie}` }}
            </nuxt-link>
            <nuxt-link
              v-if="isCreator"
              :to="`/webtoon/${webtoon.id}/series/create`"
              class="new-serie"
            >
              S +
            </nuxt-link>
          </div>
        </div>

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

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { WebtoonService } from "~/services/webtoon.service";
import { SerieService } from "~/services/serie.service";

const config = useRuntimeConfig();

const route = useRoute();
const { id } = route.params;
const webtoonId = `${id}`;

const { loggedIn, user } = useAuthStore();

const webtoon = await WebtoonService.get(webtoonId);

const isCreator = loggedIn && user?.id === webtoon.creator.id;

const { series } = await SerieService.list(webtoonId);

const title = "Uztoon - " + webtoon.title;
const description = webtoon.description;
const imageURL = makeFullImageURL(webtoon.image);

useSeoMeta({
  ogSiteName: title,
  ogType: "website",
  ogUrl: `${config.public.baseUrl}/webtoon/${webtoon.id}`,
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
</script>

<style scoped>
.new-serie {
  background: #e53637 !important;
}
</style>
