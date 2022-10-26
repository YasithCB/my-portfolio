

/*prevent focus another field when pressing tab btn*/
$("#cusId,#cusName,#cusAddress,#cusSalary,#editCusId,#editCusName,#editCusAddress,#editCusSalary").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});
/*focus on modal starting*/
$('#addCustomer').on('shown.bs.modal', function () {
    $('#cusId').focus();
});
$('#editCustomer').on('shown.bs.modal', function () {
    $('#editCusId').focus();
});
/*focus on modal starting*/


/*edit customer start*/

/*validate all in any keyPress on anywhere on edit model*/
$("#editCusId,#editCusName,#editCusAddress,#editCusSalary").on('keyup', function () {
    validateAllFieldsOnEdit();
});

/*focus next field*/
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
/*focus next field*/

$('#btnEditCustomer').click(function () {
    if (confirm('Are you sure to Edit this Customer?') && getEditBtnState()) {
        let customer = searchCustomer(selectedRowCusId);
        /*edit*/
        customer.setId($('#editCusId').val());
        customer.setName($('#editCusName').val());
        customer.setAddress($('#editCusAddress').val());
        customer.setSalary($('#editCusSalary').val());


        $('#btnCloseCustomerEditModel').click();
        refreshCustomerTable();
    }
});

/*function to check if all fields are correct*/
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

function searchCustomer (cusId) {
    for (let customer of customers) {
        if (customer.getId() === cusId) {
            return customer;
        }
    }
    return -1;
}

/*edit customer end*/







/*delete customer start*/

$('#btnDeleteCustomer').click(function () {
    let customer = searchCustomer(selectedRowCusId);
    customers.splice(customers.indexOf(customer),1);
    $('#btnCloseCustomerEditModel').click();
    refreshCustomerTable();

});

/*delete customer end*/




/*save customer start*/
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

function setSaveBtnState(errorCount) {
    if (errorCount > 0) {
        $('#btnSaveCustomer').attr('disabled',true);
    }else {
        $('#btnSaveCustomer').attr('disabled',false);
    }
}
function getSaveBtnState() {
    return $('#btnSaveCustomer').attr('disabled') !== true;
}
/*save customer end*/


/*add sample data*/
{
    let customer= new Customer(
        'C001',
        'Yasith',
        'Opanayaka',
        49000
    );

    customers.push(customer);

    refreshCustomerTable();
    rowTrigger();
}
/*add sample data*/

/*saving customer to array*/
$("#btnSaveCustomer").click(function (){
    let customer = new Customer(
        $('#cusId').val(),
        $('#cusName').val(),
        $('#cusAddress').val(),
        $('#cusSalary').val()
    );

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
        if (customer.getId() === $('#cusId').val()){
            available = true;
            $('#cusName').val(customer.getName());
            $('#cusAddress').val(customer.getAddress());
            $('#cusSalary').val(customer.getSalary());
        }
    }
    if (!available){
        renewFields();
        alert('There are no customer like this!');
    }
});
/*search btn action*/


function rowTrigger() {
    $('#cusTable>tr').click(function (){
        /*open edit cus model*/
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
        let row = `<tr><th scope="row">${customer.getId()}</th><td>${customer.getName()}</td><td>${customer.getAddress()}</td><td>${customer.getSalary()}</td></tr>`
        $('#cusTable').append(row);
    }
}