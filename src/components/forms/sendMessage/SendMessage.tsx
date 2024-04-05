import { FormProvider, useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import CustomInput from "../formComponents/CustomInput";
import { errMsgRequired } from "../../../helpers/regex";
import CustomButton from "../../buttons/CustomButton";

type SendMessageFormValues = {
    message: string;
};

function SendMessage() {
    // const navigate = useNavigate();
    const methods = useForm<SendMessageFormValues>();

    function onSubmit(data: SendMessageFormValues) {
        console.log(data);
        // navigate("page/1");
    }

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="p-6 grid place-items-center bg-slate-100 shadow-lg rounded-lg gap-4"
        >
            <h2 className="text-black text-2xl">
                ¿Quieres enviar un mensaje a tu reclutador?
            </h2>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="grid gap-4 w-3/4"
                >
                    <section className="grid gap-2">
                        <CustomInput
                            id="message"
                            label="Mensaje"
                            type="textarea"
                            validations={{
                                required: errMsgRequired,
                            }}
                        />
                    </section>
                    <CustomButton>Enviar mensaje</CustomButton>
                </form>
            </FormProvider>
        </div>
    );
}

export default SendMessage;
