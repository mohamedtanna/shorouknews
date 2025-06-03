import { Pipe, PipeTransform, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'decodeHtml'
})
export class DecodeHtmlPipe implements PipeTransform {
  // @ViewChild('dynamic') dynamic: ElementRef;
  result: string;
  constructor(private sanitized: DomSanitizer, private render: Renderer2) { }
  transform(value: string, el: ElementRef) {
    if (el) {
      this.enableDynamicHyperlinks(el);
    }
    if (value) {
      return this.decodeHTML(value);
    }
  }
  decodeHTML(html) {
    const txtArea = document.createElement('textarea');

    txtArea.innerHTML = html;
    return this.sanitized.bypassSecurityTrustHtml(txtArea.value);
  }
  // ======================================================================
  enableDynamicHyperlinks(elem: ElementRef): void {

    // Provide a minor delay to allow the HTML to be rendered and 'found'
    // within the view template
    console.log('enableDynamicHyperlinks');
    setTimeout(() => {
      const containers = elem.nativeElement.querySelectorAll('.dynamic-links');
      Array.from(containers).forEach(c => {
        const element = c as HTMLElement;
        const urls = (c as HTMLElement).querySelectorAll('a');
        Array.from(urls).forEach((url) => {
          console.log('------------------------------>', url);
          url.addEventListener('click', (event) => {
            console.log('sssssssssaaaaaaaaaaaaaa')
            event.preventDefault();
            const link = url.getAttribute('href');
            this.launchInAppBrowser(link);
          }, false);
        });
      });
    }, 2000);
  }
  launchInAppBrowser(link: string): void {
    navigator['app'].loadUrl(link, {
      openExternal: true
    });
  }
}
