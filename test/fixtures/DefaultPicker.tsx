import { type ColorPickerProps, DefaultColorPicker } from "~/index";
import { splitProps } from "solid-js";

export default function DefaultPicker(props: ColorPickerProps){
    const [local, other] = splitProps(props, ["id"]);
    const id = local.id || "test-color-picker";

    return (
        <>
            <label for={id}>Default Color Picker</label>
            <DefaultColorPicker id={id} { ...other } />
        </>
    )
}