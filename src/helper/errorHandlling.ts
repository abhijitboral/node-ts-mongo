class ErrorHandlling extends Error {
    public statusCode: number;
    public name: string;

  constructor(message: string,  statusCode = 500) {
    super(message);
    this.name = 'ErrorHandlling';
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default ErrorHandlling;