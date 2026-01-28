import Link from "next/link";
import { CareerCard } from "../CareerCard/CareerCard";

export const BbgDevAdv = () => (
  <CareerCard
    imgSrc="/companies/Bloomberg.png"
    imgAlt="Bloomberg LP Logo"
    jobTitle="Developer Advocate - BQuant"
    companyName="Bloomberg L.P."
    location="San Francisco, Callifornia, USA"
    startDate="Aug 2020"
    endDate="Jan 2023"
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
  </CareerCard>
);
