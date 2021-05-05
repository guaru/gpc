export interface IJwtResponse
{
  access_token: string;
  id: string;
  type: string;
  username: string;
  authorities: string[];
}
