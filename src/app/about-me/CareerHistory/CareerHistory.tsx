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
    </section>
  );
};
