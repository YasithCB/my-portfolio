

/*customer details start*/
var customers = [];
var selectedRowCusId = '';

// customer regular expressions
const cusIDRegex = /^(C)[0-9]{3}$/;
const cusNameRegex = /^[A-z ]{5,20}$/;
const cusAddressRegex = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegex = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

var customerValidationsOnSave = [];
customerValidationsOnSave.push({reg: cusIDRegex, field: $('#cusId'),error:'Customer ID Pattern is Wrong : C001'});
customerValidationsOnSave.push({reg: cusNameRegex, field: $('#cusName'),error:'Customer Name Pattern is Wrong : A-z 5-20'});
customerValidationsOnSave.push({reg: cusAddressRegex, field: $('#cusAddress'),error:'Customer Address Pattern is Wrong : A-z 0-9 ,/'});
customerValidationsOnSave.push({reg: cusSalaryRegex, field: $('#cusSalary'),error:'Customer Salary Pattern is Wrong : 100 or 100.00'});

var customerValidationsOnEdit = [];
customerValidationsOnEdit.push({reg: cusIDRegex, field: $('#editCusId'),error:'Customer ID Pattern is Wrong : C001'});
customerValidationsOnEdit.push({reg: cusNameRegex, field: $('#editCusName'),error:'Customer Name Pattern is Wrong : A-z 5-20'});
customerValidationsOnEdit.push({reg: cusAddressRegex, field: $('#editCusAddress'),error:'Customer Address Pattern is Wrong : A-z 0-9 ,/'});
customerValidationsOnEdit.push({reg: cusSalaryRegex, field: $('#editCusSalary'),error:'Customer Salary Pattern is Wrong : 100 or 100.00'});
/*customer details end*/



/*item details start*/
var items = [];
var selectedRowItemCode = '';

// item regular expressions
const itemCodeRegex = /^(I)[0-9]{3}$/;
const itemNameRegex = /^[A-z ]{3,20}$/;
const itemPriceRegex = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemQtyRegex = /^[1-9]*[.]?[0-9]{1,3}$/;

var itemsValidationOnSave = [];
itemsValidationOnSave.push({reg: itemCodeRegex, field: $('#itemCode'),error:'Item Code Pattern is Wrong : I001'});
itemsValidationOnSave.push({reg: itemNameRegex, field: $('#itemName'),error:'Item name Pattern is Wrong : A-z 5-20'});
itemsValidationOnSave.push({reg: itemPriceRegex, field: $('#itemPrice'),error:'Item price Pattern is Wrong : 100 or 100.00'});
itemsValidationOnSave.push({reg: itemQtyRegex, field: $('#itemQty'),error:'item qty Pattern is Wrong : 100 or 100.5'});

var itemsValidationOnEdit = [];
itemsValidationOnEdit.push({reg: itemCodeRegex, field: $('#editItemCode'),error:'Item Code Pattern is Wrong : I001'});
itemsValidationOnEdit.push({reg: itemNameRegex, field: $('#editItemName'),error:'Item name Pattern is Wrong : A-z 5-20'});
itemsValidationOnEdit.push({reg: itemPriceRegex, field: $('#editItemPrice'),error:'Item price Pattern is Wrong : 100 or 100.00'});
itemsValidationOnEdit.push({reg: itemQtyRegex, field: $('#editItemQty'),error:'item qty Pattern is Wrong : 100 or 100.5'});
/*item details end*/


/*order details start*/
var orders = [];
var selectedRowOrderId = '';

/*order regex*/
const orderIdRegex = /^(OD)[0-9]{3}$/;
/*order details end*/

/*PO details start*/
var cartItems = [];
var selectedRowOnCart = '';

var POValidation = [];
POValidation.push({reg: orderIdRegex, field: $('#orderIdOnPO'),error:'Order ID Pattern is Wrong : OD001'})
POValidation.push({reg: cusIDRegex, field: $('#cusIdOnPO'),error:'Customer ID Pattern is Wrong : C001'})
POValidation.push({reg: cusNameRegex, field: $('#cusNameOnPO'),error:'Customer Name Pattern is Wrong : A-z 5-20'});
POValidation.push({reg: cusSalaryRegex, field: $('#salaryOnPO'),error:'Customer Salary Pattern is Wrong : 100 or 100.00'});
POValidation.push({reg: cusAddressRegex, field: $('#addressOnPO'),error:'Customer Address Pattern is Wrong : A-z 0-9 ,/'});

POValidation.push({reg: itemQtyRegex, field: $('#orderQtyOnPO'),error:'item qty Pattern is Wrong : 100 or 100.5'});

POValidation.push({reg: itemQtyRegex, field: $('#discountOnPO'),error:'Discount Pattern is Wrong : 100 or 100.00'});
POValidation.push({reg: itemQtyRegex, field: $('#cashOnPO'),error:'Cash Pattern is Wrong : 100 or 100.00'});


/*PO details end*/