import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {globalReducer} from './+states/global.reducer';
import {GlobalEffects} from './+states/global.effects';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({global: globalReducer}),
    EffectsModule.forRoot([GlobalEffects])
  ]
})
export class GlobalModule { }
