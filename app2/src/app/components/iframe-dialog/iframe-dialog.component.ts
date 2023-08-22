import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe-dialog',
  templateUrl: './iframe-dialog.component.html',
})
export class IframeDialogComponent implements OnInit {
  url: string = 'https://google.com/';
  urlMap: SafeResourceUrl | undefined;
  tabIndex: number = 0;
  constructor(public sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {
    // this.tabIndex = data?.tabIndex;
  }
  CloseDialog() {}
  getIndex(tabIndex: any) {
    this.tabIndex = tabIndex;
    tabIndex = this.tabIndex + 1;
    return tabIndex;
  }

  ngOnInit() {
    this.urlMap = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  show() {}
}
