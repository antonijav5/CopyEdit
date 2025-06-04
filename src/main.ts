import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { kanbanReducer } from './app/kanban/store/reducer';
import { KanbanEffects } from './app/kanban/store/effects';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot({ 
        kanban: kanbanReducer 
      }),
      EffectsModule.forRoot([KanbanEffects]),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: false
      })
    )
  ]
}).catch(err => {
  console.error('Bootstrap failed:', err);
});