
// customer regular expressions
const cusIDRegex = /^(C)[0-9]{3}$/;
const cusNameRegex = /^[A-z ]{5,20}$/;
const cusAddressRegex = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegex = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let customerValidationsOnSave = [];
customerValidationsOnSave.push({reg: cusIDRegex, field: $('#cusId'),error:'Customer ID Pattern is Wrong : C001'});
customerValidationsOnSave.push({reg: cusNameRegex, field: $('#cusName'),error:'Customer Name Pattern is Wrong : A-z 5-20'});
customerValidationsOnSave.push({reg: cusAddressRegex, field: $('#cusAddress'),error:'Customer Address Pattern is Wrong : A-z 0-9 ,/'});
customerValidationsOnSave.push({reg: cusSalaryRegex, field: $('#cusSalary'),error:'Customer Salary Pattern is Wrong : 100 or 100.00'});

let customerValidationsOnEdit = [];
customerValidationsOnEdit.push({reg: cusIDRegex, field: $('#editCusId'),error:'Customer ID Pattern is Wrong : C001'});
customerValidationsOnEdit.push({reg: cusNameRegex, field: $('#editCusName'),error:'Customer Name Pattern is Wrong : A-z 5-20'});
customerValidationsOnEdit.push({reg: cusAddressRegex, field: $('#editCusAddress'),error:'Customer Address Pattern is Wrong : A-z 0-9 ,/'});
customerValidationsOnEdit.push({reg: cusSalaryRegex, field: $('#editCusSalary'),error:'Customer Salary Pattern is Wrong : 100 or 100.00'});

/*validate all in any keyPress on anywhere on edit model*/
$("#editCusId,#editCusName,#editCusAddress,#editCusSalary").on('keyup', function (event) {
    validateAllFieldsOnEdit();
});

/*focus next field by enter edit model*/
$("#editCusId").on('keydown', function (event) {
    if (event.key === "Enter" && check(cusIDRegex,$('#editCusId')) ) {
        $('#editCusName').focus();
    }else {
        $('#editCusId').focus();
    }
});
$("#editCusName").on('keydown', function (event) {
    if (event.key === "Enter" && check(cusNameRegex,$('#editCusName')) ) {
        $('#editCusAddress').focus();
    }else {
        $('#editCusName').focus();
    }
});
$("#editCusAddress").on('keydown', function (event) {
    if (event.key === "Enter" && check(cusAddressRegex,$('#editCusAddress')) ) {
        $('#editCusSalary').focus();
    }else {
        $('#editCusAddress').focus();
    }
});
$("#editCusSalary").on('keydown', function (event) {
    if (event.key === "Enter" && check(cusSalaryRegex,$('#editCusSalary'))) {
        $('#btnEditCustomer').click();
        $('#editCusId').focus();
    }
});
/*focus next field by enter edit model*/

/*function to check if all fields are correct in edit model*/
function validateAllFieldsOnEdit() {
    let errorCount= 0;
    for (let validation of customerValidationsOnEdit) {
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
        $('#btnEditCustomer').attr('disabled',true);
    }else {
        $('#btnEditCustomer').attr('disabled',false);
    }
}
function getEditBtnState() {
    return $('#btnEditCustomer').attr('disabled') !== true;
}

$('#btnEditCustomer').click(function () {
    if (confirm('Are you sure to Edit this Customer?') && getEditBtnState()) {
        let customer = searchCustomer(selectedRowCusId);
        /*edit*/
        customer.id = $('#editCusId').val();
        customer.name = $('#editCusName').val();
        customer.address = $('#editCusAddress').val();
        customer.salary = $('#editCusSalary').val();


        $('#btnCloseCustomerEditModel').click();
        refreshCustomerTable();
    }
});

function searchCustomer (cusId) {
    for (let customer of customers) {
        if (customer.id === cusId) {
            return customer;
        }
    }
    return -1;
}

/*delete btn*/
$('#btnDeleteCustomer').click(function () {
    let customer = searchCustomer(selectedRowCusId);
    customers.splice(customers.indexOf(customer),1);
    $('#btnCloseCustomerEditModel').click();
    refreshCustomerTable();

});




/*prevent focus another field when pressing tab btn*/
$("#cusId,#cusName,#cusAddress,#cusSalary").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

/*validate all in any keyPress on anywhere on save model*/
$("#cusId,#cusName,#cusAddress,#cusSalary").on('keyup', function (event) {
    validateAllFieldsOnSave();
});

/*focus next field by enter save model*/
$("#cusId").on('keydown', function (event) {
    if (event.key === "Enter" && check(cusIDRegex,$('#cusId')) ) {
        $('#cusName').focus();
    }else {
        $('#cusId').focus();
    }
});
$("#cusName").on('keydown', function (event) {
    if (event.key === "Enter" && check(cusNameRegex,$('#cusName')) ) {
        $('#cusAddress').focus();
    }else {
        $('#cusName').focus();
    }
});
$("#cusAddress").on('keydown', function (event) {
    if (event.key === "Enter" && check(cusAddressRegex,$('#cusAddress')) ) {
        $('#cusSalary').focus();
    }else {
        $('#cusAddress').focus();
    }
});
$("#cusSalary").on('keydown', function (event) {
    if (event.key === "Enter" && check(cusSalaryRegex,$('#cusSalary'))) {
        if (confirm('Are you sure to add this Customer?') && getSaveBtnState()) {
            $('#btnSaveCustomer').click();
            $('#cusId').focus();
        }
    }
});
/*focus next field by enter save model*/

/*function to check if all fields are correct in save model*/
function validateAllFieldsOnSave() {
    let errorCount= 0;
    for (let validation of customerValidationsOnSave) {
        if (check(validation.reg,validation.field)) {
            makeFieldAsCorrect(validation.field,"");
        }else {
            errorCount++;
            makeFieldAsError(validation.field, validation.error);
        }
    }
    setSaveBtnState(errorCount);
}

function check(reg,field){
    let value = field.val();
    return reg.test(value);
}

function setSaveBtnState(errorCount) {
    if (errorCount > 0) {
        $('#btnSaveCustomer').attr('disabled',true);
    }else {
        $('#btnSaveCustomer').attr('disabled',false);
    }
}
function getSaveBtnState() {
    if ($('#btnSaveCustomer').attr('disabled') === true) {
        return false;
    }else {
        return true;
    }
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


let customers = [];

$('#addCustomer').on('shown.bs.modal', function () {
    $('#cusId').focus();
});
$('#editCustomer').on('shown.bs.modal', function () {
    $('#editCusId').focus();
});

/*add sample data*/
{
    var customer = {
        id : 'C001',
        name : 'Yasith',
        address : 'Opanayaka',
        salary : 49000
    }
    customers.push(customer);

    refreshCustomerTable();
    rowTrigger();
}
/*add sample data*/

/*saving customer to array*/
$("#btnSaveCustomer").click(function (){
    let customer = {
        id: $('#cusId').val(),
        name: $('#cusName').val(),
        address: $('#cusAddress').val(),
        salary: $('#cusSalary').val(),
    };
    customers.push(customer);
    renewFields();
    refreshCustomerTable();
    rowTrigger();
});
/*saving customer to array*/

/*renew fields*/
$('#btnRenew').click(function (){
    renewFields();
});
/*renew fields*/

/*search btn action*/
$('#btnSearchCustomer').click(function (){
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
});
/*search btn action*/

function renewFields () {
    $('#cusId').val('');
    $('#cusName').val('');
    $('#cusAddress').val('');
    $('#cusSalary').val('');

    $('#editCusId').val('');
    $('#editCusName').val('');
    $('#editCusAddress').val('');
    $('#editCusSalary').val('');
}

var selectedRowCusId = '';
function rowTrigger() {
    $('#cusTable>tr').click(function (){
        /*open edit cus model*/
        console.log('clicked')
        $('#btnEditDeleteCustomer').click();
        selectedRowCusId = $(this).children().eq(0).text();

        $('#editCusId').val(selectedRowCusId);
        $('#editCusName').val($(this).children().eq(1).text());
        $('#editCusAddress').val($(this).children().eq(2).text());
        $('#editCusSalary').val($(this).children().eq(3).text());


    });
}

function refreshCustomerTable(){
    $('#cusTable').empty();

    for (let customer of customers) {
        let row = `<tr><th scope="row">${customer.id}</th><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`
        $('#cusTable').append(row);
    }
}