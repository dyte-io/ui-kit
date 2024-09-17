import { NgModule } from '@angular/core';
import { defineCustomElements } from '@dytesdk/ui-kit/loader';

import { DIRECTIVES } from './stencil-generated';

defineCustomElements(window);

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [],
  exports: [...DIRECTIVES],
})
export class DyteComponentsModule {}
