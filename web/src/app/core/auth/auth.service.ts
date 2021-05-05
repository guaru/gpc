import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUri } from '../enums/ApiUri';
import { IConfirmation } from '../interface/IConfirmation';
import { IJwtResponse } from '../interface/IJwtResponse';
import { INav } from '../interface/INav';
import { IRecover } from '../interface/IRecover';
import { ITokenInfo } from '../interface/ITokenInfo';
import { Office } from '../models/office.model';
import { User } from '../models/user.model';
import { GlobalConstantHttpService } from '../services/global-constant-http.service';
import { GlobalEnviromentService } from '../services/global-enviroment.service';
import { Util } from '../utils/Util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  _user!: User;
  private  _token!: string;
  private  _functions!: INav[];


  constructor(private http: HttpClient, private globalEnv: GlobalEnviromentService,
    private globalConstantHttp: GlobalConstantHttpService) {

    }



  public  loginAuth(userName:string,password:string): Observable<IJwtResponse> {

    const credential = Util.toBase64(`${this.globalEnv.env.CLIENT_API_ID}:${this.globalEnv.env.CLIENT_API_KEY}`);
    const httpHeader = new HttpHeaders({
      'Content-Type': this.globalConstantHttp.CONTENT_TIYPEAPPLICATION_FORM_URLENCODED,
      'Authorization': 'Basic ' + credential
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', userName || '');
    params.set('password', password || '');

    return this.http.post<IJwtResponse>(this.globalEnv.env.URL_API_AUTH, params.toString(),
      { headers: httpHeader }).pipe(
        catchError(this.globalConstantHttp.handleError)
      );

  }

  public validateConfirmation(username: string | null | undefined, password: string | null | undefined): Observable<any>{
    let confirmation:IConfirmation = { password, username: username, id :''};
    return this.http.put<any>(`${this.globalEnv.env.URL_API}account/validateConfirmation`,confirmation).pipe(
      catchError(this.globalConstantHttp.handleError)
    );
  }

  public validateRecover(username: string | null | undefined, password: string | null | undefined): Observable<any>{
    let confirmation:IConfirmation = { password, username: username, id :''};
    return this.http.put<any>(`${this.globalEnv.env.URL_API}account/validateRecover`,confirmation).pipe(
      catchError(this.globalConstantHttp.handleError)
    );
  }

  public confirmation(username: string | null | undefined, password: string | null | undefined, id: string | null | undefined): Observable<any>{
    let confirmation:IConfirmation = { password, username, id };
    return this.http.put<any>(`${this.globalEnv.env.URL_API}account/confirmation`,confirmation).pipe(
      catchError(this.globalConstantHttp.handleError)
    );
  }

  public changePassword(username: string | null | undefined, password: string | null | undefined, id: string | null | undefined): Observable<any>{
    let confirmation:IConfirmation = { password, username, id };
    return this.http.put<any>(`${this.globalEnv.env.URL_API}account/changePassword`,confirmation).pipe(
      catchError(this.globalConstantHttp.handleError)
    );
  }

  public restorePassword(username: string | null | undefined, password: string | null | undefined, id: string | null | undefined): Observable<any>{
    let confirmation:IConfirmation = { password, username, id };
    return this.http.put<any>(`${this.globalEnv.env.URL_API}account/restorePassword`,confirmation).pipe(
      catchError(this.globalConstantHttp.handleError)
    );
  }

  public recover(email: string | null | undefined): Observable<any>{
    let recover:IRecover = { email };
    return this.http.put<any>(`${this.globalEnv.env.URL_API}account/recover`,recover).pipe(
      catchError(this.globalConstantHttp.handleError)
    );
  }

  public getAccount(username: string): Observable<INav[]>{
    return this.http.get<INav[]>(`${this.globalEnv.env.URL_API}account`)
        .pipe(catchError(this.globalConstantHttp.handleError));
  }

  public getUser(): Observable<any>{
    return this.http.get<any>(`${this.globalEnv.env.URL_API}users/${this.user ? this.user.id : ''}`)
    .pipe(catchError(this.globalConstantHttp.handleError));
  }


  public  saveUser(accessToken: IJwtResponse): Promise<boolean> {
    return new Promise(   ( resolve)=> {
      let payload = this.getInfoToken(accessToken.access_token);
      this._user = new User();
      this._user.userName = accessToken.username;
      this._user.id = accessToken.id
      this._user.name = payload.firtName;
      this._user.lastName = payload.lastName;
      this._user.email = payload.email;
      this._user.roles = payload.authorities;
      this._user.office  = new Office(payload.officeId,payload.officeName);
      localStorage.setItem('user', JSON.stringify(this._user));
      localStorage.setItem('token', accessToken.access_token);

      this.getAccount(accessToken.username).subscribe(response => {
        let functions: INav[] = response;
        localStorage.setItem('functions', JSON.stringify(functions));
        resolve(true);
      }, error => {
        resolve(false);
       });

    });
  }


  private getInfoToken(accessToken: string): ITokenInfo {
    return (accessToken != null && accessToken.length > 0)  ? JSON.parse(Util.base64Decode(accessToken.split(".")[1])) : null;
  }


  public get user():User | null{
   return this._user != null && this._user.userName ? this._user :
     localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')||'') as User
           : null;
  }


  public get token():string | null{
    return this._token != null && this._token!= '' && this._token.length > 0 ? this._token :
      localStorage.getItem('token') != null ? localStorage.getItem('token')  : null;
  }

  public get functions():INav[] |  null {
    return this._functions != null && this._functions.length > 0  ?  this._functions :
      localStorage.getItem('functions') != null ? JSON.parse(localStorage.getItem('functions') || '') as INav[] : null
  }

  public isAuthenticated():boolean
  {
    let payload =  this.getInfoToken(this.token||'');
    if(payload !=null && payload.user_name && payload.user_name.length > 0){
      return true;
    }
      return false;
  }

  public logout():Promise<boolean>{
    return new Promise ( (resolve)=>{
      this._token = '';
      this._user = new User();
      localStorage.clear();
      resolve(true);
    });
  }

  public hasRole(role:string):boolean
  {
      if(this.isAuthenticated()){
       let result =  this.user?.roles?.filter(x=>x == role);
         return result && result.length > 0 || false;
      }
      return false;
  }

  public isTokenExpired():boolean {
    const payload =  this.getInfoToken(this.token||'');
    let now =  new Date().getTime() / 1000;
    if(payload.exp < now){
      return true;
    }
    return false;
  }





}
