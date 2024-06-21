import Button from "@material-ui/core/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import { Input } from "../../conrolled/input";

import { DevTool } from "@hookform/devtools";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { addDocThunk } from "../../../features/documents/documents";
import s from "./add-document-input.module.scss";


export interface DocFrom {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}
const DocSchema: ZodType<DocFrom> = z.object({
  companySigDate: z.string(),
  companySignatureName: z.string(),
  documentName: z.string().min(1, { message: 'Document name is required' }),
  documentStatus: z.string().min(1, { message: 'Document status is required' }),
  documentType: z.string(),
  employeeNumber: z.string(),
  employeeSigDate: z.string(),
  employeeSignatureName: z.string(),
});

export const AddDocumentInput = () => {
  const dispatch = useAppDispatch()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<DocFrom>({
    resolver: zodResolver(DocSchema),
    defaultValues: {
      companySigDate: "",
      companySignatureName: "",
      documentName: "",
      documentStatus: "",
      documentType: "",
      employeeNumber: "",
      employeeSigDate: "",
      employeeSignatureName: "",
    },
  });

  const onSubmit: SubmitHandler<DocFrom> = async(data: DocFrom) => {
    dispatch(addDocThunk(data))
    reset();
  };

  return (
    <>
          <DevTool control={control} placement="top-right" />

    <form className={s.inputContainer} onSubmit={handleSubmit(onSubmit)}>
      {/* <TextField
        variant="outlined"
        placeholder={"Add document"}
        value={inputValue}
        onChange={handleChange}
        className={s.input}
      /> */}
      <h3>Add document</h3>
      <Input
        control={control}
        name={"companySigDate"}
        variant="outlined"
        placeholder={"MM/DD/YYYY"}
        className={s.input}
      />
      <Input
        control={control}
        name={"companySignatureName"}
        variant="outlined"
        placeholder={"company signature name"}
        className={s.input}
      />
      <Input
        control={control}
        name={"documentName"}
        variant="outlined"
        placeholder={"document name"}
        className={s.input}
      />
      <Input
        control={control}
        name={"documentStatus"}
        variant="outlined"
        placeholder={"document status"}
        className={s.input}
      />
      <Input
        control={control}
        name={"documentType"}
        variant="outlined"
        placeholder={"document type"}
        className={s.input}
      />
      <Input
        control={control}
        name={"employeeNumber"}
        variant="outlined"
        placeholder={"employee number"}
        className={s.input}
      />
      <Input
        control={control}
        name={"employeeSignatureName"}
        variant="outlined"
        placeholder={"employee signature name"}
        className={s.input}
      />
      <Input
        control={control}
        name={"employeeSigDate"}
        variant="outlined"
        placeholder={"MM/DD/YYYY"}
        className={s.input}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={s.button}
      >
        Add
      </Button>
    </form>
    </>

  );
};
