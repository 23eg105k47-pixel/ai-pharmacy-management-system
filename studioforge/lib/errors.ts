export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode = 500,
    public readonly digest?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function toErrorMessage(error: unknown, fallback = "Something went wrong.") {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
