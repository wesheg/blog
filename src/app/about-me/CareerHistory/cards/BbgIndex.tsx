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
        <strong>Index Quality Controller (iQC)</strong> &mdash; Provided
        Compliance with visibility into a network of automated quality checks on
        large datasets. Users could onboard new datasets, resolve quality
        issues, and manage data usage in downstream index calculation processes.
      </li>
      <li>
        <strong>Index Data Catalog</strong> &mdash; A searchable, canonical
        reference for datasets and fields used in index construction. Product
        Managers relied on the Catalog for data discovery, research, and index
        development.
      </li>
    </ul>
  </CareerCard>
);
