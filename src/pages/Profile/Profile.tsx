import Banner from "../../components/decorations/Banner";
import ProfileImages from "./components/ProfileImages";
import { InfoProfile } from "./components/InfoProfile";
import Experience from "./components/Jobs";
import { Skills } from "./components/Skills";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { makeUserActor } from "../../../service/actors";
import { User } from "../../declarations/user/user.did";

const pageActor = makeUserActor();

export const Profile = () => {
  const { auth } = useAuth();
  const profile = useQuery({
    queryKey: ["User"],
    queryFn: getUser,
  });
  const profileData: User = profile.data?.ok;
  function getUser() {
    return pageActor.getUser(auth.token) || [];
  }

  const isProfileData = profileData ? "" : "animate-pulse";

  return (
    <>
      <Banner title="Profile" description="Here you can see your profile." />
      <div className="container mx-auto md:px-40 bg-blue-50">
        <ProfileImages
          bannerImgSrc={profileData.urlBanner[0] ?? ""}
          profileImgSrc={profileData.urlProfile[0] ?? ""}
          classNames={`pt-20 ${isProfileData}`}
        />
        <InfoProfile
          name={`${profileData.name} ${profileData.lastname}`}
          description={profileData.description}
          info={{
            country: "Bolivia",
            language: "Spanish",
            speciality: "Web Development",
            birthday: profileData.birthDate,
            social: ["https://www.facebook.com/eduardo.choque.754"],
          }}
          classNames={isProfileData}
        />
      </div>
      <div className={`container mx-auto p-20`}>
        <Experience classNames={isProfileData} jobs={profileData.experiences} />
      </div>
      <div className="container mx-auto p-20 bg-blue-50">
        <Skills skills={profileData.skills} classNames={isProfileData} />
      </div>
    </>
  );
};
