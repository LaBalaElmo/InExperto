import SkillCard from "./SkillCard";
import { Title } from "../../../components/texts/Title";
import { SkeletonParagraph } from "../../../components/skeleton/SkeletonParagraph";
import { SkeletonLine } from "../../../components/skeleton/SkeletonLine";

interface InterfaceSkills {
  classNames?: string;
  skills?: [] | [Array<string>];
}

export const Skills: React.FC<InterfaceSkills> = ({ skills, classNames }) => {
  return (
    <>
      <Title title="Skills" />
      <div className={`card mt-5 ${classNames}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills?.map((skill, index) => (
            <SkillCard key={index} title={skill[0]} content={skill[0]} />
          ))}

          {!skills?.length && (
            <>
              <SkillCard
                title={
                  <>
                    <SkeletonLine />
                  </>
                }
                content={
                  <>
                    <SkeletonParagraph />
                    <SkeletonParagraph />
                  </>
                }
              />

              <SkillCard
                title={
                  <>
                    <SkeletonLine />
                  </>
                }
                content={
                  <>
                    <SkeletonParagraph />
                    <SkeletonParagraph />
                  </>
                }
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
