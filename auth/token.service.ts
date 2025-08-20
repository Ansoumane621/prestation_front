export class TokenService {
  static setToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }

  static getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  static removeToken(): void {
    sessionStorage.removeItem('authToken');
  }
}
