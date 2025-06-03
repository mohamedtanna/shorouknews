import { NgModule } from '@angular/core';
import { DecodeHtmlPipe } from './decode-html.pipe';
import { SafeScriptPipe } from './safe-script.pipe';

@NgModule({	declarations: [DecodeHtmlPipe, SafeScriptPipe], imports: [], exports: [DecodeHtmlPipe, SafeScriptPipe]
})
export class PipesModule { }