export function nullOrString(itemObject, property: string){
    if (itemObject == null || itemObject[property] == null) {
        return '';
    }

    return itemObject[property];
}
