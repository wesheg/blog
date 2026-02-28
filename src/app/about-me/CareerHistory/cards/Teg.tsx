import { CareerCard } from "../CareerCard/CareerCard";
import Link from "next/link";

export const Teg = () => {
  return (
    <CareerCard
      imgSrc="/companies/EscapeGame.png"
      imgAlt="The Escape Game, LLC Logo"
      jobTitle="Corporate Financial Analyst"
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
    </CareerCard>
  );
};
