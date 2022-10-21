import { Component, ViewChild, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrls: ['./2020.component.css']
})
export class TableComponent implements OnInit {

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'opciones'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor() { }

  ngOnInit(): void {

  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  opciones: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', opciones: 'g'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', opciones: 'g'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', opciones: 'g'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', opciones: 'g'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', opciones: 'h'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', opciones: 'h'},
  {position: 7, name: 'Banco', weight: 14.0067, symbol: 'N', opciones: ''},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', opciones: 'r'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', opciones: 'tr'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', opciones: 'rt'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', opciones: 'rt'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', opciones: 'rte'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', opciones: 'e'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', opciones: 'e'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', opciones: 'h'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', opciones: 'h'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', opciones: 'r'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', opciones: 'tr'},
];
