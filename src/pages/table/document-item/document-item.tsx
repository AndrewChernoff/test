import { DocumentType } from '../../../features/documents/types';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './document-item.module.scss';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { removeDocThunk } from '../../../features/documents/documents';

type PropsType = {
  document: DocumentType;
}

export const DocumentItem = ({ document }: PropsType) => {
    const dispatch = useAppDispatch()

    const removeDocHandler = (id: string) => dispatch(removeDocThunk({id})) 
  return (
    <tr className={s.row}>
      <td>{document.documentName}</td>
      <td>{document.documentType}</td>
      <td>{document.documentStatus}</td>
      <td>{new Date(document.employeeSigDate).toLocaleDateString()}</td>
      <td>{new Date(document.companySigDate).toLocaleDateString()}</td>
      <td className={s.actions}>
        <a href={'#'} className={s.button}>Company Signature</a>
        <a href={'#'} className={s.button}>Employee Signature</a>
        <button onClick={() => removeDocHandler(document.id)}><DeleteIcon/></button>
      </td>
      
    </tr>
  );
};

  {/* <Paper className={s.card}>
      <h2 className={s.title}>{document.documentName}</h2>
      <p className={s.type}>Type: {document.documentType}</p>
      <p className={s.status}>Status: {document.documentStatus}</p>
      <p className={s.date}>Signed by Employee: {new Date(document.employeeSigDate).toLocaleDateString()}</p>
      <p className={s.date}>Signed by Company: {new Date(document.companySigDate).toLocaleDateString()}</p>
      <div className={s.actions}>
        <a href={'#'} className={s.button}>Company Signature: {document.companySignatureName}</a>
        <a href={'#'} className={s.button}>Employee Signature: {document.employeeSignatureName}</a>
      </div>
    </Paper> */}