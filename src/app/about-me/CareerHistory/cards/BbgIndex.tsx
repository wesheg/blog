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
      BISL is a regulated subsidiary of Bloomberg that builds broad-market and
      bespoke financial indices. My team built tools to ensure data quality and
      reduce time-to-market for new index launches.
    </p>
    <p>
      I was the <strong>lead full-stack engineer</strong> and{" "}
      <strong>lead user experience designer</strong> for two internal web
      applications used by Compliance and Product.
    </p>
    <ol>
      <li>
        <strong>Index Quality Controller (iQC)</strong> &mdash; Enables
        Compliance to monitor and intervene in an automated system of quality
        checks on large datasets before downstream index calculation. iQC
        empowers users to onboard new datasets, resolve quality issues, and
        control the use of data in index construction.
      </li>
      <li>
        <strong>Index Data Catalog</strong> &mdash; A searchable, canonical
        reference for all datasets and fields used in equity and fixed income
        indices. Used by Product Managers for idea generation, data discovery,
        and deeper insight into index construction.
      </li>
    </ol>
  </CareerCard>
);
