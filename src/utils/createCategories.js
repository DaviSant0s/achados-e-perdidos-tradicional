const createCategories = (categories, parentId="") => {

    const categoryList = [];
    let category;
    if (parentId === ""){
        category = categories.filter(cat => cat.parentId === "");
    } else{
        category = categories.filter(cat => cat.parentId === parentId); 
    }

    for (cat of category){
        categoryList.push({
            id: cat.id,
            name: cat.name,
            parentId: cat.parentId,
            children: createCategories(categories, cat.id)
        });
    }

    return categoryList;
}

module.exports = {
    createCategories
}