import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {

  body: any;
  isloaded = false;


  // @Input()
  // completedParam: boolean;

  // @Output()
  // onComplete:EventEmitter<any> = new EventEmitter<any>();


  @Input()
  divId: string;
  constructor(private renderer: Renderer2) {
    // alert('iam ads component');
    this.body = <HTMLDivElement>document.body;
    this.loadScript('../../../assets/js/test1.js');
    this.loadScript('../../../assets/js/test2.js');
  }
  ngOnInit() {
  }
  public loadScript(url: string) {
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    this.body.appendChild(script);
    this.isloaded = true;
    setTimeout(() => {
      this.loadTopAds()
    }, 300);
  }
  public loadTopAds() {
    if (this.divId) {
      const div = document.createElement('div');
      this.renderer.setAttribute(div, 'id', this.divId);
      this.renderer.setAttribute(div, 'style', 'height: 50px; width: 320px;');
      const script = document.createElement('script');
      script.innerHTML = "googletag.cmd.push(function () { googletag.display('div-gpt-ad-1451389957496-3'); });";
      div.appendChild(script);
      this.body.appendChild(div);
    }

  }
  // runOnComplete(): void {
  //   this.onComplete.emit(this.completedParam);
  // }

}
