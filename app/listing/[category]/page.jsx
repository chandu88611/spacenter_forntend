// app/listing/[category]/page.js
 
import { Suspense } from "react";
import ListingPage from "./ListingPage";

export function generateStaticParams() {
  return [{ category: "restaurant" }, { category: "beauty-spa" }];
}

export default function Page({ params }) {
  return (
  <Suspense fallback={<div>Loading...</div>}>

    <ListingPage category={params.category} />;
  </Suspense>)
}
