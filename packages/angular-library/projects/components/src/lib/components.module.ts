import { APP_INITIALIZER, NgModule } from '@angular/core';
import { defineCustomElements } from '@dytesdk/ui-kit/loader';
import { DIRECTIVES } from './stencil-generated';

@NgModule({
  exports: [...DIRECTIVES],
  imports: [...DIRECTIVES],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => defineCustomElements,
      multi: true,
    },
  ],
})
export class DyteComponentsModule {}
