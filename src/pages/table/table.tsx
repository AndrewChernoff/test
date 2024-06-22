import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getDocsThunk } from "../../features/documents/documents";
import { DocumentItem } from "./document-item/document-item";
import { AddDocumentForm } from "../../components/ui/add-document-input/add-document-form";
import { Button } from "@material-ui/core";
import s from "./table.module.scss";

export const Table = () => {
  const dispatch = useAppDispatch();
  const docs = useAppSelector((state) => state.documents.items);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getDocsThunk());
  }, []);

  const openHandler = () => {
    setOpen(!open);
  };

  return (
    <div className={s.tableContainer}>
      {docs.length === 0 ? (
        <h2>No documents</h2>
      ) : (
        <table className={s.table}>
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Employee Sign Date</th>
              <th>Company Sign Date</th>
              <th>Company Signature</th>
              <th>Employee Signature</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <DocumentItem key={doc.id} document={doc} />
            ))}
          </tbody>
        </table>
      )}

      <Dialog open={open} onClose={openHandler} className={s.modal}>
        <AddDocumentForm closeModal={openHandler} />
      </Dialog>

      <Button variant="contained" size="large" onClick={openHandler}>
        Add document
      </Button>
    </div>
  );
};
