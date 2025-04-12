// app/listing/[category]/page.js

import ListingPage from "./ListingPage";

export function generateStaticParams() {
  return [{ category: "restaurant" }, { category: "beauty-spa" }];
}

export default function Page({ params }) {
  return <ListingPage category={params.category} />;
}
