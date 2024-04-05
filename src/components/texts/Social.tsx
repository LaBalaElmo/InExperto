import facebook from "react-useanimations/lib/facebook";
import twitter from "react-useanimations/lib/twitter";
import linkedin from "react-useanimations/lib/linkedin";
import SocialButton from "../buttons/SocialButton";
import UseAnimations from "react-useanimations";

function Social() {
    return (
        <>
            <SocialButton theme="secondary" onClick={() => {}}>
                <UseAnimations animation={facebook} strokeColor="white" />
            </SocialButton>
            <SocialButton theme="secondary" onClick={() => {}}>
                <UseAnimations animation={twitter} strokeColor="white" />
            </SocialButton>
            <SocialButton theme="secondary" onClick={() => {}}>
                <UseAnimations animation={linkedin} strokeColor="white" />
            </SocialButton>
        </>
    );
}

export default Social;
