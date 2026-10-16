import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";
import { RequestCamperParameters } from "@/types/camper";

export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get("perPage") ?? 4);
    const location = request.nextUrl.searchParams.get("location") ?? "";
    const form = request.nextUrl.searchParams.get("form") ?? "";
    const transmission = request.nextUrl.searchParams.get("transmission") ?? "";
    const engine = request.nextUrl.searchParams.get("engine") ?? "";

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

    const res = await api.get("/campers", parameters);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
