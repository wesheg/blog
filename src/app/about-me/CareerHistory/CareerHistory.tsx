import {
  BbgIndex,
  BbgBquant,
  BbgDevAdv,
  Cypress,
  Teg,
  BbgMobile,
} from "./cards";

export const CareerHistory = () => {
  return (
    <section>
      {/* <div className={styles.background} /> */}
      <h2>Career History</h2>
      <BbgMobile />
      <BbgIndex />
      <BbgBquant />
      <BbgDevAdv />
      <Teg />
      <Cypress />
    </section>
  );
};
