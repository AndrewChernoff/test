export type AuthUserType = {
  username: string;
  password: string;
};


export type ServerResponse = {
    error_code: number;
    error_message: string;
    data: {
        token: string;
    };
    profiling: string;
    timings: null; // The type of timings can be more specific if known
  }
  

export type ErrorResponse =  {
    error_code: number;
    error_text: string;
    data: null; // The type of data can be more specific if known
    profiling: string;
    timings: null; // The type of timings can be more specific if known
}