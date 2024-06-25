import Dialog from "@mui/material/Dialog";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@mui/material/Alert';
import { SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getDocsThunk, setError } from "../../features/documents/documents";
import { DocumentItem } from "./document-item/document-item";
import { AddDocumentForm } from "../../components/ui/add-document-input/add-document-form";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import s from "./table.module.scss";

export const Table = () => {
  const error = useAppSelector(state => state.documents.error)
  const dispatch = useAppDispatch();
  const docs = useAppSelector((state) => state.documents.items);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getDocsThunk());
  }, []);

  const openHandler = () => {
    setOpen(!open);
  };

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setError(null));
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");

  }

  return (
    <>
     <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Button onClick={logout} variant="outlined" style={{ position: 'absolute', right: '5%' }}>Logout</Button>
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
    </>
  );
};
