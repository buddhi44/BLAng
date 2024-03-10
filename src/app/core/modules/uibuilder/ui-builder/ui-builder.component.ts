import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationRule } from '../../../entity/contracts/IHeaderCalculation';

import { UIObject } from '../../../entity/UIObject';
import { BLUIBuilder } from '../../../helpers/ui-builder/IBLUIDefinitons';
import { MenuService } from '../../../services/menu.service';
import { ToolButtonComponent } from '../tool-button/tool-button.component';

@Component({
    selector: 'app-ui-builder',
    templateUrl: './ui-builder.component.html',
    styleUrls: ['./ui-builder.component.scss']
})
export class UiBuilderComponent implements OnInit {



    @Input() def!: BLUIBuilder
    private formUIDefintion!: UIObject;

    arrButtonSection!: UIObject;
    arrHeaderSection1!: UIObject;
    arrDetailGrid!: UIObject;







    constructor(private activatedRoute: ActivatedRoute, private menuService: MenuService, private modalService: NgbModal) {
        // subscribe to router event


    }

    ngOnInit() {

        if (this.def === undefined) {
          
            return
        }

        this.menuService.retriveUIObject(this.def.UIObjectKey).subscribe((data) => {

            this.formUIDefintion = data;
            this.buildTree(this.formUIDefintion.children, this.def.UIObjectKey);

        });

    }

    buildTree(items: Array<any>, parentKey: number | null = null): Array<any> {

        let result: Array<any> = [];
        //result = items.map((i: any) => {
        //    return { key: i.elementKey, parentKey: i.parentKey }
        //});

        result = this.buildParentChild(items, parentKey);
        this.arrButtonSection = result.filter(x => x._internalElementName === 'ButtonSection_1')[0];
        this.arrHeaderSection1 = result.filter(x => x._internalElementName === 'HeaderSection_1')[0];
        this.arrDetailGrid = result.filter(x => x._internalElementName === 'GridSection_1')[0];
        // below should be integrated to recursive function it self;
        result.forEach((item: UIObject) => {

        });
        console.log(this.def.ValidationRules);

        return result;
    }



    buildParentChild(items: Array<UIObject>, parentKey: number | null = null): Array<UIObject> {
        let result: Array<UIObject> = [];
        for (let item of items) {
            if (item.parentKey == parentKey) {
                let childs = this.buildParentChild(items, item.elementKey)
                if (childs.length > 0) {
                    item.children = childs;
                }
                let valRules = new ValidationRule();
                valRules.internalElementName = item._internalElementName;
                valRules.IsValueMust = item.isMust;
                valRules.validationMessage = item.validationMessage;
                this.def.ValidationRules.push(valRules);
                result.push(item);
            }
        }

        return result;
    }

    LunchModal(content: any) {
       
        this.modalService.open(content);
    }





}
