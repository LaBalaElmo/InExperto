import { useForm, FormProvider } from "react-hook-form";
import CustomInput from "../formComponents/CustomInput";
import {
    errMsgEmail,
    EMAIL_CHECK,
    // errMsgPhone,
    // CODE_CHECK,
    errMsgRequired,
} from "../../../helpers/regex";
import CustomButton from "../../buttons/CustomButton";
import { IconoirProvider, ProfileCircle } from "iconoir-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { makeUserActor } from "../../../../service/actors";
import useAuth from "../../../hooks/useAuth";
import { User } from "../../../declarations/user/user.did";

type RegisterFormValues = {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    confirmPassword: string;
    telefono: string;
    descripcion: string;
    ci: string;
    birthdate: string;
    skills: {
        value: string;
        label: string;
    }[];
};

const userActor = makeUserActor();

function RegisterForm() {
    const navigate = useNavigate();
    const methods = useForm<RegisterFormValues>();
    const { setAuth } = useAuth();
    const mutation = useMutation({
        mutationFn: (data: RegisterFormValues) => {
            const user: User = {
                id: [],
                name: data.nombre,
                lastname: data.apellido,
                email: data.email,
                password: data.password,
                skills: [data.skills.map((skill) => skill.value)],
                ci: data.ci,
                birthDate: data.birthdate,
                description: data.descripcion,
                experiences: [],
                pages: [],
                experiencesID: [],
                pagesID: [],
                recommendations: [],
                recommendationsID: [],
                urlBanner: [],
                urlProfile: [],
            };
            return userActor.register(user);
        },
        onSuccess: (data: any) => {
            console.log(data);
            const user = data;
            setAuth({
                userId: user.user.id[0].toString(),
                token: user.token,
                user: user.user,
            });
            navigate("/inicio");
        },
    });

    function onSubmit(data: RegisterFormValues) {
        mutation.mutate(data);
    }

    return (
        <div className="p-4 py-16 place-items-center place-self-center grid w-full">
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
                    className="grid gap-4 px-8 w-full sm:w-3/4 md:w-2/4 lg:w-1/3"
                >
                    <section className="grid gap-2">
                        <CustomInput
                            id="nombre"
                            label="Nombre"
                            type="text"
                            validations={{
                                required: errMsgRequired,
                            }}
                        />
                        <CustomInput
                            id="apellido"
                            label="Apellido"
                            type="text"
                            validations={{
                                required: errMsgRequired,
                            }}
                        />
                        <CustomInput
                            id="ci"
                            label="CI"
                            type="number"
                            validations={{
                                required: errMsgRequired,
                            }}
                        />
                        <CustomInput
                            id="birthdate"
                            label="Fecha de nacimiento"
                            type="date"
                            validations={{
                                required: errMsgRequired,
                            }}
                        />
                        {/* <CustomInput
                            id="telefono"
                            label="Telefono"
                            type="number"
                            validations={{
                                required: errMsgRequired,
                                // pattern: {
                                //     value: CODE_CHECK,
                                //     message: errMsgPhone,
                                // },
                            }}
                        /> */}
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
                            label="Contraseña"
                            type="password"
                            validations={{
                                required: errMsgRequired,
                            }}
                        />
                        <CustomInput
                            id="confirmPassword"
                            label="Confirmar contraseña"
                            type="password"
                            validations={{
                                required: errMsgRequired,
                            }}
                        />
                        <CustomInput
                            id="descripcion"
                            label="Descripción"
                            type="textarea"
                            validations={{
                                required: errMsgRequired,
                            }}
                        />
                        <CustomInput
                            id="skills"
                            label="Skills"
                            type="multiselect"
                            validations={{
                                required: errMsgRequired,
                            }}
                        />
                    </section>
                    <CustomButton>Regístrate</CustomButton>
                </form>
            </FormProvider>
        </div>
    );
}

export default RegisterForm;
