export interface IJwtResponse
{
  access_token: string;
  type: string;
  username: string;
  authorities: string[];
}
