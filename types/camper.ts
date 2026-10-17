export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  gallery: [
    {
      id: string;
      camperId: string;
      thumb: string;
      original: string;
      order: number;
    },
  ];
  coverImage: string;
}

export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface RequestCamperParameters {
  params: {
    page?: number;
    perPage?: number;
    location?: string;
    form?: string;
    transmission?: string;
    engine?: string;
  };
}
