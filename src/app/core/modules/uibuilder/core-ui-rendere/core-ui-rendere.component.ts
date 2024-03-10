import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UIObject } from '../../../entity/UIObject';
import { BLUIBuilder } from '../../../helpers/ui-builder/IBLUIDefinitons';
import { ParentChildHelper } from '../../../helpers/ui-builder/parentChildRelation';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-core-ui-rendere',
  templateUrl: './core-ui-rendere.component.html',
  styleUrls: ['./core-ui-rendere.component.scss']
})
export class CoreUiRendereComponent implements OnInit {
  
    @Input() def!: BLUIBuilder
    public formUIDefintion!: UIObject;
    
    public arrButtonSection!: UIObject;
    public arrHeaderSection!:UIObject;

    public treeForm!: Array<UIObject>


    constructor(private activatedRoute: ActivatedRoute, private menuService: MenuService, private modalService: NgbModal) { }

    ngOnInit(): void {
        this.menuService.retriveUIObject(this.def.UIObjectKey).subscribe((data) => {

            this.formUIDefintion = data;
            this.treeForm = ParentChildHelper.getDefaultInstance().buildParentChild(data.children, this.def.UIObjectKey);
            this.arrHeaderSection = this.treeForm.filter(x => x._internalElementName === 'HeaderSection_1')[0];
            console.log(this.treeForm);
        });
    }




}
