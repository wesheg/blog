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
      is Bloomberg&apos;s financial data science platform. It provides
      programmatic access to data in a notebook environment, with cloud
      computing resources for complex analytical workloads.
    </p>
    <p>
      I was a <strong>full-stack engineer</strong> and{" "}
      <strong>lead frontend engineer</strong> for the BQuant Help Center, a
      web-based content portal featuring example projects and API references for
      an audience of financial professionals.
    </p>
    <p>
      I also built an automated content-delivery pipeline, which allowed our
      Technical Writers to quickly publish new documents and easily incorporate
      them into the site&apos;s information architecture, reducing dependency on
      engineers.
    </p>
  </CareerCard>
);
