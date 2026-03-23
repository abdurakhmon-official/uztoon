export const generatePreview = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      return resolve(reader.result);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const makeFullImageURL = (key: string) => {
  if (!key) return '';
  
  if (key.startsWith('http://') || key.startsWith('https://')) {
    return key;
  }
  
  const config = useRuntimeConfig();
  return `${config.public.baseApiUrl}${config.public.apiBase}/s3/file/${key}`;
};

export const formatDate = (date: Date) => {
  const formattedDate = new Date(date);
  const dateString = formattedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return dateString;
};

export const timeToString = (date: Date) => {
  // get total seconds between the times
  let delta = Math.abs(new Date().getTime() - new Date(date).getTime()) / 1000;

  // calculate (and subtract) whole days
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  }

  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  // what's left is seconds
  const seconds = Math.floor(delta % 60); // in theory the modulus is not required
  return `${seconds} second${seconds > 1 ? "s" : ""}`;
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const MAIN_CARDS = [
  {
    type: "trending",
    title: "Trending Now",
  },
  {
    type: "popular",
    title: "Popular Now",
  },
  {
    type: "recent",
    title: "Recently Added",
  },
];
