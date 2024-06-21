export type DocumentType = {
    id: string;
    documentStatus: string;
    employeeNumber: string;
    documentType: string;
    documentName: string;
    companySignatureName: string;
    employeeSignatureName: string;
    employeeSigDate: string; // or Date if you want to parse the date string
    companySigDate: string;  // or Date if you want to parse the date string
}