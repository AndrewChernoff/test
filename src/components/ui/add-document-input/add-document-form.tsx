import Button from "@material-ui/core/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import { Input } from "../../conrolled/input";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { addDocThunk } from "../../../features/documents/documents";
import s from "./add-document-form.module.scss";
import { DocForm } from "../../../common/types";

const DocSchema: ZodType<DocForm> = z.object({
  companySigDate: z.string().min(9, { message: "format is MM/DD/YYYY" }),
  companySignatureName: z.string().min(1, { message: "field is required" }),
  documentName: z.string().min(1, { message: "field is required" }),
  documentStatus: z.string().min(1, { message: "field is required" }),
  documentType: z.string().min(1, { message: "field is required" }),
  employeeNumber: z.string().min(1, { message: "field is required" }),
  employeeSigDate: z.string().min(9, { message: "format is MM/DD/YYYY" }),
  employeeSignatureName: z.string().min(1, { message: "field is required" }),
});

type PropsType = {
  closeModal: () => void
}

export const AddDocumentForm = ({closeModal} : PropsType) => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<DocForm>({
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

  const onSubmit: SubmitHandler<DocForm> = async (data) => {
    dispatch(addDocThunk(data));
    reset();
    closeModal();
  };

  return (
      <form className={s.inputContainer} onSubmit={handleSubmit(onSubmit)}>
        <h3>Add document</h3>
        <Input
          error={errors && errors.companySigDate?.message}
          control={control}
          name={"companySigDate"}
          variant="outlined"
          placeholder={"MM/DD/YYYY"}
          className={s.input}
        />
        <Input
          error={errors && errors.companySignatureName?.message}
          control={control}
          name={"companySignatureName"}
          variant="outlined"
          placeholder={"company signature name"}
          className={s.input}
        />
        <Input
          error={errors && errors.documentName?.message}
          control={control}
          name={"documentName"}
          variant="outlined"
          placeholder={"document name"}
          className={s.input}
        />
        <Input
          error={errors && errors.documentStatus?.message}
          control={control}
          name={"documentStatus"}
          variant="outlined"
          placeholder={"document status"}
          className={s.input}
        />
        <Input
          error={errors && errors.documentType?.message}
          control={control}
          name={"documentType"}
          variant="outlined"
          placeholder={"document type"}
          className={s.input}
        />
        <Input
          error={errors && errors.employeeNumber?.message}
          control={control}
          name={"employeeNumber"}
          variant="outlined"
          placeholder={"employee number"}
          className={s.input}
        />
        <Input
          error={errors && errors.employeeSignatureName?.message}
          control={control}
          name={"employeeSignatureName"}
          variant="outlined"
          placeholder={"employee signature name"}
          className={s.input}
        />
        <Input
          error={errors && errors.employeeSigDate?.message}
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
  );
};
