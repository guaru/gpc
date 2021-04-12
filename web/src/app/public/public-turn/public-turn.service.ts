import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Url } from 'src/app/core/enums/Url';
import { Office } from 'src/app/core/models/office.model';
import { CatalogPublicHttpService } from 'src/app/core/services/catolog-public-http.service';
import { Util } from 'src/app/core/utils/Util';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';

@Injectable()
export class PublicTurnService {

  private loadSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public load$: Observable<boolean> = this.loadSubject.asObservable();
  public msgError: string = '';
  private _office!:Office | null;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private catalogoService:CatalogPublicHttpService,
    private loadingService: SpinnerService
    ) { }


  async init()
  {
    this.loadingService.initLoading();
    const officeId = await  Util.getParam(this.activeRoute,'officeId');
    if(!officeId)
      this.router.navigate([Url._404]);
    this._office = await this.loadOffice(officeId as string);
    if (this._office != null && this._office.enabled) {
        console.log(this._office);
    } else {
      this.router.navigate([Url._404]);
    }
    this.loadingService.endLoading();
    this.loadSubject.next(true);
  }


  private loadOffice(officeId: string): Promise<Office | null> {
    return new Promise(resolve => {
      try {
        this.catalogoService.getOffice(officeId).subscribe(office => {
          if (office)
            resolve(office);
          else
            resolve(null);
        }, error => {
          resolve(null);
        });
      } catch (e) {
        resolve(null);
      }
    });
  }


 public get office(): Office{
   return this._office || new Office();
 }

}
