import {useForm} from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {useSignup} from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const {signup, isLoading} = useSignup();
    const {register, formState, getValues, handleSubmit, reset} = useForm();
    const {errors} = formState;

    function onSubmit({fullName, email, password}) {
        signup(
            {fullName, email, password},
            {
                onSettled: () => reset(),
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="姓名" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isLoading}
                    {...register("fullName", {required: "必填字段"})}
                />
            </FormRow>

            <FormRow label="邮箱" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    disabled={isLoading}
                    {...register("email", {
                        required: "必填字段",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please provide a valid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="密码 (至少 8 位)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    disabled={isLoading}
                    {...register("password", {
                        required: "必填字段",
                        minLength: {
                            value: 8,
                            message: "Password needs a minimum of 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="确认密码" error={errors?.passwordConfirm?.message}>
                <Input
                    type="password"
                    id="passwordConfirm"
                    disabled={isLoading}
                    {...register("passwordConfirm", {
                        required: "必填字段",
                        validate: (value) =>
                            value === getValues().password || "Passwords need to match",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    disabled={isLoading}
                    onClick={reset}
                >
                    取消
                </Button>
                <Button disabled={isLoading}>创建用户</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
