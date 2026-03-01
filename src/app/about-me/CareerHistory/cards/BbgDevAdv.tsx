import Link from "next/link";
import { CareerCard } from "../CareerCard/CareerCard";

export const BbgDevAdv = () => (
  <CareerCard
    imgSrc="/companies/Bloomberg.png"
    imgAlt="Bloomberg LP Logo"
    jobTitle="Developer Advocate - BQuant"
    companyName="Bloomberg L.P."
    location="San Francisco, California, USA"
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
      is Bloomberg&apos;s financial data science platform, providing
      programmatic access to data within a cloud-based notebook environment.
    </p>
    <p>
      BQuant clients are quantitative financial researchers. My role was to
      support the effective use of the platform through documentation, code
      examples, and demonstration projects to showcase core capabilities.
    </p>
    <p>
      As a Developer Advocate, I acted as a communication bridge between
      engineers and users, helping clients better understand BQuant&apos;s tools
      and translating external feedback into product improvements.
    </p>
  </CareerCard>
);
