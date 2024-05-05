export interface dashboardProps {
  setCategory: (a: string) => void;
}

export interface navbarType {
  setCategory: (a: string) => void;
}
export interface cardProps {
  category: string;
}
export interface cardDetailsProps {
  items: cardType[];
}

export interface filmsType {
  uid: string;
  properties: {
    title: string;
    director: string;
    release_date: string;
    episode_id: string;
    opening_crawl: string;
  };
}

export interface cardType {
  uid: string;
  name: string;
  url: string;
}

export interface cardDetailsType {
  properties?: { name: string };
}
