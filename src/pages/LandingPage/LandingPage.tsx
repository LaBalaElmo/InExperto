import { About } from "./components/About";
import Employees from "./components/Employees";
import HeroImage from "./components/HeroImage";
import Jobs from "./components/Jobs";
import { JoinToday } from "./components/JoinToday";
import Trusted from "./components/Trusted";
import AboutUsers from "./components/AboutUsers";
import WhatWillGEt from "./components/WhatWillGEt";

export const LandingPage = () => (
    <>
        <HeroImage />
        <Employees />
        <AboutUsers />
        <Trusted />
        <JoinToday />
        <WhatWillGEt />
        <Jobs />
        <About />
    </>
);
