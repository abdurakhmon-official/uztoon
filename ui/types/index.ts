export interface UserShape {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profileImage: string;
  email: string;
  username: string;
  phone: string;
  country: string;
  region: string;
}

export interface AuthStoreShape {
  user: UserShape | null;
  token: string | null;
}

export interface MainStoreShape {
  activeMenu: string;
  categories: any[];
  tags: any[];
}

export interface BlogStoreShape {
  blogs: any[];
}

export interface WebtoonStoreShape {
  trending: any[];
  popular: any[];
  recent: any[];
  topViews: any[];
  newComments: any[];
  hero: any[];

  mine: any[];
  myFollowings: any[];
}
