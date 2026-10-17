import {
  Camper,
  CampersResponse,
  RequestCamperParameters,
} from "@/types/camper";
import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

const baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = baseURL;

interface FetchCamperParameters {
  page?: number;
  perPage?: number;
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
}

export async function fetchCampers({
  page = 1,
  perPage = 4,
  location,
  form,
  transmission,
  engine,
}: FetchCamperParameters) {
  const parameters: RequestCamperParameters = {
    params: {
      page: page,
      perPage: perPage,
    },
  };

  if (location !== undefined) {
    parameters.params.location = location;
  }
  if (form !== undefined) {
    parameters.params.form = form;
  }
  if (transmission !== undefined) {
    parameters.params.transmission = transmission;
  }
  if (engine !== undefined) {
    parameters.params.engine = engine;
  }

  const response = await axios.get<CampersResponse>("/campers", parameters);

  return response.data;
}

export const fetchCamperById = async (id: string): Promise<Camper> => {
  const response = await axios.get<Camper>(`/campers/${id}`);

  return response.data;
};
