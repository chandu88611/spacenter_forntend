import Business from "@/components/Business";
import { getBackendUrl } from "@/utils/getBackendUrl";

 
export async function generateMetadata({ params }) {
  const id = params.slug[3];

  const res = await fetch(`${getBackendUrl()}/api/v1/businesses/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "Business Not Found",
      description: "The requested business does not exist.",
    };
  }

  const { data: business } = await res.json();
console.log(business)
  return {
    title: business.businessName,
    description: `${business.businessName} - ${business.businessType} in ${business.city}, ${business.country}. Contact: ${business.phone}`,
    openGraph: {
      title: business.businessName,
      description: business.description || '',
      images: [
        {
          url: `${getBackendUrl()}/api/${business?.galleries?.[0]?.photoUrl || "/images/default.jpg"}`,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}



export default function Page({ params }) {
  return <Business params={params} />;
}