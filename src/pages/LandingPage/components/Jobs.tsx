// import React from "react";
// import { ListTitleNumber } from "../../../components/decorations/ListTitleNumber";
import { YellowButton } from "../../../components/buttons/YellowButton";
import { Title } from "../../../components/texts/Title";
import { CardJobs } from "./CardJobs";

const Jobs = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-10 bg-blue-50">
            <Title title="Jobs" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 py-4 md:p-10">
                <CardJobs
                    title="Junior Web Developer"
                    description="No prior experience required; we provide training and mentorship to help you grow in your web development career."
                    numberJobs="10"
                    numberLength="3 months"
                />
                <CardJobs
                    title="Customer Service Representative"
                    description="We are seeking enthusiastic Customer Service Representatives to assist our clients with their inquiries and provide exceptional support"
                    numberJobs="10"
                    numberLength="2 days"
                />
                <CardJobs
                    title="Marketing Intern"
                    description="Assist our team with various marketing initiatives, including social media management, content creation, and data analysis."
                    numberJobs="10"
                    numberLength="10 hours"
                />
                <CardJobs
                    title="Sales Associate"
                    description="Engage with customers, build relationships, and promote our products/services. No prior sales experience necessary."
                    numberJobs="10"
                    numberLength="4 hours"
                />
            </div>

            <div className="flex flex-col items-center justify-center text-center text-gray-500 gap-10 px-40">
                <YellowButton width="md:w-1/4 w-full" onClick={() => {}}>
                    Join Today
                </YellowButton>
                Remember, our service is completely free for both job seekers
                and employers, offering different layers to suit different
                needs.
                <div className="flex flex-row items-center justify-center text-center text-gray-500 ">
                    <span className="text-blue-950">Have any question?</span>,
                    Contact Us
                </div>
            </div>
        </div>
    );
};

export default Jobs;
