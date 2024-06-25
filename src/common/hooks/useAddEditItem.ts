import { ZodType, z } from "zod";
import { DocForm } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

export const useAddEditItem = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
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

  return { handleSubmit, control, errors, reset, setValue };
};
