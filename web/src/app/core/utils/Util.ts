export class Util
{
  public static  toBase64(content: string): string{
    return btoa(content);
  }

  public static base64Decode(content:string): string
  {
    return atob(content);
  }
}
