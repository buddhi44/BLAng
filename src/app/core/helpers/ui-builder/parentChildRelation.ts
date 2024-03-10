import { ValidationRule } from "../../entity/contracts/IHeaderCalculation";
import { UIObject } from "../../entity/UIObject";



export class ParentChildHelper {

    private static instance?: ParentChildHelper;

    private constructor() {

    }

    static getDefaultInstance() {
        if (ParentChildHelper.instance === undefined) {
            ParentChildHelper.instance = new ParentChildHelper();
        }
        return ParentChildHelper.instance;
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
                result.push(item);
            }
        }

        return result;
    }
}