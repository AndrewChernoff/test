import { DocumentType } from "../../../features/documents/types";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { removeDocThunk } from "../../../features/documents/documents";
import { useState } from "react";
import s from "./document-item.module.scss";

type PropsType = {
  document: DocumentType;
};

export const DocumentItem = ({ document }: PropsType) => {
  const [editMode, setEditMode] = useState(false)

  const dispatch = useAppDispatch();

  const removeDocHandler = (id: string) => dispatch(removeDocThunk({ id }));
  return (
    <tr className={s.row}>
      <td>{document.documentName}</td>
      <td>{document.documentType}</td>
      <td>{document.documentStatus}</td>
      <td>{new Date(document.employeeSigDate).toLocaleDateString()}</td>
      <td>{new Date(document.companySigDate).toLocaleDateString()}</td>
      <td className={s.actions}>
        <a href={"#"} className={s.button}>
          Company Signature
        </a>
        <a href={"#"} className={s.button}>
          Employee Signature
        </a>
        <button onClick={() => removeDocHandler(document.id)}>
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
};
