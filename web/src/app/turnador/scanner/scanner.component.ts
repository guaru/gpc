import { AfterViewChecked } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TurnHtppService } from '../turn/turn-htpp.service';
import { ScannerService } from './scanner.service';

@Component({
  selector: 'gpc-scanner',
  templateUrl: './scanner.component.html',
  providers: [TurnHtppService, ScannerService]
})
export class ScannerComponent implements AfterViewChecked {

  constructor(
    private dialogRef: MatDialogRef<ScannerComponent>,
     private cdRef: ChangeDetectorRef,
     public scannerService:ScannerService) {

  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  onCancel() {
    this.dialogRef.close();
  }

  async scanSuccessHandler($turnId:string){
    const turn =  await  this.scannerService.turnActionScanner($turnId);
    this.dialogRef.close(turn);
  }


}
