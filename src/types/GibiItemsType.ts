export type GibiReqType = {
  id: number;
  title: string;
  description: string | null;
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: {
    type: string;
    url: string;
  }[];
  series: {
    name: string;
  };
  format: string;
  issueNumber: number;
  pageCount: number;
  textObjects: {
    type: string;
    language: string;
    text: string;
  }[];
  dates: {
    type: string;
    date: string;
  }[];
  prices: {
    type: string;
    price: number;
  }[];
  creators: {
    available: number;
    items: {
      resourceURI: string;
      name: string;
      role: string;
    }[];
  };
};
