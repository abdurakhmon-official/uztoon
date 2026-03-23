<template>
  <section class="blog-details spad">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-lg-8">
          <div class="blog__details__title">
            <h6>
              {{ blog.author.fullName }}
              <span>- {{ dateFormatter(blog.createdAt) }}</span>
            </h6>
            <h2>{{ blog.title }}</h2>
            <div class="blog__details__social">
              <a href="#" class="facebook">
                <i class="fa fa-facebook-square"></i> Facebook
              </a>
              <a href="#" class="pinterest">
                <i class="fa fa-pinterest"></i> Pinterest
              </a>
              <a href="#" class="linkedin">
                <i class="fa fa-linkedin-square"></i> Linkedin
              </a>
              <a href="#" class="twitter">
                <i class="fa fa-twitter-square"></i> Twitter
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="blog__details__pic">
            <img
              src="/assets/images/blog/details/blog-details-pic.jpg"
              alt=""
            />
          </div>
        </div>
        <div class="col-lg-8">
          <div class="blog__details__content">
            <div class="blog__details__text">
              <p>
                As a result the last couple of eps haven’t been super exciting
                for me, because they’ve been more like settling into a familiar
                and comfortable routine.  We’re seeing character growth here but
                it’s subtle (apart from Shouyou, arguably).  I mean, Tobio being
                an asshole is nothing new – it’s kind of the foundation of his
                entire character arc.  Confronting whether his being an asshole
                is a problem for the Crows this directly is a bit of an
                evolution, and probably an overdue one at that, but the overall
                dynamic with Kageyama is basically unchanged.
              </p>
            </div>
            <div class="blog__details__item__text">
              <h4>Tobio-Nishinoya showdown:</h4>
              <img src="/assets/images/blog/details/bd-item-1.jpg" alt="" />
              <p>
                In Japan the idea of a first-year speaking to a senior the way
                Kageyama did to Asahi is a lot more shocking than it would be in
                the West, but Tobio calling out teammates in genuinely rude
                fashion in the middle of a match is what got him isolated in the
                first place.  It’s better for the Crows to sort this out in
                practice matches than the real deal, but this is really on Tobio
                – he has to figure out how to co-exist with others in a team
                environment.
              </p>
            </div>
            <div class="blog__details__item__text">
              <h4>Nanatsu no Taizai: Kamigami No Gekirin</h4>
              <img src="/assets/images/blog/details/bd-item-2.jpg" alt="" />
              <p>
                In Japan the idea of a first-year speaking to a senior the way
                Kageyama did to Asahi is a lot more shocking than it would be in
                the West, but Tobio calling out teammates in genuinely rude
                fashion in the middle of a match is what got him isolated in the
                first place.  It’s better for the Crows to sort this out in
                practice matches than the real deal, but this is really on Tobio
                – he has to figure out how to co-exist with others in a team
                environment.
              </p>
            </div>
            <div class="blog__details__item__text">
              <h4>ID:Ianvaded:</h4>
              <img src="/assets/images/blog/details/bd-item-3.jpg" alt="" />
              <p>
                In Japan the idea of a first-year speaking to a senior the way
                Kageyama did to Asahi is a lot more shocking than it would be in
                the West, but Tobio calling out teammates in genuinely rude
                fashion in the middle of a match is what got him isolated in the
                first place.  It’s better for the Crows to sort this out in
                practice matches than the real deal, but this is really on Tobio
                – he has to figure out how to co-exist with others in a team
                environment.
              </p>
            </div>

            <div class="blog__details__tags">
              <a
                href="#"
                v-for="(tag, index) in blog.tags"
                :key="`tag-${index}`"
              >
                {{ tag.name }}
              </a>
            </div>

            <div class="blog__details__btns" v-if="false">
              <div class="row">
                <div class="col-lg-6">
                  <div class="blog__details__btns__item">
                    <h5>
                      <a href="#">
                        <span class="arrow_left"></span> Building a Better
                        LiA...
                      </a>
                    </h5>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="blog__details__btns__item next__btn">
                    <h5>
                      <a href="#">
                        Mugen no Juunin: Immortal – 21
                        <span class="arrow_right"></span>
                      </a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <blog-comment :id="blogId" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useBlogStore } from "@/store/blog";

export default defineComponent({
  setup() {
    const config = useRuntimeConfig();

    const route = useRoute();
    const { id } = route.params;

    const { getById } = useBlogStore();

    const blog = getById(id);

    if (!blog) {
      throw showError({
        statusCode: 400,
        message: "Blog Not Found",
      });
    }

    const title = "Uztoon Blogs - " + blog.title;
    const description = blog.description;
    const imageURL = `${config.public.baseUrl}/${blog.image}`;

    useSeoMeta({
      ogSiteName: title,
      ogType: "website",
      ogUrl: `${config.public.baseUrl}/${blog.id}`,
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

    return {
      blogId: id,
      blog,
    };
  },
  methods: {
    dateFormatter(date) {
      const formattedDate = new Date(date).toLocaleDateString(
        {},
        { timeZone: "UTC", month: "long", day: "2-digit", year: "numeric" }
      );
      const sp = formattedDate.replaceAll(",", "").split(" ");
      return `${sp[1]} ${sp[0]}, ${sp[2]}`;
    },
  },
});
</script>
