export const verifyIfExists = (array: any[], id: number): boolean => {
    const itemExists = array.at(id);
    if(itemExists) return true;
    return false;
}

export const verifyIfTagExistsCreation = (array: any[], tag: any): boolean => {
    const filteredArray = array.filter((element) => element.tag == tag);
    if(filteredArray.length == 0)
        return false;
    return true;
}