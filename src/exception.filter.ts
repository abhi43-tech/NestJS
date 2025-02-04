import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
	const ctx = host.switchToHttp();
	const response = ctx.getResponse();
	const status = exception.getStatus();
	const message = exception.message;

	response.status(status).json({
	  statusCode: status,
	  message: message,
	});
  }  
}