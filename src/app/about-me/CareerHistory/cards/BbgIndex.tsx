import Link from "next/link";
import { CareerCard } from "../CareerCard/CareerCard";

export const BbgIndex = () => (
  <CareerCard
    imgSrc="/companies/Bloomberg.png"
    imgAlt="Bloomberg LP Logo"
    jobTitle="Senior Software Engineer - Bloomberg Indices"
    companyName="Bloomberg Index Securities Limited (BISL)"
    location="London, UK"
    startDate="Feb 2024"
    endDate="Jan 2026"
  >
    <p>
      <Link
        href="https://www.bloomberg.com/professional/products/indices/"
        target="_blank"
      >
        BISL
      </Link>{" "}
      is a regulated subsidiary of Bloomberg that builds broad-market and
      bespoke financial indices. My team built tools to ensure data quality and
      reduce time-to-market for new index launches.
    </p>
    <p>
      I was the lead engineer and user experience designer for two internal web
      applications used by Compliance and Product.
    </p>
    <ul>
      <li>
        <strong>Index Quality Controller (iQC)</strong> &mdash; Provides
        Compliance with visibility into a complex network of automated quality
        checks on large datasets. iQC empowers users to onboard new datasets,
        resolve quality issues, and control the use of data in downstream index
        calculation processes.
      </li>
      <li>
        <strong>Index Data Catalog</strong> &mdash; A searchable, canonical
        reference for all datasets and fields involved in the construction of
        indices. Product Managers relied on the Catalog for idea generation,
        data discovery, and deeper insight into index construction.
      </li>
    </ul>
  </CareerCard>
);
