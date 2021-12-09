class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

/*essa classe irá receber a interceptação do midware com uma messagem de erro padrão,
o midware evita criar um try cat em cada serviço, dentro de um controller por exemplo.
*/
export default AppError;
