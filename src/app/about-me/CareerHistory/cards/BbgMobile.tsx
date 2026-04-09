import Link from "next/link";
import { CareerCard } from "../CareerCard/CareerCard";

export const BbgMobile = () => {
  return (
    <CareerCard
      imgSrc="/companies/Bloomberg.png"
      imgAlt="Bloomberg LP Logo"
      jobTitle="Senior Software Engineer - Mobile"
      companyName="Bloomberg L.P."
      location="London, UK"
      startDate="Jan 2026"
      endDate="Present"
    >
      <p>
        The Mobile Engineering Department at Bloomberg develops and maintains
        the Bloomberg Professional App for both{" "}
        <Link
          href="https://apps.apple.com/us/app/bloomberg-professional/id407761767"
          target="_blank"
        >
          iOS
        </Link>
        and{" "}
        <Link
          href="https://play.google.com/store/apps/details?id=com.bloomberg.android.anywhere&pcampaignid=web_share"
          target="_blank"
        >
          Android
        </Link>
        .
      </p>
      <p>
        I build and maintain features for a cross-platform mobile app in Swift
        and Kotlin. My team owns the &quot;Home&quot; and &quot;Securities&quot;
        pages, which are among the app&apos;s most heavily-used features. Our
        backend is a suite of microservices, most written in TypeScript and
        running on Node.js.
      </p>
    </CareerCard>
  );
};
