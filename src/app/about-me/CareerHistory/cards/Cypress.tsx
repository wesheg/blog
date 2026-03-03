import { CareerCard } from "../CareerCard/CareerCard";
import Link from "next/link";

export const Cypress = () => {
  return (
    <CareerCard
      imgSrc="/companies/CypressCapital.png"
      imgAlt="Cypress Capital, LLC Logo"
      jobTitle="Quantitative Research Analyst"
      companyName="Cypress Capital, LLC"
      location="Franklin, Tennessee, USA"
      startDate="Jan 2015"
      endDate="Feb 2018"
    >
      <p>
        <Link href="https://www.cypresscapital.com" target="_blank">
          Cypress Capital, LLC
        </Link>{" "}
        is a registered investment advisor and asset manager offering
        quantitative research, outsourced CIO services for financial advisors,
        and a suite of global equity and fixed income portfolios. The
        firm&apos;s asset allocation is informed by proprietary models with the
        aim of improving risk-adjusted returns.
      </p>
      <p>
        At Cypress, I built and maintained financial models, data pipelines, and
        internal software used by portfolio managers to make asset allocation
        decisions. In a weekly <em>Market Outlook</em> newsletter, I wrote to
        clients about the latest developments in financial markets and the
        implications for the firm&apos;s positioning.
      </p>
    </CareerCard>
  );
};
