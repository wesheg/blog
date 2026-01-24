// import styles from "./careerHistory.module.css";
import { CareerCard } from "./CareerCard/CareerCard";

export const CareerHistory = () => {
  return (
    <section>
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
        companyName="Bloomberg Index Securities Limited"
        location="London, U.K."
        startDate="Feb 2024"
        endDate="Jan 2026"
      >
        <p>Test</p>
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
