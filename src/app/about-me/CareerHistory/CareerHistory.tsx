import styles from "./careerHistory.module.css";
import { CareerCard } from "./CareerCard/CareerCard";
import { BbgIndex, BbgBquant, BbgDevAdv, Cypress, Teg } from "./cards";

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
      <Teg />
      <Cypress />
    </section>
  );
};
