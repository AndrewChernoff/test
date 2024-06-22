import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import { DocumentType } from "../../../../features/documents/types";
import { useEffect } from "react";
import { Input } from "../../../../components/conrolled/input";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { updateDocThunk } from "../../../../features/documents/documents";
import { DocForm } from "../../../../common/types";
import s from "../document-item.module.scss";

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
  document: DocumentType;
  setEditFalse: () => void;
};

export const EditItem = ({ document, setEditFalse }: PropsType) => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
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
      <td>
        <button onClick={handleSubmit(updateDockHandler)}>update</button>
        <button onClick={setEditFalse}>cancel</button>
      </td>
    </>
  );
};
