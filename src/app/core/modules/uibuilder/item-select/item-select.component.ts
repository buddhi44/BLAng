import { Component, Input } from '@angular/core';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { ItemResponse } from '../../../entity/Base/itemResponse';
import { UIObject } from '../../../entity/UIObject';
import { PropHelper } from '../../../helpers/propertyHelper';
import { BLUIBuilder } from '../../../helpers/ui-builder/IBLUIDefinitons';
import { ItemService } from '../../../services/item.service';
@Component({
    selector: 'app-item-select',
    templateUrl: './item-select.component.html',
    styleUrls: ['./item-select.component.scss']
})
export class ItemSelectComponent {
    @Input() uiObject!: UIObject;
    @Input() def!: BLUIBuilder;

    selectedDataItem!: ItemResponse;
    minLengthTerm: number = 3;
    moviesLoading = false;
    searchInput = new Subject<string>();
    comdoDataSource!: Observable<ItemResponse[]>;
    constructor(private comboDataService: ItemService) {

    }

    ngOnInit(): void {


        ; if (this.uiObject && this.uiObject.isServerFiltering) {
            this.fetchComboData(true);
        }

        if (this.uiObject && !this.uiObject.isServerFiltering) {
            this.comdoDataSource = this.comboDataService.retriveItemsForTransaction(this.uiObject.elementKey, '');

            let MappedItem = this.getItemReponseByAccessPath();


            this.comdoDataSource.forEach(items => {



                for (let i of items) {

                    if (MappedItem && MappedItem.itemKey === i.itemKey) {
                        this.selectedDataItem = i;
                        break;
                        //   this.onSelectionChange(i);
                    }
                    if (i.isDefault) {
                        this.selectedDataItem = i;
                        this.onSelectionChange(i);
                    }

                    
                }

            })
        }
    }
    onSelectionChange(ev: any) {
        PropHelper.updatePropertyPath(this.selectedDataItem, this.uiObject.defaultAccessPath, this.def.DataObject);
        PropHelper.fireComboChnageEvent(this.def, this.uiObject, ev);
      
    }

    getObjectValByPath(data: any, key: string): any {

    }

    getItemReponseByAccessPath(): ItemResponse {
        return PropHelper.getItemReponseByAccessPath(this.def.DataObject, this.uiObject.defaultAccessPath);
    }

    trackByFn(item: ItemResponse) {
        return item.itemKey;
    }




    fetchComboData(firstLoad = false) {
        this.comdoDataSource = concat(
            of([]), // default items
            this.searchInput.pipe(
                filter(res => {
                    return res !== null && res.length >= this.minLengthTerm
                }),
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => this.moviesLoading = true),
                switchMap(term => {
                    return this.comboDataService.retriveItemsForTransaction(this.uiObject.elementKey, term).pipe(
                        catchError(() => of([])), // empty list on error
                        tap(() => this.moviesLoading = false)
                    )
                })
            )
        );

    }
}
