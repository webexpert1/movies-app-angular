import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderComponent, AutocompleteComponent],
  exports: [HeaderComponent],
})
export class SharedModule {}
