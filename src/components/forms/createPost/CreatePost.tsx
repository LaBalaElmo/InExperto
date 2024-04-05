import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../formComponents/CustomInput";
// import { YellowButton } from "../../buttons/YellowButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makePageActor } from "../../../../service/actors";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import CustomButton from "../../buttons/CustomButton";
import { toast } from "sonner";

type CreatePostFormValues = {
    title: string;
    description: string;
};

const pageActor = makePageActor();

function CreatePost() {
    const methods = useForm<CreatePostFormValues>();
    const queryClient = useQueryClient();
    const param = useParams();
    const { auth } = useAuth();
    // const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: (data: CreatePostFormValues) => {
            const date = new Date();
            const month = Number(date.getMonth()) + 1;
            return pageActor.createPost(
                auth.token,
                {
                    id: [],
                    categoryID: [],
                    applicant: [],
                    title: data.title,
                    applicantID: [],
                    urlImage: [],
                    page: [],
                    description: data.description,
                    creationDate:
                        date.getDate() + "/" + month + "/" + date.getFullYear(),
                    category: [],
                    pageID: [],
                },
                BigInt(param.id as string)
            );
        },
        onSuccess: async (data: any) => {
            console.log(data);
            await queryClient.invalidateQueries({ queryKey: ["MyJobs"] });
            // navigate(`/inicio/page/${param.id}`);
        },
    });

    async function onSubmit(data: CreatePostFormValues) {
        // const postJob = mutation.mutate(data);
        const promise = () =>
            new Promise(async (resolve) => resolve(mutation.mutate(data)));

        toast.promise(promise, {
            loading: "Cargando...",
            success: (_) => {
                return `${auth.user.name} se creo el post exitosamente!`;
            },
            error: "Error al ",

            action: {
                label: "Deshacer",
                onClick: () => console.log("Undo"),
            },
        });
    }

    return (
        <div className="border shadow-lg p-4 rounded-lg">
            <FormProvider {...methods}>
                <form
                    className="grid gap-4"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <CustomInput
                        id="title"
                        label="Título"
                        type="text"
                        validations={{
                            required: "El título es requerido",
                        }}
                    />
                    <CustomInput
                        id="description"
                        label="Descripción"
                        type="textarea"
                        validations={{
                            required: "La descripción es requerida",
                        }}
                    />
                    <CustomButton>Crear Post</CustomButton>
                </form>
            </FormProvider>
        </div>
    );
}

export default CreatePost;
