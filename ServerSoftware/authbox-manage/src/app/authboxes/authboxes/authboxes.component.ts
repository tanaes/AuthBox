import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthboxCreateComponent } from '../authbox-create/authbox-create.component';
import { AuthboxEditComponent } from '../authbox-edit/authbox-edit.component';
import { ApiService } from '../../api.service';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-auth-boxes',
  templateUrl: './authboxes.component.html',
  styleUrls: ['./authboxes.component.scss']
})
export class AuthBoxesComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource();
  constructor(
    public dialog: MatDialog,
    public apiSrvc: ApiService
  ) {
    this.refreshAuthBoxes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  refreshAuthBoxes() {
    this.apiSrvc.getAuthBoxes()
    .then((authboxes) => {
      this.dataSource.data = authboxes;
    })
    .catch((err) => {
      console.error(err);
    });
  }

  newAuthbox() {
    const dialogRef = this.dialog.open(AuthboxCreateComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.apiSrvc.createAuthBox(result)
        .then(() => {
          console.log('Success');
          this.refreshAuthBoxes();
        })
        .catch((err) => {
          console.error(err);
        });
      }
    });
  }

  editAuthBox(authbox) {
    const dialogRef = this.dialog.open(AuthboxEditComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  rowSelected(row) {
    console.log(row);
  }
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];