export const UserColumnsForUI = {
  id: true,
  username: true,
  firstName: true,
  lastName: true,
  fullName: true,
  email: true,
  phone: true,
  region: true,
  country: true,
  role: true,
  profileImage: true,
  active: true,
  deleted: true,
  isAdmin: true,
  isSuperAdmin: true,
};

export const WebtoonColumnsForUI = {
  id: true,
  title: true,
  description: true,
  image: true,
  totalSeries: true,
  availableSeries: true,
  createdAt: true,
  category: {
    select: { id: true, name: true },
  },
  tags: {
    select: {
      tag: {
        select: { id: true, name: true },
      },
    },
  },
  creator: {
    select: { id: true, firstName: true, lastName: true, fullName: true },
  },
  _count: {
    select: { webtoonReviews: true, votes: true, followingWebtoons: true },
  },
};

export const SerieColumnsForUI: any = {
  id: true,
  title: true,
  description: true,
  serie: true,
  createdAt: true,
  tags: {
    select: {
      tag: {
        select: { id: true, name: true },
      },
    },
  },
  creator: {
    select: { id: true, firstName: true, lastName: true, fullName: true },
  },
  images: {
    select: { id: true, image: true, filename: true, order: true },
    orderBy: {
      order: 'asc',
    },
  },
};
