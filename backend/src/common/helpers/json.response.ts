export class JsonResponse {
  static success<T>(data: T, message = 'Success') {
    return {
      status: 'success',
      message,
      data,
    };
  }

  static error(message = 'Something went wrong', code = 500) {
    return {
      status: 'error',
      message,
      code,
    };
  }
}
