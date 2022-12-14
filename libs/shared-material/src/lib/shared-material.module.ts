import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import { IconModule } from '@visurel/iconify-angular'; 
import { MatTooltipModule } from '@angular/material/tooltip';

import {BadgeModule} from 'primeng/badge';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTooltipModule,
    IconModule,
    BadgeModule,
    CarouselModule,
    ButtonModule,
    SwiperModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTooltipModule,
    IconModule,
    BadgeModule,
    CarouselModule,
    ButtonModule,
    SwiperModule
  ]
})
export class SharedMaterialModule {}
