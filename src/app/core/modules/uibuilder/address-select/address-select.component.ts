import { Component, Input, OnInit } from '@angular/core';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { AddressResponse } from '../../../entity/Base/addressResponse';
import { UIObject } from '../../../entity/UIObject';
import { PropHelper } from '../../../helpers/propertyHelper';
import { BLUIBuilder } from '../../../helpers/ui-builder/IBLUIDefinitons';
import { AddressService } from '../../../services/address.service';

@Component({
  selector: 'app-address-select',
  templateUrl: './address-select.component.html',
  styleUrls: ['./address-select.component.scss']
})
export class AddressSelectComponent implements OnInit {

    @Input() uiObject!: UIObject;
    @Input() def!: BLUIBuilder;

    selectedDataItem!: AddressResponse
    minLengthTerm: number = 3;
    addressLoading = false;
    searchInput = new Subject<string>();
    addressRecords!: Observable<AddressResponse[]>;
    constructor(private addressService: AddressService) {

    }

    ngOnInit(): void {
        if (this.uiObject && this.uiObject.isServerFiltering) {
            this.fetchComboData(true);
        }

        if (this.uiObject && !this.uiObject.isServerFiltering) {
            this.addressRecords = this.addressService.retriveAddessResponses(this.uiObject.elementKey, '');
        }
    }
    onSelectionChange(ev: any) {
        if (PropHelper.isValidComboSelection(this.selectedDataItem)) {
            this.selectedDataItem = new AddressResponse();
        }
        PropHelper.isValidComboSelection(this.selectedDataItem);
        this.def.DataObject[this.uiObject.defaultAccessPath] = this.selectedDataItem;

    }
    trackByFn(item: AddressResponse) {
        return item.addressKey;
    }

    fetchComboData(firstLoad=false) {
        this.addressRecords = concat(
            of([]), // default items
            this.searchInput.pipe(
                filter(res => {
                    return res !== null && res.length >= this.minLengthTerm
                }),
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => this.addressLoading = true),
                switchMap(term => {
                    return this.addressService.retriveAddessResponses(this.uiObject.elementKey, term).pipe(
                        catchError(() => of([])), // empty list on error
                        tap(() => this.addressLoading = false)
                    )
                })
            )
        );

    }



}
