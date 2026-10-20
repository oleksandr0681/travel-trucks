# TravelTrucks

A web application for finding and renting campers. Users can browse the catalog, filter campers by the parameters they need, view details of a specific model, explore the image gallery and reviews, and submit a booking request.

**Live demo:** [Vercel link](https://travel-trucks-gray-nine.vercel.app/)

## Features

- Home page with a banner and a call to action.
- Camper catalog with filtering and a "Load more" button for loading additional cards.
- Camper page: detailed information, image gallery, user reviews.
- Booking form with validation and result notifications.

## Pages

| Route | Description |
| --- | --- |
| `/` | Home page with a banner and a call to action |
| `/catalog` | Camper catalog: list, filters, loading more cards |
| `/catalog/[camperId]` | Camper page: details, gallery, reviews, booking form |

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router) and TypeScript
- [TanStack Query](https://tanstack.com/query): `useInfiniteQuery` for paginated catalog requests, `HydrationBoundary` for passing server-fetched data to the client
- [Axios](https://axios-http.com/) for HTTP requests
- [Swiper](https://swiperjs.com/) for the image gallery
- [Yup](https://github.com/jquense/yup) for form validation
- [React Hot Toast](https://react-hot-toast.com/) for notifications
- CSS Modules for styling

## Route Structure

```
app/
  page.tsx                      # /
  catalog/
    layout.tsx                  # Header + shared catalog layout
    page.tsx                    # /catalog
    [camperId]/page.tsx         # /catalog/[camperId]
  api/
    campers/                    # camper list, details, reviews, bookings, filters
```

Requests to the external API go through Route Handlers in `app/api`, so the backend URL and settings never reach the client code.

## Running Locally

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   npm install
   ```

2. Create a `.env` file in the project root and set the required environment variables (for example, the API URL):

   ```env
   # example, use your own values
   NEXT_PUBLIC_API_URL=https://example.com/api
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start in development mode |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |
| `npm run lint` | Run the linter |

## Deployment

The project is deployed on [Vercel](https://vercel.com/). When deploying, add the same environment variables as in your local `.env`.


<img width="1533" height="775" alt="Screenshot 2026-10-20 154510" src="https://github.com/user-attachments/assets/5d620b5a-935c-4d5d-bdec-7d7456e97560" />


<img width="1535" height="776" alt="Screenshot 2026-10-20 154617" src="https://github.com/user-attachments/assets/ecc556e3-9a54-45e3-8471-99ae850898e7" />


<img width="1535" height="777" alt="Screenshot 2026-10-20 154832" src="https://github.com/user-attachments/assets/fa8fc6b5-2b59-478e-82aa-e2bb609b4070" />


<img width="1533" height="773" alt="Screenshot 2026-10-20 154906" src="https://github.com/user-attachments/assets/eeee30e9-2023-456c-a8fd-43a5d4ad15f2" />

