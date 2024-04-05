// import React from "react";
import { BorderButton } from "../../../components/buttons/BorderButton";
import joinToday from "../../../assets/images/joinToday.png";
import { Title } from "../../../components/texts/Title";

export const JoinToday = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-white bg-blue-950 justify-center items-center p-5 ">
            <div className="flex flex-col gap-2 md:p-10 md:w-1/2 w-full p-5">
                <Title titleColor="text-white" title="Join Today" />
                <p className="text-start">
                    Remember, our service is completely free for both job
                    seekers and employers, offering different layers to suit
                    different needs.
                </p>
                <p className="text-start">
                    Join today and start your journey towards finding the
                    perfect job or hiring exceptional talent in Bolivia!
                </p>
                <BorderButton width="md:w-1/2 w-full" textColor="text-white">
                    Join Today
                </BorderButton>
            </div>
            <div className="md:w-1/2 w-full">
                <img src={joinToday} alt="join today" />
            </div>
        </div>
    );
};
