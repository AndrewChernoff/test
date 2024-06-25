import Button from "@material-ui/core/Button";
import { SubmitHandler } from "react-hook-form";
import { Input } from "../../conrolled/input";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { addDocThunk } from "../../../features/documents/documents";
import { DocForm } from "../../../common/types";
import { useAddEditItem } from "../../../common/hooks/useAddEditItem";
import s from "./add-document-form.module.scss";

type PropsType = {
  closeModal: () => void
}

export const AddDocumentForm = ({closeModal} : PropsType) => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, errors, reset } = useAddEditItem()

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
