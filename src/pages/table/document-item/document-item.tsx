import { DocumentType } from "../../../features/documents/types";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { removeDocThunk } from "../../../features/documents/documents";
import { useState } from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { EditItem } from "./edit-item/edit-item";
import s from "./document-item.module.scss";

type PropsType = {
  document: DocumentType;
};

export const DocumentItem = ({ document }: PropsType) => {
  const [editMode, setEditMode] = useState(false);

  const dispatch = useAppDispatch();

  const removeDocHandler = (id: string) => dispatch(removeDocThunk({ id }));
  const setEditFalse = () => setEditMode(false);
  return (
    <tr className={s.row}>
      {!editMode ? (
        <>
          <td>{document.documentName}</td>
          <td>{document.documentType}</td>
          <td>{document.documentStatus}</td>
          <td>{new Date(document.employeeSigDate).toLocaleDateString()}</td>
          <td>{new Date(document.companySigDate).toLocaleDateString()}</td>
          <td>{document.companySignatureName}</td>

          <td>{document.employeeSignatureName}</td>
          <td>
            <button onClick={() => removeDocHandler(document.id)}>
              <DeleteIcon />
            </button>
            <button onClick={() => setEditMode(!editMode)}><ModeEditIcon /></button>
          </td>
        </>
      ) : (
        <>
          <EditItem document={document} setEditFalse={setEditFalse} />
        </>
      )}
    </tr>
  );
};
