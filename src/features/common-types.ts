export type ErrorResponse = {
    error_code: number;
    error_text: string;
    data: null;
    profiling: string;
    timings: null;
}

export type ResponseData = {
    error_code: number;
    error_message: string;
    data: DocumentType[];
    profiling: string;
    timings: null;
} 