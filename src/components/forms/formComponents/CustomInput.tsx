import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IconoirProvider, EyeEmpty, EyeOff } from "iconoir-react";
import ErrorMessage from "./ErrorMessage";
import Select from "react-select";
import { options } from "./data";

type MainInputProps = {
    id: string;
    label: string;
    type: string;
    value?: string;
    validations?: {
        required?: string;
        pattern?: {
            value: RegExp;
            message: string;
        };
    };
};

type InputProps = {
    id: string;
    validations?: {
        required?: string;
        pattern?: {
            value: RegExp;
            message: string;
        };
    };
    type?: string;
    value?: string;
};

function Input({ id, label, type, validations, value = "" }: MainInputProps) {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <div className="input">
            <label htmlFor={id}>{label}</label>
            {type === "password" ? (
                <PasswordInput id={id} validations={validations} />
            ) : type === "textarea" ? (
                <AreaInput id={id} validations={validations} />
            ) : type === "multiselect" ? (
                <SelectInput id={id} />
            ) : (
                <TextInput
                    id={id}
                    validations={validations}
                    value={value}
                    type={type}
                />
            )}
            <ErrorMessage errors={errors[id]} />
        </div>
    );
}

function AreaInput({ id, validations }: InputProps) {
    const { register } = useFormContext();
    return (
        <textarea
            className="focus-within:outline-blue-500 w-full rounded-md p-1.5 outline-1 border-2 border-blue-500 border-collapse focus-within:outline-2"
            // name={id}
            id={id}
            cols={40}
            rows={10}
            // value={value}
            {...register(id, validations)}
            // placeholder={inside}
            // onChange={(e) => {
            //     setChanged(true);
            //     setValue(e.target.value);
            // }}
        ></textarea>
    );
}

function SelectInput({ id, validations }: InputProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    return (
        <div>
            <Controller
                name={id}
                control={control}
                rules={validations}
                render={({ field }) => (
                    <Select
                        {...field}
                        isMulti
                        options={options}
                        value={field.value}
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                borderColor: "#3b82f6",
                                borderWidth: "2px",
                            }),
                        }}
                        // onChange={(selectedOption) =>
                        //     field.onChange(selectedOption.value)
                        // }
                    />
                )}
            />
            <ErrorMessage errors={errors[id]} />
        </div>
    );
}

function TextInput({ id, validations, value, type }: InputProps) {
    const { register } = useFormContext();
    return (
        <input
            className="appearance-none focus-within:outline-blue-500 w-full rounded-md p-1.5 outline-1 border-2 border-blue-500 border-collapse focus-within:outline-2"
            type={type}
            {...register(id, validations)}
            defaultValue={value}
        />
    );
}

function PasswordInput({ id, validations }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { register } = useFormContext();
    return (
        <div className="flex">
            <input
                className="appearance-none focus-within:outline-blue-500 w-full rounded-s-md p-1.5 outline-1 border-t-2 border-l-2 border-b-2 border-blue-500 border-collapse"
                type={showPassword ? "text" : "password"}
                {...register(id, validations)}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-1 border-2 border-blue-500 rounded-r-md focus:outline-none"
            >
                <IconoirProvider>
                    {showPassword ? <EyeEmpty /> : <EyeOff />}
                </IconoirProvider>
            </button>
        </div>
    );
}

export default Input;
