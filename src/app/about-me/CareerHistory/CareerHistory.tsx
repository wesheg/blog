import styles from "./careerHistory.module.css";
import { CareerCard } from "./CareerCard/CareerCard";
import { BbgIndex, BbgBquant, BbgDevAdv } from "./cards";

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
        location="London, UK"
        startDate="Jan 2026"
        endDate="Present"
      >
        <p>Test</p>
      </CareerCard>
      <BbgIndex />
      <BbgBquant />
      <BbgDevAdv />
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
