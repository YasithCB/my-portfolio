
// customer regular expressions
const itemCodeRegex = /^(I)[0-9]{3}$/;
const itemNameRegex = /^[A-z ]{3,20}$/;
const itemPriceRegex = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemQtyRegex = /^[0-9]{1,}[.]?[0-9]{1,3}$/;

let itemsValidationOnSave = [];
itemsValidationOnSave.push({reg: itemCodeRegex, field: $('#itemCode'),error:'Item Code Pattern is Wrong : I001'});
itemsValidationOnSave.push({reg: itemNameRegex, field: $('#itemName'),error:'Item name Pattern is Wrong : A-z 5-20'});
itemsValidationOnSave.push({reg: itemPriceRegex, field: $('#itemPrice'),error:'Item price Pattern is Wrong : 100 or 100.00'});
itemsValidationOnSave.push({reg: itemQtyRegex, field: $('#itemQty'),error:'item qty Pattern is Wrong : 100 or 100.5'});

let itemsValidationOnEdit = [];
itemsValidationOnEdit.push({reg: itemCodeRegex, field: $('#editItemCode'),error:'Item Code Pattern is Wrong : I001'});
itemsValidationOnEdit.push({reg: itemNameRegex, field: $('#editItemName'),error:'Item name Pattern is Wrong : A-z 5-20'});
itemsValidationOnEdit.push({reg: itemPriceRegex, field: $('#editItemPrice'),error:'Item price Pattern is Wrong : 100 or 100.00'});
itemsValidationOnEdit.push({reg: itemQtyRegex, field: $('#editItemQty'),error:'item qty Pattern is Wrong : 100 or 100.5'});

/*prevent focus another field when pressing tab btn*

 */
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

/*common functions started*/
function check(reg,field){
    let value = field.val();
    return reg.test(value);
}

function makeFieldAsCorrect(field,error) {
    if (field.val().length <= 0) {
        defaultText(field,error);
    }else {
        correctText(field,error);
    }
}
function makeFieldAsError(field,error) {
    if (field.val().length <= 0) {
        defaultText(field,"");
    }else {
        errorText(field,error);
    }
}

function errorText(field,error) {
    field.css('border','1px solid red');
    field.parent().children('span').text(error);
}

function correctText(field,error) {
    field.css('border','1px solid green');
    field.parent().children('span').text(error);
}

function defaultText(field,error) {
    field.css("border",'1px solid white');
    field.parent().children('span').text(error);
}
/*common functions end*/






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
        item.code = $('#editItemCode').val();
        item.name = $('#editItemName').val();
        item.price = $('#editItemPrice').val();
        item.qty = $('#editItemQty').val();

        $('#btnCloseEditItemModal').click();
        refreshItemTable();
        rowTrigger();
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
        if (item.code === code) {
            return item;
        }
    }
    return -1;
}

/*edit customer end*/







/*delete customer start*/

$('#btnDeleteItem').click(function () {
    let item = searchItem(selectedRowItemCode);
    items.splice(items.indexOf(item),1);
    $('#btnCloseEditItemModal').click();
    refreshItemTable();

});

/*delete customer end*/




/*save customer start*/
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





let items = [];

/*add sample data*/
{
    var item = {
        code : 'I001',
        name : 'Soap',
        price : 200,
        qty : 60
    }
    items.push(item);

    refreshItemTable();
    rowTrigger();
}
/*add sample data*/

/*saving items to array*/
$("#btnSaveItem").click(function (){
    let item = {
        code: $('#itemCode').val(),
        name: $('#itemName').val(),
        price: $('#itemPrice').val(),
        qty: $('#itemQty').val(),
    };
    items.push(item);
    renewFields();
    refreshItemTable();
    rowTrigger();
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

function renewFields () {
    $('#itemCode').val('');
    $('#itemName').val('');
    $('#itemPrice').val('');
    $('#itemQty').val('');

    $('#editItemCode').val('');
    $('#editItemName').val('');
    $('#editItemPrice').val('');
    $('#editItemQty').val('');
}

var selectedRowItemCode = '';
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
        let row = `<tr><th scope="row">${item.code}</th><td>${item.name}</td><td>${item.price}</td><td>${item.qty}</td></tr>`
        $('#itemTable').append(row);
    }
}