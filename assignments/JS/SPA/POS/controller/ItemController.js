

/*prevent focus another field when pressing tab btn*/
$("#itemCode,#itemName,#itemPrice,#itemQty,#editItemCode,#editItemName,#editItemPrice,#editItemQty").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});
/*focus on modal starting*/
$('#addItem').on('shown.bs.modal', function () {
    $('#itemCode').focus();
});
$('#editItem').on('shown.bs.modal', function () {
    $('#editItemCode').focus();
});
/*focus on modal starting*/





/*edit items start*/

/*validate all in any keyPress on anywhere on edit model*/
$("#editItemCode,#editItemName,#editItemPrice,#editItemQty").on('keyup', function () {
    validateAllFieldsOnEdit();
});

/*focus next field*/
$("#editItemCode").on('keydown', function (event) {
    if (event.key === "Enter" && check(itemCodeRegex,$('#editItemCode')) ) {
        $('#editItemName').focus();
    }else {
        $('#editItemCode').focus();
    }
});
$("#editItemName").on('keydown', function (event) {
    if (event.key === "Enter" && check(itemNameRegex,$('#editItemName')) ) {
        $('#editItemPrice').focus();
    }else {
        $('#editItemName').focus();
    }
});
$("#editItemPrice").on('keydown', function (event) {
    if (event.key === "Enter" && check(itemPriceRegex,$('#editItemPrice')) ) {
        $('#editItemQty').focus();
    }else {
        $('#editItemPrice').focus();
    }
});
$("#editItemQty").on('keydown', function (event) {
    if (event.key === "Enter" && check(itemQtyRegex,$('#editItemQty'))) {
        $('#btnEditItem').click();
    }
});
/*focus next field*/

$('#btnEditItem').click(function () {
    if (confirm('Are you sure to Edit this Item?') && getEditBtnState()) {
        let item = searchItem(selectedRowItemCode);
        /*edit*/
        item.setCode($('#editItemCode').val());
        item.setName($('#editItemName').val());
        item.setPrice($('#editItemPrice').val());
        item.setQty($('#editItemQty').val());

        $('#btnCloseEditItemModal').click();
        refreshItemTable();
        rowTrigger();

        loadItemDropdown();
    }
});

/*function to check if all fields are correct*/
function validateAllFieldsOnEdit() {
    let errorCount= 0;
    for (let validation of itemsValidationOnEdit) {
        if (check(validation.reg,validation.field)) {
            makeFieldAsCorrect(validation.field,"");
        }else {
            errorCount++;
            makeFieldAsError(validation.field, validation.error);
        }
    }
    setEditBtnState(errorCount);
}

function setEditBtnState(errorCount) {
    if (errorCount > 0) {
        $('#btnEditItem').attr('disabled',true);
    }else {
        $('#btnEditItem').attr('disabled',false);
    }
}

function getEditBtnState() {
    return $('#btnEditItem').attr('disabled') !== true;
}

function searchItem (code) {
    for (let item of items) {
        if (item.getCode() === code) {
            return item;
        }
    }
    return -1;
}

/*edit item end*/



/*delete item start*/

$('#btnDeleteItem').click(function () {
    if (confirm('Are you sure to delete this Item?')) {
        let item = searchItem(selectedRowItemCode);
        items.splice(items.indexOf(item),1);
        $('#btnCloseEditItemModal').click();
        refreshItemTable();
    }

});

/*delete item end*/



/*save item start*/
/*validate all in any keyPress on anywhere on save model*/
$("#itemCode,#itemName,#itemPrice,#itemQty").on('keyup', function () {
    validateAllFieldsOnSave();
});

/*focus next field by enter save model*/
$("#itemCode").on('keydown', function (event) {
    if (event.key === "Enter" && check(itemCodeRegex,$('#itemCode')) ) {
        $('#itemName').focus();
    }else {
        $('#itemCode').focus();
    }
});
$("#itemName").on('keydown', function (event) {
    if (event.key === "Enter" && check(itemNameRegex,$('#itemName')) ) {
        $('#itemPrice').focus();
    }else {
        $('#itemName').focus();
    }
});
$("#itemPrice").on('keydown', function (event) {
    if (event.key === "Enter" && check(itemPriceRegex,$('#itemPrice')) ) {
        $('#itemQty').focus();
    }else {
        $('#itemPrice').focus();
    }
});
$("#itemQty").on('keydown', function (event) {
    console.log(check(itemQtyRegex,$('#itemQty')));
    if (event.key === "Enter" && check(itemQtyRegex,$('#itemQty'))) {
        if (confirm('Are you sure to add this Item?') && getSaveBtnState()) {
            $('#btnSaveItem').click();
            $('#itemCode').focus();
        }
    }
});
/*focus next field by enter save model*/

/*function to check if all fields are correct in save model*/
function validateAllFieldsOnSave() {
    let errorCount= 0;
    for (let validation of itemsValidationOnSave) {
        if (check(validation.reg,validation.field)) {
            makeFieldAsCorrect(validation.field,"");
        }else {
            errorCount++;
            makeFieldAsError(validation.field, validation.error);
        }
    }
    setSaveBtnState(errorCount);
}

function setSaveBtnState(errorCount) {
    if (errorCount > 0) {
        $('#btnSaveItem').attr('disabled',true);
    }else {
        $('#btnSaveItem').attr('disabled',false);
    }
}
function getSaveBtnState() {
    return $('#btnSaveItem').attr('disabled') !== true;
}
/*save Item end*/



/*add sample data*/
{
    var item = new Item(
        'I001',
        'Soap',
        200,
        60
    );
    items.push(item);

    refreshItemTable();
    rowTrigger();
}
/*add sample data*/

/*saving items to array*/
$("#btnSaveItem").click(function (){
    let item = new Item(
        $('#itemCode').val(),
        $('#itemName').val(),
        $('#itemPrice').val(),
        $('#itemQty').val()
    );
    items.push(item);
    renewFields();
    refreshItemTable();
    rowTrigger();

    loadItemDropdown();
});
/*saving items to array*/

/*renew fields*/
$('.btnRenew').click(function (){
    renewFields();
});
/*renew fields*/

/*search btn action*/
/*$('#btnSearchCustomer').click(function (){
    let available = false;
    for (let customer of customers) {
        if (customer.id === $('#cusId').val()){
            available = true;
            $('#cusName').val(customer.name);
            $('#cusAddress').val(customer.address);
            $('#cusSalary').val(customer.salary);
        }
    }
    if (!available){
        renewFields();
        alert('There are no customer like this!');
    }
});*/
/*search btn action*/

function rowTrigger() {
    $('#itemTable>tr').click(function (){
        /*open edit item model*/
        $('#btnEditDeleteItem').click();
        selectedRowItemCode = $(this).children().eq(0).text();

        $('#editItemCode').val(selectedRowItemCode);
        $('#editItemName').val($(this).children().eq(1).text());
        $('#editItemPrice').val($(this).children().eq(2).text());
        $('#editItemQty').val($(this).children().eq(3).text());
    });
}

function refreshItemTable(){
    $('#itemTable').empty();

    for (let item of items) {
        let row = `<tr><th scope="row">${item.getCode()}</th><td>${item.getName()}</td><td>${item.getPrice()}</td><td>${item.getQty()}</td></tr>`
        $('#itemTable').append(row);
    }
}