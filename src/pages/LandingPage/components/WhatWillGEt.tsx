// import React from "react";
// import image from "../../../assets/images/logo_inexoert.png";
import { Title } from "../../../components/texts/Title";
import { CardWithCircleNumber } from "./CardWithCircleNumber";
import { ImageWithBotderTranslate } from "./ImageWithBotderTranslate";

const WhatWillGEt = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-10">
            <Title title="What Will You Get" />

            <div className="flex flex-col md:flex-row gap-4  justify-center items-center">
                <div className="flex flex-col w-full md:w-1/2 md:p-10 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                        <CardWithCircleNumber
                            number="01"
                            text="A wide range of job opportunities in Bolivia. Whether you are an experienced professional or someone without prior experience."
                        />
                        <CardWithCircleNumber
                            number="02"
                            text="Equal opportunities to individuals without extensive experience. If you are a motivated individual looking to kickstart your career."
                        />
                        <CardWithCircleNumber
                            number="03"
                            text="Matches the best candidates with the best jobs based on their skills. By focusing on skills rather than just experience."
                        />
                        <CardWithCircleNumber
                            number="04"
                            text="User-friendly platform to post job openings and hire talent effortlessly. Easily reach a diverse pool of candidates."
                        />
                    </div>
                </div>
                <div className="md:w-1/2 w-full flex flex-col gap-5 md:gap-10 justify-center items-center px-20 py-40">
                    <ImageWithBotderTranslate />
                </div>
            </div>
        </div>
    );
};

export default WhatWillGEt;
