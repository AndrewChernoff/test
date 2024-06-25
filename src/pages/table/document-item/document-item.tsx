import { DocumentType } from "../../../features/documents/types";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { removeDocThunk } from "../../../features/documents/documents";
import { useState } from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { EditItem } from "./edit-item/edit-item";
import s from "./document-item.module.scss";

type PropsType = {
  document: DocumentType;
};

export const DocumentItem = ({ document }: PropsType) => {
  const deletedId = useAppSelector(state => state.documents.deletedId);

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
            <IconButton disabled={deletedId === document.id} onClick={() => removeDocHandler(document.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => setEditMode(!editMode)}><ModeEditIcon /></IconButton>
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
