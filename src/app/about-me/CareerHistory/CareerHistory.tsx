import styles from "./careerHistory.module.css";
import { CareerCard } from "./CareerCard/CareerCard";

export const CareerHistory = () => {
  return (
    <section>
      {/* <div className={styles.background} /> */}
      <h2>Career History</h2>
      <CareerCard
        imgSrc="/companies/Bloomberg.png"
        imgAlt="Bloomberg LP Logo"
        jobTitle="Senior Software Engineer - Mobile"
        companyName="Bloomberg L.P."
        location="London, U.K."
        startDate="Jan 2026"
        endDate="Present"
      >
        <p>Test</p>
      </CareerCard>
      <CareerCard
        imgSrc="/companies/Bloomberg.png"
        imgAlt="Bloomberg LP Logo"
        jobTitle="Senior Software Engineer - Bloomberg Indices"
        companyName="Bloomberg Index Securities Limited (BISL)"
        location="London, U.K."
        startDate="Feb 2024"
        endDate="Jan 2026"
      >
        <p>
          BISL is a regulated subsidiary of Bloomberg that builds broad-market
          and bespoke financial indices. My team&apos;s job was to build tools
          to ensure data quality and reduce time-to-market for the construction
          of new indices.
        </p>
        <p>
          I was the <strong>lead full-stack engineer</strong> and{" "}
          <strong>lead user experience designer</strong> for two internal web
          applications used by our Compliance and Product departments.
        </p>
        <ol>
          <li>
            <strong>Index Quality Controller (iQC)</strong> &mdash; Allows
            Compliance to monitor an automated system of quality checks on large
            datasets before they are used in downstream index calculation. iQC
            empowers users to onboard new datasets, resolve data quality issues,
            and control the use of data in index construction.
          </li>
          <li>
            <strong>Index Data Catalog</strong> &mdash; A searchable
            encyclopedia of all datasets and fields used in the creation of
            equity and fixed income indices. The Index Data Catalog is used by
            Product Managers for idea generation and deeper insight into data
            provided for index construction.
          </li>
        </ol>
      </CareerCard>
      <CareerCard
        imgSrc="/companies/Bloomberg.png"
        imgAlt="Bloomberg LP Logo"
        jobTitle="Senior Software Engineer - BQuant Help Center"
        companyName="Bloomberg L.P."
        location="San Francisco, California, USA"
        startDate="Jan 2023"
        endDate="Feb 2024"
      >
        <p>Test</p>
      </CareerCard>
      <CareerCard
        imgSrc="/companies/Bloomberg.png"
        imgAlt="Bloomberg LP Logo"
        jobTitle="Developer Advocate - BQuant"
        companyName="Bloomberg L.P."
        location="San Francisco, Callifornia, USA"
        startDate="Aug 2020"
        endDate="Jan 2023"
      >
        <p>Test</p>
      </CareerCard>
      <CareerCard
        imgSrc="/companies/EscapeGame.png"
        imgAlt="The Escape Game, LLC Logo"
        jobTitle="Corporate Financial Analyst"
        companyName="The Escape Game, LLC"
        location="Nashville, Tennessee, USA"
        startDate="Feb 2018"
        endDate="Aug 2020"
      >
        <p>Test</p>
      </CareerCard>
      <CareerCard
        imgSrc="/companies/CypressCapital.png"
        imgAlt="Cypress Capital, LLC Logo"
        jobTitle="Investment Research Analyst"
        companyName="Cypress Capital, LLC"
        location="Franklin, Tennessee, USA"
        startDate="Jan 2015"
        endDate="Feb 2018"
      >
        <p>Test</p>
      </CareerCard>
    </section>
  );
};
