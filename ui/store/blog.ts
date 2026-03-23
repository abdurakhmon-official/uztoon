import { defineStore } from "pinia";
import type { BlogStoreShape } from "~/types";

export const useBlogStore = defineStore("blog", {
  state: (): BlogStoreShape => ({
    blogs: [
      {
        id: "2c570044-e1fe-4d50-8390-906319346699",
        author: { id: "user1", fullName: "Sherlock Holmes" },
        title: "Yuri Kuma Arashi Viverra Tortor Pharetra",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        body: "",
        image: "/assets/images/blog/blog-1.jpg",
        createdAt: new Date(),
        tags: [
          { id: "81c976c7-d8d9-4b2d-8bd9-5a531f4f69ec", name: "Healthfood" },
          { id: "6d5c28e2-6bc3-4ff8-b5e3-8691ca6b0922", name: "Sport" },
          { id: "c90035b1-bc4c-493d-a75d-f65aa2719b0a", name: "SporGamet" },
        ],
      },
      {
        id: "e3e572ae-7e44-4c6b-80b5-ede7fe9cc1dc",
        author: { id: "user1", fullName: "Sherlock Holmes" },
        title: "Bok no Hero Academia Season 4 – 18",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        body: "",
        image: "/assets/images/blog/blog-2.jpg",
        createdAt: new Date(),
        tags: [
          { id: "81c976c7-d8d9-4b2d-8bd9-5a531f4f69ec", name: "Healthfood" },
          { id: "6d5c28e2-6bc3-4ff8-b5e3-8691ca6b0922", name: "Sport" },
          { id: "c90035b1-bc4c-493d-a75d-f65aa2719b0a", name: "SporGamet" },
        ],
      },
      {
        id: "2f25650e-2ab0-4ffb-b8c7-640d7c63baf9",
        author: { id: "user1", fullName: "Sherlock Holmes" },
        title: "Fate/Stay Night: Untimated Blade World",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        body: "",
        image: "/assets/images/blog/blog-3.jpg",
        createdAt: new Date(),
        tags: [
          { id: "81c976c7-d8d9-4b2d-8bd9-5a531f4f69ec", name: "Healthfood" },
          { id: "6d5c28e2-6bc3-4ff8-b5e3-8691ca6b0922", name: "Sport" },
          { id: "c90035b1-bc4c-493d-a75d-f65aa2719b0a", name: "SporGamet" },
        ],
      },
      {
        id: "95d8f911-fe64-4f96-beb7-27abcdba6c82",
        author: { id: "user1", fullName: "Sherlock Holmes" },
        title: "Housekishou Richard shi no Nazo Kantei Season 08 - 20",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        body: "",
        image: "/assets/images/blog/blog-4.jpg",
        createdAt: new Date(),
        tags: [
          { id: "81c976c7-d8d9-4b2d-8bd9-5a531f4f69ec", name: "Healthfood" },
          { id: "6d5c28e2-6bc3-4ff8-b5e3-8691ca6b0922", name: "Sport" },
          { id: "c90035b1-bc4c-493d-a75d-f65aa2719b0a", name: "SporGamet" },
        ],
      },
      {
        id: "7754d45f-0b9a-46e5-9bf8-c0bc53b96057",
        author: { id: "user1", fullName: "Sherlock Holmes" },
        title: "Fate/Stay Night: Untimated Blade World",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        body: "",
        image: "/assets/images/blog/blog-5.jpg",
        createdAt: new Date(),
        tags: [
          { id: "81c976c7-d8d9-4b2d-8bd9-5a531f4f69ec", name: "Healthfood" },
          { id: "6d5c28e2-6bc3-4ff8-b5e3-8691ca6b0922", name: "Sport" },
          { id: "c90035b1-bc4c-493d-a75d-f65aa2719b0a", name: "SporGamet" },
        ],
      },
      {
        id: "da0d9069-085f-4aa0-aed0-b030f71c61fb",
        author: { id: "user1", fullName: "Sherlock Holmes" },
        title: "Building a Better LiA Drilling Down",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        body: "",
        image: "/assets/images/blog/blog-6.jpg",
        createdAt: new Date(),
        tags: [
          { id: "81c976c7-d8d9-4b2d-8bd9-5a531f4f69ec", name: "Healthfood" },
          { id: "6d5c28e2-6bc3-4ff8-b5e3-8691ca6b0922", name: "Sport" },
          { id: "c90035b1-bc4c-493d-a75d-f65aa2719b0a", name: "SporGamet" },
        ],
      },
      {
        id: "cba92493-1ad6-4f40-a6ab-9cd27985b2b9",
        author: { id: "user1", fullName: "Sherlock Holmes" },
        title: "Fate/Stay Night: Untimated Blade World",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        body: "",
        image: "/assets/images/blog/blog-7.jpg",
        createdAt: new Date(),
        tags: [
          { id: "81c976c7-d8d9-4b2d-8bd9-5a531f4f69ec", name: "Healthfood" },
          { id: "6d5c28e2-6bc3-4ff8-b5e3-8691ca6b0922", name: "Sport" },
          { id: "c90035b1-bc4c-493d-a75d-f65aa2719b0a", name: "SporGamet" },
        ],
      },
      {
        id: "627a4328-40f0-4aef-b764-5c79829062b4",
        author: { id: "user1", fullName: "Sherlock Holmes" },
        title: "Building a Better LiA Drilling Down",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        body: "",
        image: "/assets/images/blog/blog-8.jpg",
        createdAt: new Date(),
        tags: [
          { id: "81c976c7-d8d9-4b2d-8bd9-5a531f4f69ec", name: "Healthfood" },
          { id: "6d5c28e2-6bc3-4ff8-b5e3-8691ca6b0922", name: "Sport" },
          { id: "c90035b1-bc4c-493d-a75d-f65aa2719b0a", name: "SporGamet" },
        ],
      },
      {
        id: "91e84ce3-c01c-4c8e-9772-9c141d959767",
        author: { id: "user1", fullName: "Sherlock Holmes" },
        title: "Yuri Kuma Arashi Viverra Tortor Pharetra",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        body: "",
        image: "/assets/images/blog/blog-9.jpg",
        createdAt: new Date(),
        tags: [
          { id: "81c976c7-d8d9-4b2d-8bd9-5a531f4f69ec", name: "Healthfood" },
          { id: "6d5c28e2-6bc3-4ff8-b5e3-8691ca6b0922", name: "Sport" },
          { id: "c90035b1-bc4c-493d-a75d-f65aa2719b0a", name: "SporGamet" },
        ],
      },
      {
        id: "36b14598-b25e-4d4c-8019-f87ddb969224",
        author: { id: "user1", fullName: "Sherlock Holmes" },
        title: "Bok no Hero Academia Season 4 – 18",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        body: "",
        image: "/assets/images/blog/blog-10.jpg",
        createdAt: new Date(),
        tags: [
          { id: "81c976c7-d8d9-4b2d-8bd9-5a531f4f69ec", name: "Healthfood" },
          { id: "6d5c28e2-6bc3-4ff8-b5e3-8691ca6b0922", name: "Sport" },
          { id: "c90035b1-bc4c-493d-a75d-f65aa2719b0a", name: "SporGamet" },
        ],
      },
      {
        id: "8703ced7-31eb-4230-8d53-d9f4e846a663",
        author: { id: "user1", fullName: "Sherlock Holmes" },
        title: "Fate/Stay Night: Untimated Blade World",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        body: "",
        image: "/assets/images/blog/blog-11.jpg",
        createdAt: new Date(),
        tags: [
          { id: "81c976c7-d8d9-4b2d-8bd9-5a531f4f69ec", name: "Healthfood" },
          { id: "6d5c28e2-6bc3-4ff8-b5e3-8691ca6b0922", name: "Sport" },
          { id: "c90035b1-bc4c-493d-a75d-f65aa2719b0a", name: "SporGamet" },
        ],
      },
      {
        id: "d6d45e5a-878a-4e88-b4d9-0bfaf243fbe8",
        author: { id: "user1", fullName: "Sherlock Holmes" },
        title: "Yuri Kuma Arashi Viverra Tortor Pharetra",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        body: "",
        image: "/assets/images/blog/blog-12.jpg",
        createdAt: new Date(),
        tags: [
          { id: "81c976c7-d8d9-4b2d-8bd9-5a531f4f69ec", name: "Healthfood" },
          { id: "6d5c28e2-6bc3-4ff8-b5e3-8691ca6b0922", name: "Sport" },
          { id: "c90035b1-bc4c-493d-a75d-f65aa2719b0a", name: "SporGamet" },
        ],
      },
    ],
  }),
  getters: {
    getById: (state) => (blogId: string) =>
      state.blogs.find((blog) => blog.id == blogId),
  },
  actions: {},
});
