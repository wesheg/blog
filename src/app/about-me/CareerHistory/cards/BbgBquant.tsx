import Link from "next/link";
import { CareerCard } from "../CareerCard/CareerCard";

export const BbgBquant = () => (
  <CareerCard
    imgSrc="/companies/Bloomberg.png"
    imgAlt="Bloomberg LP Logo"
    jobTitle="Software Engineer - BQuant Help Center"
    companyName="Bloomberg L.P."
    location="San Francisco, California, USA"
    startDate="Jan 2023"
    endDate="Feb 2024"
  >
    <p>
      <Link
        href="https://www.bloomberg.com/professional/products/bloomberg-terminal/research/bquant"
        target="_blank"
      >
        BQuant
      </Link>{" "}
      is Bloomberg&apos;s financial data science platform, providing
      programmatic access to data within a cloud-based notebook environment.
    </p>
    <p>
      I was a full-stack engineer and lead frontend engineer for the BQuant Help
      Center, a web-based content portal featuring example projects and API
      references for financial professionals.
    </p>
    <p>
      I also built an automated content-delivery pipeline that enabled Technical
      Writers to publish documentation independently and integrate it into the
      site&apos;s information architecture, reducing engineering dependency.
    </p>
  </CareerCard>
);
