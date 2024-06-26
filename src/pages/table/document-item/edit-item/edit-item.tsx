import { SubmitHandler } from "react-hook-form";
import { DocumentType } from "../../../../features/documents/types";
import { useEffect } from "react";
import { Input } from "../../../../components/conrolled/input";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { updateDocThunk } from "../../../../features/documents/documents";
import { DocForm } from "../../../../common/types";
import { useAddEditItem } from "../../../../common/hooks/useAddEditItem";
import { Button } from "@material-ui/core";
import s from "../document-item.module.scss";

type PropsType = {
  document: DocumentType;
  setEditFalse: () => void;
};

export const EditItem = ({ document, setEditFalse }: PropsType) => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, errors, isDirty, setValue } = useAddEditItem()

  useEffect(() => {
    for (const prop in document) {
      const key = prop as keyof DocForm;
      if (key === "companySigDate" || key === "employeeSigDate") {
        setValue(key, new Date(document[key]).toLocaleDateString());
      } else {
        setValue(key, document[key]);
      }
    }
  }, [document, setValue]);

  const updateDockHandler: SubmitHandler<DocForm> = async (data) => {
    const obj = { ...data, id: document.id };
    dispatch(updateDocThunk(obj));
    setEditFalse();
  };

  return (
    <>
      <td>
        <Input
          error={errors && errors.documentName?.message}
          control={control}
          name={"documentName"}
          variant="outlined"
          placeholder={"document name"}
          className={s.input}
        />
      </td>
      <td>
        <Input
          error={errors && errors.documentType?.message}
          control={control}
          name={"documentType"}
          variant="outlined"
          placeholder={"document type"}
          className={s.input}
        />
      </td>
      <td>
        <Input
          error={errors && errors.documentStatus?.message}
          control={control}
          name={"documentStatus"}
          variant="outlined"
          placeholder={"document status"}
          className={s.input}
        />
      </td>
      <td>
        <Input
          error={errors && errors.employeeSigDate?.message}
          control={control}
          name={"employeeSigDate"}
          variant="outlined"
          placeholder={"MM/DD/YYYY"}
          className={s.input}
        />
      </td>
      <td>
        <Input
          error={errors && errors.companySigDate?.message}
          control={control}
          name={"companySigDate"}
          variant="outlined"
          placeholder={"MM/DD/YYYY"}
          className={s.input}
        />
      </td>
      <td>
        <Input
          error={errors && errors.companySignatureName?.message}
          control={control}
          name={"companySignatureName"}
          variant="outlined"
          placeholder={"company signature"}
          className={s.input}
        />
      </td>
      <td>
        <Input
          error={errors && errors.employeeSignatureName?.message}
          control={control}
          name={"employeeSignatureName"}
          variant="outlined"
          placeholder={"employee signature"}
          className={s.input}
        />
      </td>
      <td className={s.editActionBtns}>
        <Button variant="contained" disabled={!isDirty} onClick={handleSubmit(updateDockHandler)}>update</Button>
        <Button variant="contained"  onClick={setEditFalse}>cancel</Button>
      </td>
    </>
  );
};
