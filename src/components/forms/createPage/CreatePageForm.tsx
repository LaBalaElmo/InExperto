import { useForm, FormProvider } from "react-hook-form";
import CustomInput from "../formComponents/CustomInput";
import { errMsgRequired } from "../../../helpers/regex";
import CustomButton from "../../buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makePageActor } from "../../../../service/actors";
import useAuth from "../../../hooks/useAuth";

type CreatePageFormValues = {
    title: string;
    description: string;
    category: string;
};

const pageActor = makePageActor();

function CreatePageForm() {
    const navigate = useNavigate();
    const methods = useForm<CreatePageFormValues>();
    const { auth } = useAuth();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data: CreatePageFormValues) => {
            return pageActor.createPage(
                auth.token,
                {
                    id: [],
                    user: [],
                    userID: [],
                    urlProfile: [],
                    urlBanner: [],
                    postID: [],
                    post: [],
                    name: data.title,
                    description: data.description,
                },
                []
            );
        },
        onSuccess: async (data: any) => {
            console.log(data);
            try {
                const page = data.ok;
                await queryClient.invalidateQueries({ queryKey: ["Pages"] });
                navigate(`/inicio/page/${page.id[0]}`);
            } catch (err) {
                console.log(err);
            }
        },
    });

    async function onSubmit(data: CreatePageFormValues) {
        mutation.mutate(data);
    }

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="p-4 grid place-items-center bg-slate-100 shadow-lg rounded-lg"
        >
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="grid gap-4 w-3/4 py-4"
                >
                    <section className="grid gap-2">
                        <CustomInput
                            id="title"
                            label="Título"
                            type="text"
                            validations={{
                                required: errMsgRequired,
                            }}
                        />
                        <CustomInput
                            id="description"
                            label="Descripción"
                            type="textarea"
                            validations={{
                                required: errMsgRequired,
                            }}
                        />
                        {/* <CustomInput
                            id="category"
                            label="Categoría"
                            type="text"
                            validations={{
                                required: errMsgRequired,
                            }}
                        /> */}
                    </section>
                    <CustomButton>Crear Página</CustomButton>
                </form>
            </FormProvider>
        </div>
    );
}

export default CreatePageForm;
