import { useForm, FormProvider } from "react-hook-form";
import CustomInput from "../formComponents/CustomInput";
import {
    errMsgEmail,
    EMAIL_CHECK,
    errMsgRequired,
} from "../../../helpers/regex";
import CustomButton from "../../buttons/CustomButton";
import { IconoirProvider, ProfileCircle } from "iconoir-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { makeUserActor } from "../../../../service/actors";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type LoginFormValues = {
    email: string;
    password: string;
};

const userActor = makeUserActor();

function LoginForm() {
    const navigate = useNavigate();
    const methods = useForm<LoginFormValues>();
    const { setAuth } = useAuth();
    const [error, setError] = useState("");
    const mutation = useMutation({
        mutationFn: (data: LoginFormValues) => {
            return userActor.login(data.email, data.password);
        },
        onSuccess: (data: any) => {
            try {
                const user = data.ok;
                setAuth({
                    userId: user.user.id[0].toString(),
                    token: user.token,
                    user: user.user,
                });
                navigate("/inicio");
            } catch (_) {
                setError("Usuario o contraseña incorrectos");
                const user = data.err;
                console.log(user);
            }
        },
    });

    async function onSubmit(data: LoginFormValues) {
        mutation.mutate(data);
    }

    useEffect(() => {
        setError("");
    }, [methods.watch()]);

    return (
        <div className="p-4 py-16 place-items-center place-self-center grid w-4/5">
            {error && <p className="text-red-500 font-bold text-sm">{error}</p>}
            <FormProvider {...methods}>
                <section className="grid place-items-center">
                    <IconoirProvider
                        iconProps={{
                            width: "100px",
                            height: "100px",
                        }}
                    >
                        <ProfileCircle />
                    </IconoirProvider>
                </section>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="grid gap-4 w-full sm:w-3/4 md:w-2/4 lg:w-1/3"
                >
                    <section className="grid gap-2">
                        <CustomInput
                            id="email"
                            label="Email"
                            type="text"
                            validations={{
                                required: errMsgRequired,
                                pattern: {
                                    value: EMAIL_CHECK,
                                    message: errMsgEmail,
                                },
                            }}
                        />
                        <CustomInput
                            id="password"
                            label="Password"
                            type="password"
                            validations={{
                                required: errMsgRequired,
                            }}
                        />
                    </section>
                    <CustomButton>Login</CustomButton>
                </form>
            </FormProvider>
        </div>
    );
}

export default LoginForm;
