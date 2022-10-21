import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';


@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatDividerModule,
        DragDropModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
    ],
    exports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatDividerModule,
        DragDropModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule
    ],
})
export class MaterialModule { }
