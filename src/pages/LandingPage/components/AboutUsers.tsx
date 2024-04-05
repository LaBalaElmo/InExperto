// import image from "../../../assets/images/logo_inexoert.png";
import { Title } from "../../../components/texts/Title";
import { ImageWithBotderTranslate } from "./ImageWithBotderTranslate";
import { NumberWithSubtitle } from "./NumberWithSubtitle";
import { YellowLine } from "./YellowLine";

const AboutUsers: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row bg-blue-50">
            <div className="w-full md:w:1/2 flex flex-col gap-10 justify-center items-center px-10 md:px-20 py-10 md:py-40">
                <ImageWithBotderTranslate />
            </div>

            <div className="w-full md:w:1/2 flex flex-col gap-10 justify-center items-start px-10 md:px-20 py-10 md:py-40">
                <Title title="About Users" />
                <p className="text-xl">
                    Inexperienced individuals looking for job opportunities in
                    Bolivia. Motivated individuals eager to kickstart their
                    careers. Job seekers seeking a platform that offers equal
                    opportunities for both experienced and inexperienced
                    candidates. Individuals willing to learn and grow in their
                    desired fields. People who value skill-based matching for
                    better job prospects.
                </p>
                <div className="flex md:flex-row flex-col gap-10">
                    <NumberWithSubtitle title="12" subtitle="Jobs Taken" />
                    <YellowLine />
                    <NumberWithSubtitle title="4.5" subtitle="In Review" />
                    <YellowLine />
                    <NumberWithSubtitle title="5" subtitle="Jobs Posted" />
                </div>
            </div>
        </div>
    );
};

export default AboutUsers;
