import { Title } from "../../../components/texts/Title";
import { Company } from "./Company";

const Trusted: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10">
      <Title title="Trusted Companies" />
      <div className="flex flex-col md:flex-row gap-6 mt-10 text-center justify-center items-center">
        <Company
          title="Tech Solutions Co"
          description="Tech Solutions Co is a software development company in Bolivia. They use InExperto to find talented individuals with diverse skill sets, including those without prior experience. They believe in giving opportunities to motivated individuals who are eager to learn and grow in the tech industry."
        />
        <Company
          title="Hospitality Group"
          description="The Hospitality Group operates a chain of hotels and
      restaurants across Bolivia. They utilize InExperto to hire staff members
      for various roles, including entry-level positions. They value the
      platform's skill-based matching system, which helps them find individuals
      who are passionate about the hospitality industry and willing to
      contribute to their team."
        />
        <Company
          title="StartUpX"
          description="StartUpX is a rapidly
      growing startup based in Bolivia. They rely on InExperto to build their
      talented team, including hiring individuals without extensive experience.
      They appreciate the platform's user-friendly interface and the ability to
      reach a diverse pool of candidates who are eager to make a difference in
      the startup ecosystem."
        />
        <Company
          title="Social Impact Organization"
          description="The Social Impact Organization is
      a non-profit organization dedicated to making a positive difference in
      Bolivia. They use InExperto to find passionate individuals who may not
      have significant work experience but are committed to their mission.
      InExperto helps them connect with individuals who align with their values
      and are eager to contribute to social causes."
        />
      </div>
    </div>
  );
};

export default Trusted;
