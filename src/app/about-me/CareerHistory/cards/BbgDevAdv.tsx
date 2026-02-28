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
      computing resources for robust analytical workloads.
    </p>
    <p>
      BQuant clients are sophisticated quantitative financial researchers. My
      job was to help them make the most of the platform by providing thorough
      documentation, clear code examples, and intriguing demo projects to
      showcase the product&apos;s most powerful features.
    </p>
    <p>
      As a Developer Advocate, I was a communication bridge between engineers
      and users. Clients enjoyed a deeper understanding of BQuant&apos;s tools
      and how they were designed to be used. Engineers appreciated the feedback
      from external users and acted upon those suggestions to improve the
      product.
    </p>
  </CareerCard>
);
