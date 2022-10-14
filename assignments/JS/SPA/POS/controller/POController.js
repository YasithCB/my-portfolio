
$('#btnPurchaseOnPO').attr('disabled',true);

$("#orderIdOnPO,#dateOnPO,#cusIdOnPO,#cusNameOnPO,#salaryOnPO,#addressOnPO,#itemCodeOnPO,#itemNameOnPO,#unitPriceOnPO,#qtyOnHandOnPO,#orderQtyOnPO,#discountOnPO,#cashOnPO").on('keyup', function (event) {
    /*validate on keypress*/
    validateAllFieldsOnPO();

    /*prevent focus another field when pressing tab btn*/
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

/*focus on modal starting*/
$('#editCartItem').on('shown.bs.modal', function () {
    $('#editQtyOnPO').focus();
});


/*focus next field*/
$("#orderIdOnPO").on('keydown', function (event) {
    if (event.key === "Enter" && check(orderIdRegex,$('#orderIdOnPO')) ) {
        $('#dateOnPO').focus();
    }else {
        $('#orderIdOnPO').focus();
    }
});
$("#dateOnPO").on('keydown', function (event) {
    if (event.key === "Enter") {
        $('#cusIdOnPO').focus();
    }else {
        $('#dateOnPO').focus();
    }
});
$("#cusIdOnPO").on('keydown', function (event) {
    if (event.key === "Enter" && check(cusIDRegex,$('#cusIdOnPO')) ) {
        $('#cusNameOnPO').focus();
    }else {
        $('#cusIdOnPO').focus();
    }
});
$("#cusNameOnPO").on('keydown', function (event) {
    if (event.key === "Enter" && check(cusNameRegex,$('#cusNameOnPO')) ) {
        $('#salaryOnPO').focus();
    }else {
        $('#cusNameOnPO').focus();
    }
});
$("#salaryOnPO").on('keydown', function (event) {
    if (event.key === "Enter" && check(cusSalaryRegex,$('#salaryOnPO')) ) {
        $('#addressOnPO').focus();
    }else {
        $('#salaryOnPO').focus();
    }
});
$("#addressOnPO").on('keydown', function (event) {
    if (event.key === "Enter" && check(cusAddressRegex,$('#addressOnPO')) ) {
        $('#itemCodeOnPO').focus();
    }else {
        $('#addressOnPO').focus();
    }
});

/*item selecting*/
$("#orderQtyOnPO").on('keydown', function (event) {
    if (event.key === "Enter" && check(itemQtyRegex,$('#orderQtyOnPO'))) {
        $('#btnAddItemOnPO').click();
    }
});

/*purchase section*/
$("#discountOnPO").on('keydown', function (event) {
    if (event.key === "Enter" && check(itemPriceRegex,$('#discountOnPO')) ) {
        $('#cashOnPO').focus();
    }else {
        $('#discountOnPO').focus();
    }
});
$("#cashOnPO").on('keydown', function (event) {
    if (event.key === "Enter" && check(itemPriceRegex,$('#cashOnPO'))) {
        $('#btnPurchaseOnPO').click();
    }
});

/*edit Cart Model inside*/
$("#editQtyOnPO").on('keydown', function (event) {
    if (event.key === "Enter" && check(itemQtyRegex,$('#editQtyOnPO'))) {
        $('#btnEditCartItem').click();
    }
});
/*focus next field*/

/*add item func*/
$('#btnAddItemOnPO').click(function () {
    let unitPrice = $('#unitPriceOnPO').text();
    let orderQty = $('#orderQtyOnPO').val();

    let cartItem = {
        code: $('#selectItemOnPO').val(),
        name: $('#itemNameOnPO').text(),
        price: unitPrice,
        qty: orderQty,
        subtotal: unitPrice * orderQty,
    };
    cartItems.push(cartItem);

    $('#totalOnPO').text(calcTotal());
    $('#balanceOnPO').text(calcBal());

    renewFields();
    refreshTblCart();
    cartRowTrigger();
});
/*add item func*/

function calcTotal (){
    let total= 0;
    for (let item of cartItems) {
        total += item.subtotal;
    }
    return total - $('#discountOnPO').val();
}
function calcBal (){
    return $('#cashOnPO').val() - calcTotal();
}

/*edit item func*/
$('#btnEditCartItem').click(function () {
    if (confirm('Are you sure to Edit this Qty?') && getEditBtnState()) {
        let cartItem = searchItem(selectedRowOnCart);
        let price = $('#editPriceOnPO').val();
        let qty = $('#editQtyOnPO').val();

        /*edit*/
        cartItem.code = $('#editItemCodeOnPO').val();
        cartItem.name = $('#editItemNameOnPO').val();
        cartItem.price = price;
        cartItem.qty = qty;
        cartItem.subtotal = price * qty;

        $('#btnCloseEditCart').click();
        refreshTblCart();
        cartRowTrigger();
    }
});
/*edit item func*/

/*delete cart item func*/
$('#btnRemoveCartItem').click(function () {
    if (confirm('Are you sure to Remove this Item?')) {
        let item = searchItem(selectedRowOnCart);
        cartItems.splice(cartItems.indexOf(item),1);

        $('#btnCloseEditCart').click();
        refreshTblCart();
    }

});
/*delete cart item func*/

/*purchase func*/
$('#btnPurchaseOnPO').click(function () {

    let qty =  $('#orderQtyOnPO').val();
    let unitPrice = $('#unitPriceOnPO').val();
    let order = {
        orderId: $('#orderIdOnPO').val(),
        cusId: $('#cusIdOnPO').val(),
        cusName: $('#cusNameOnPO').val(),
        cusAddress: $('#addressOnPO').val(),
        itemCode: $('#itemCodeOnPO').val(),
        itemname: $('#itemNameOnPO').val(),
        qty: qty,
        unitPrice: unitPrice,
        subTotal: qty * unitPrice,
        discount: $('#discountOnPO').val(),
        total: calcTotal()
    };
    orders.push(order);

    renewFieldsOnPO();
    refreshTblCart();
    cartRowTrigger();
    alert('Order Placed!');
});
/*purchase func*/

function renewFieldsOnPO() {
    $("#orderIdOnPO,#dateOnPO,#cusIdOnPO,#cusNameOnPO,#salaryOnPO,#addressOnPO,#itemCodeOnPO,#itemNameOnPO,#unitPriceOnPO,#qtyOnHandOnPO,#orderQtyOnPO,#discountOnPO,#cashOnPO").val('');
    $("#totalOnPO,#balanceOnPO").text('');
}

function searchItem (code) {
    for (let item of cartItems) {
        if (item.code === code) {
            return item;
        }
    }
    return -1;
}


/*add sample data*/
{
    var cartItem = {
        code : 'I001',
        name : 'Soap',
        price : 200,
        qty : 60,
        subtotal : 12000
    }
    cartItems.push(cartItem);

    refreshTblCart();
    cartRowTrigger();
}
/*add sample data*/


function cartRowTrigger() {
    $('#tblCart>tr').click(function (){
        /*open edit cart model*/
        $('#btnEditCart').click();
        selectedRowOnCart = $(this).children().eq(0).text();

        $('#editItemCodeOnPO').val(selectedRowOnCart);
        $('#editItemNameOnPO').val($(this).children().eq(1).text());
        $('#editPriceOnPO').val($(this).children().eq(2).text());
        $('#editQtyOnPO').val($(this).children().eq(3).text());
    });
}

function refreshTblCart(){
    $('#tblCart').empty();

    for (let item of cartItems) {
        let row = `<tr><th scope="row">${item.code}</th><td>${item.name}</td><td>${item.price}</td><td>${item.qty}</td></td><td>${item.subtotal}</td></tr>`
        $('#tblCart').append(row);
    }
}

/*function to check if all fields are correct in save model*/
function validateAllFieldsOnPO() {
    let errorCount= 0;
    for (let validation of POValidation) {
        if (check(validation.reg,validation.field)) {
            makeFieldAsCorrect(validation.field,"");
        }else {
            errorCount++;
            makeFieldAsError(validation.field, validation.error);
        }
    }
    setBtnStates(errorCount);
}
function setBtnStates(errorCount) {
    if (errorCount > 0) {
        $('#btnPurchaseOnPO').attr('disabled',true);
    }else {
        $('#btnPurchaseOnPO').attr('disabled',false);
    }
}

/*load items for dropdown*/
loadItemDropdown();

let cmbSelectItem = $('#selectItemOnPO');
function loadItemDropdown(){
    cmbSelectItem.empty();
    for (const item of items) {
        cmbSelectItem.append(`<option>Select a Item</option>`);
        cmbSelectItem.append(`<option>${item.code}</option>`);
    }
}

cmbSelectItem.change(function (e){
    let item = searchItem(e.target.value);
    $('#itemNameOnPO').text(item.name);
    $('#unitPriceOnPO').text(item.price);
    $('#qtyOnHand').text(item.qty);
})
