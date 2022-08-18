export class JwtResponseModel {
  dataUser: {
    id?: number,
    username: string,
    accessToken: string,
    expiresIn: string
  }

}
