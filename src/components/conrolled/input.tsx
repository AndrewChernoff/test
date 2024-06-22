import { TextField } from "@material-ui/core";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type PropsType<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  "defaultValue" | "disabled" | "rules"
> & {
  variant: "standard" | "filled" | "outlined" | undefined;
  className: string;
  placeholder: string;
  error?: string;
};

export const Input = <T extends FieldValues>({
  control,
  name,
  variant,
  className,
  placeholder,
  error,
}: PropsType<T>) => {
  const {
    field,
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      error={!!error}
      helperText={error}
      className={className}
      placeholder={placeholder}
      variant={variant}
      onChange={field.onChange}
      value={field.value} // input value
      name={field.name} // send down the input name
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
    />
  );
};
