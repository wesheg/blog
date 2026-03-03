import { CareerCard } from "../CareerCard/CareerCard";
import Link from "next/link";

export const Teg = () => {
  return (
    <CareerCard
      imgSrc="/companies/EscapeGame.png"
      imgAlt="The Escape Game, LLC Logo"
      jobTitle="Financial Analyst & Software Developer"
      companyName="The Escape Game, LLC"
      location="Nashville, Tennessee, USA"
      startDate="Feb 2018"
      endDate="Aug 2020"
    >
      <p>
        <Link href="https://theescapegame.com/" target="_blank">
          The Escape Game, LLC
        </Link>{" "}
        designs, manufactures, and operates live puzzle-based experiences at
        over 45 retail locations across the United States. Teams of players work
        together to solve a series of challenges, hoping to escape from a themed
        environment within a set time limit.
      </p>
      <p>
        My primary role at The Escape Game was financial planning and analysis.
        I administered the annual budgeting process, maintained company cash
        flow forecasts, and advised the executive team and venture capital
        partners.
      </p>
      <p>
        I also developed internal software that integrated the customer booking
        platform with the enterprise accounting system, automatically converting
        transactions into journal entries. This streamlined the month-end close
        process and supported the company&apos;s growth.
      </p>
    </CareerCard>
  );
};
