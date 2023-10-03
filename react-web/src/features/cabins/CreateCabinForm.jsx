import {useForm} from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import {useCreateCabin} from "./useCreateCabin";
import {useEditCabin} from "./useEditCabin";

function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
    const {isCreating, createCabin} = useCreateCabin();
    const {isEditing, editCabin} = useEditCabin();
    const isWorking = isCreating || isEditing;

    const {id: editId, ...editValues} = cabinToEdit;
    const isEditSession = Boolean(editId);

    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const {errors} = formState;

    function onSubmit(data) {
        const image = typeof data.image === "string" ? data.image : data.image[0];

        if (isEditSession)
            editCabin(
                {newCabinData: {...data, image}, id: editId},
                {
                    onSuccess: (data) => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        else
            createCabin(
                {...data, image: image},
                {
                    onSuccess: (data) => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
    }

    function onError(errors) {
        // console.log(errors);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="房间名称" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", {
                        required: "必填字段",
                    })}
                />
            </FormRow>

            <FormRow label="最大容量" error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "必填字段",
                        min: {
                            value: 1,
                            message: "最小值为1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="原价" error={errors?.regularPrice?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register("regularPrice", {
                        required: "必填字段",
                        min: {
                            value: 1,
                            message: "最小值为1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="折扣" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    defaultValue={0}
                    {...register("discount", {
                        required: "必填字段",
                        validate: (value) =>
                            value <= getValues().regularPrice ||
                            "折扣必须小于原价",
                    })}
                />
            </FormRow>

            <FormRow
                label="描述"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isWorking}
                    {...register("description", {
                        required: "必填字段",
                    })}
                />
            </FormRow>

            <FormRow label="照片">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession ? false : "必填字段",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "编辑房间" : "创建房间"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
