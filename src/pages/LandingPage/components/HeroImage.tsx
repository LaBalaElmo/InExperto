import heroImage from "../../../assets/images/logo_inexoert.png";
import { UnderlineButton } from "../../../components/buttons/UnderlineButton";
import { YellowButton } from "../../../components/buttons/YellowButton";
import { ListTitleNumber } from "../../../components/decorations/ListTitleNumber";

const HeroImage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between bg-blue-950">
      <div className="md:w-1/2 flex flex-col gap-10 p-10 md:p-28">
        <span className="flex items-center text-center text-4xl font-bold text-white gap-2">
          <div className="w-1/12 h-1 bg-yellow-500 sm:w-8"></div>
          <span className="text-sm text-white font-thin">
            Welcome to InExperto
          </span>
        </span>

        <span className="sm:text-6xl font-bold text-white text-2xl">
          <span className="text-yellow-500">InExperto</span> the platform for
          your oprtunities
        </span>

        <span className="text-sm font-thin text-gray-300 w-full md:w-full">
          Find jobs in Bolivia, when inexperienced Post jobs in Bolivia, seaking
          people with skills while also giving opportunity to the inexperienced
        </span>

        {/* buutons */}
        <div className="flex gap-6">
          <YellowButton width="w-1/2" onClick={() => {}}>
            Join
          </YellowButton>
          <UnderlineButton onClick={() => {}}>Register</UnderlineButton>
        </div>
        <div className="flex gap-8 flex-col md:flex-row">
          <ListTitleNumber title="Jobs:" description="5986 Jobs" />
          <ListTitleNumber title="Employees:" description="232 Employees" />
          <ListTitleNumber title="Rating:" description="4.5/5" />
        </div>
      </div>
      <img
        className="object-contain w-1/2 h-screen collapse md:visible"
        src={heroImage}
        alt="hero"
      />
    </div>
  );
};

export default HeroImage;
