import { Component, Input, OnInit } from '@angular/core';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { AddressResponse } from '../../../entity/Base/addressResponse';
import { CodeBaseResponse } from '../../../entity/Base/codeBaseReponse';
import { UIObject } from '../../../entity/UIObject';
import { BLUIBuilder } from '../../../helpers/ui-builder/IBLUIDefinitons';
import { CodeBaseService } from '../../../services/code-base.service';

@Component({
  selector: 'app-codeBase-select',
    templateUrl: './codeBase-select.component.html',
    styleUrls: ['./codeBase-select.component.scss']
})
export class CodeBaseSelectComponent implements OnInit {

    @Input() uiObject!: UIObject;
    @Input() def!: BLUIBuilder;

    selectedDataItem!: CodeBaseResponse;
    minLengthTerm: number = 3;
    moviesLoading = false;
    searchInput = new Subject<string>();
    codeBaseResponses!: Observable<CodeBaseResponse[]>;
    constructor(private codeBaseService: CodeBaseService) {

    }

    ngOnInit(): void {
        if (this.uiObject && this.uiObject.isServerFiltering) {
            this.fetchComboData(true);
        }

        if (this.uiObject && !this.uiObject.isServerFiltering) {
            this.codeBaseResponses = this.codeBaseService.retriveCodeBaseResponse(this.uiObject.elementKey, '');
            this.codeBaseResponses.forEach(items => {
                for (let i of items) {
                    if (i.isDefault) {
                        this.selectedDataItem = i;
                        this.onSelectionChange(i);
                    }
                }

            })
        }
    }
    onSelectionChange(ev: any) {

        this.def.DataObject[this.uiObject.defaultAccessPath] = this.selectedDataItem;

    }
    trackByFn(item: CodeBaseResponse) {
        return item.codeKey;
    }

    fetchComboData(firstLoad=false) {
        this.codeBaseResponses = concat(
            of([]), // default items
            this.searchInput.pipe(
                filter(res => {
                    return res !== null && res.length >= this.minLengthTerm
                }),
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => this.moviesLoading = true),
                switchMap(term => {
                    return this.codeBaseService.retriveCodeBaseResponse(this.uiObject.elementKey, term).pipe(
                        catchError(() => of([])), // empty list on error
                        tap(() => this.moviesLoading = false)
                    )
                })
            )
        );

    }



}
