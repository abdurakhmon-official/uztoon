import { defineStore } from "pinia";
import { WebtoonFollowingService } from "~/services/webtoon-following.service";
import { WebtoonService } from "~/services/webtoon.service";
import type { WebtoonStoreShape } from "~/types";
import type { BasicSearch } from "~/types/input/BasicSearch";

export const useWebtoonStore = defineStore("webtoon", {
  state: (): WebtoonStoreShape => ({
    trending: [],
    popular: [],
    recent: [],
    topViews: [],
    newComments: [
      {
        id: "f113d8b4-3fd2-40a7-a690-df77c3359b00",
        title: "The Seven Deadly Sins: Wrath of the Gods",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        image: "/assets/images/sidebar/comment-1.jpg",
        views: 19141,
        comments: 11,
        series: 18,
        avaliableSeries: 18,
        category: {
          id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8",
          name: "Series",
        },
        author: { id: "user1", fullName: "Sherlock Holmes" },
        tags: [
          { id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8", name: "Active" },
          { id: "d601c412-3c15-4a61-8986-9f86ba12a324", name: "Movie" },
        ],
      },
      {
        id: "a9a7db26-7845-4875-bad3-2eb50a0efe8d",
        title: "Shirogane Tamashii hen Kouhan sen",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        image: "/assets/images/sidebar/comment-2.jpg",
        views: 19141,
        comments: 11,
        series: 18,
        avaliableSeries: 18,
        category: {
          id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8",
          name: "Series",
        },
        author: { id: "user1", fullName: "Sherlock Holmes" },
        tags: [
          { id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8", name: "Active" },
          { id: "d601c412-3c15-4a61-8986-9f86ba12a324", name: "Movie" },
        ],
      },
      {
        id: "ad5d82e7-8ba9-455e-a11a-60900b9f0e6c",
        title: "Kizumonogatari III: Reiket su-hen",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        image: "/assets/images/sidebar/comment-3.jpg",
        views: 19141,
        comments: 11,
        series: 18,
        avaliableSeries: 18,
        category: {
          id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8",
          name: "Series",
        },
        author: { id: "user1", fullName: "Sherlock Holmes" },
        tags: [
          { id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8", name: "Active" },
          { id: "d601c412-3c15-4a61-8986-9f86ba12a324", name: "Movie" },
        ],
      },
      {
        id: "f25b41c5-2d4b-4467-b8d0-79f6d71f06a7",
        title: "Monogatari Series: Second Season",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        image: "/assets/images/sidebar/comment-4.jpg",
        views: 19141,
        comments: 11,
        series: 18,
        avaliableSeries: 18,
        category: {
          id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8",
          name: "Series",
        },
        author: { id: "user1", fullName: "Sherlock Holmes" },
        tags: [
          { id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8", name: "Active" },
          { id: "d601c412-3c15-4a61-8986-9f86ba12a324", name: "Movie" },
        ],
      },
    ],
    hero: [
      {
        id: "fb567002-623a-4900-86b2-985ff63c9b3f",
        title: "Fate / Stay Night: Unlimited Blade Works",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        image: "/assets/images/hero/hero-1.jpg",
        views: 19141,
        comments: 11,
        series: 18,
        avaliableSeries: 18,
        category: {
          id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8",
          name: "Series",
        },
        author: { id: "user1", fullName: "Sherlock Holmes" },
        tags: [
          { id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8", name: "Active" },
          { id: "d601c412-3c15-4a61-8986-9f86ba12a324", name: "Movie" },
        ],
      },
      {
        id: "92b4072b-fd7f-4bb8-8f94-0235ab2c480c",
        title: "Fate / Stay Night: Unlimited Blade Works",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        image: "/assets/images/hero/hero-1.jpg",
        views: 19141,
        comments: 11,
        series: 18,
        avaliableSeries: 18,
        category: {
          id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8",
          name: "Series",
        },
        author: { id: "user1", fullName: "Sherlock Holmes" },
        tags: [
          { id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8", name: "Active" },
          { id: "d601c412-3c15-4a61-8986-9f86ba12a324", name: "Movie" },
        ],
      },
      {
        id: "8dcf696b-f948-49bc-9b66-52186b9942e0",
        title: "Kizumonogatari III: Reiket su-hen",
        description:
          "Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss, never to be seen again. But her mother’s last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!",
        image: "/assets/images/hero/hero-1.jpg",
        views: 19141,
        comments: 11,
        series: 18,
        avaliableSeries: 18,
        category: {
          id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8",
          name: "Series",
        },
        author: { id: "user1", fullName: "Sherlock Holmes" },
        tags: [
          { id: "f1cbae85-577e-44ee-82c5-4b9e09bbe1c8", name: "Active" },
          { id: "d601c412-3c15-4a61-8986-9f86ba12a324", name: "Movie" },
        ],
      },
    ],
    mine: [],
    myFollowings: [],
  }),
  getters: {
    all: (state) => [...state.trending, ...state.popular, ...state.recent],
    getByType: (state: any) => async (type: string) => {
      if (state[type] && state[type]?.length) {
        return state[type];
      } else {
        const items = await WebtoonService.loadByType(type, {} as BasicSearch);
        if (items) {
          const { webtoons } = items;
          state[type] = webtoons;
          return webtoons;
        }
      }
    },
    purchases: (state: any) =>
      state.all.sort(() => 0.5 - Math.random()).slice(0, 10),
  },
  actions: {
    async loadMine(force = false) {
      if (!force && this.mine.length > 0) return;

      const { webtoons } = await WebtoonService.mine();
      this.mine = webtoons;
    },
    async loadMyFollowings(force = false) {
      if (!force && this.myFollowings.length > 0) return;

      const { followings } = await WebtoonFollowingService.list();
      this.myFollowings = followings;
    },
  },
});
