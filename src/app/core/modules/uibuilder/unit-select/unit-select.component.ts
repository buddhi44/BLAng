import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { ComboRequest, UnitComboRequest } from '../../../entity/Base/comboRequest';
import { UnitResponse } from '../../../entity/Base/unitResponse';
import { UIObject } from '../../../entity/UIObject';
import { PropHelper } from '../../../helpers/propertyHelper';
import { BLUIBuilder, IUIDefinition } from '../../../helpers/ui-builder/IBLUIDefinitons';
import { UnitService } from '../../../services/unit.service';

@Component({
    selector: 'app-unit-select',
    templateUrl: './unit-select.component.html',
    styleUrls: ['./unit-select.component.scss']
})
export class UnitSelectComponent implements OnInit, OnDestroy, IUIDefinition {
    @Input() uiObject!: UIObject;
    @Input() def!: BLUIBuilder;

    selectedDataItem!: UnitResponse;
    minLengthTerm: number = 3;
    itemsLoading = false;
    searchInput = new Subject<string>();
    comdoDataSource!: Observable<UnitResponse[]>;
    comboRequest: UnitComboRequest;
    constructor(private comboDataService: UnitService) {
        this.comboRequest = new UnitComboRequest();
    }


    ngOnInit(): void {

        if (!this.def.hasComponent(this)) {
            this.def.ObjectRefs.push(this);
        }


        this.comboRequest.requestingElementKey = this.uiObject.elementKey;

        if (this.uiObject && this.uiObject.isServerFiltering) {
            this.fetchComboData(true);
        }
        let MappedItem = this.getUnitResponseByIAccessPath();
        if (this.uiObject && !this.uiObject.isServerFiltering) {

            this.LoadNonServerDataCombo();

            this.SelectDefaultValue(MappedItem);
        }
    }

    private SelectDefaultValue(MappedItem: UnitResponse) {
        this.comdoDataSource.forEach(items => {
            for (let i of items) {

                if (MappedItem && MappedItem.unitKey === i.unitKey && MappedItem.unitKey!=1) {
                    this.selectedDataItem = i;
                    break;

                }

                if (i.isDefault) {
                    this.selectedDataItem = i;
                    this.onSelectionChange(i);
                }
            }

        });
    }

    ngOnDestroy(): void {
        this.uiObject.isEnable = true;;
    }
    private LoadNonServerDataCombo() {
        this.OnBeforeUnitRead();
        this.comdoDataSource = this.comboDataService.retriveUnits(this.comboRequest);
    }

    onSelectionChange(ev: any) {

        PropHelper.updatePropertyPath(this.selectedDataItem, this.uiObject.defaultAccessPath, this.def.DataObject);

    }
    trackByFn(item: UnitResponse) {
        return item.unitKey;
    }

    getUnitResponseByIAccessPath(): UnitResponse {
        return PropHelper.getUnitResponseByAccessPath(this.def.DataObject, this.uiObject.defaultAccessPath);
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
                tap(() => this.itemsLoading = true),
                switchMap(term => {
                    this.comboRequest.searchQuery = term;
                    return this.comboDataService.retriveUnits(this.comboRequest).pipe(
                        catchError(() => of([])), // empty list on error
                        tap(() => this.itemsLoading = false)
                    )
                })
            )
        );

    }



    OnBeforeUnitRead() {

        if (this.uiObject.onBeforeComboLoad) {

            PropHelper.fireOnBeforeChangeComboEvent(this.def, this.uiObject, this.comboRequest);
        }
    }


    Disable(): void {
        this.uiObject.isEnable = false;
    }
    Enable(): void {
        this.uiObject.isEnable = true;
    }
    Reload(): void {
        this.selectedDataItem = new UnitResponse();
        this.LoadNonServerDataCombo();
        let MappedItem = this.getUnitResponseByIAccessPath();
        this.SelectDefaultValue(MappedItem);
    }

}
