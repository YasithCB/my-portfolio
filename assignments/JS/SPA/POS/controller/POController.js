
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

    let cartItem = new CartItem(
        $('#selectItemOnPO').val(),
        $('#itemNameOnPO').text(),
        unitPrice,
        orderQty,
        unitPrice * orderQty
    );
    cartItems.push(cartItem);

    renewFields();
    refreshTblCart();
    cartRowTrigger();

    $('#totalOnPO').text(calcTotal());
    $('#balanceOnPO').text(calcBal());
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
    if (confirm('Are you sure to Edit this Qty?')) {
        let cartItem = searchItem(selectedRowOnCart);
        let price = $('#editPriceOnPO').val();
        let qty = $('#editQtyOnPO').val();

        /*edit*/
        cartItem.setCode($('#editItemCodeOnPO').val());
        cartItem.setName($('#editItemNameOnPO').val());
        cartItem.setPrice(price);
        cartItem.setQty(qty);
        cartItem.setSubTotal(price * qty);

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

    let qty =  parseFloat($('#orderQtyOnPO').val());
    let unitPrice = parseFloat($('#unitPriceOnPO').text());
    let order = new Order(
        $('#orderIdOnPO').val(),
        $('#cusIdOnPO').val(),
        $('#cusNameOnPO').val(),
        $('#addressOnPO').val(),
        $('#selectItemOnPO').val(),
        $('#itemNameOnPO').val(),
        qty,
        unitPrice,
        qty * unitPrice,
        parseFloat($('#discountOnPO').val()),
        calcTotal()
    );
    orders.push(order);

    alert('Order Placed!');
    cartItems = [];
    refreshTblCart();
    renewFieldsOnPO();
    cartRowTrigger();
});
/*purchase func*/

/*auto change subTotal when type dis and cash*/
$('#discountOnPO,#cashOnPO,#orderQtyOnPO').on('keyup',function () {
    $('#totalOnPO').text(calcTotal());
    $('#balanceOnPO').text(calcBal());
})
/*auto change subTotal when type dis and cash*/

function renewFieldsOnPO() {
    $("#orderIdOnPO,#dateOnPO,#cusIdOnPO,#cusNameOnPO,#salaryOnPO,#addressOnPO,#orderQtyOnPO,#discountOnPO,#cashOnPO").val('');
    $("#totalOnPO,#balanceOnPO").text('');
}

function searchItem (code) {
    for (let item of items) {
        if (item.getCode() === code) {
            return item;
        }
    }
    return -1;
}

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
        let row = `<tr><th scope="row">${item.getCode()}</th><td>${item.getName()}</td><td>${item.getPrice()}</td><td>${item.getQty()}</td></td><td>${item.getSubTotal()}</td></tr>`
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

function loadItemDropdown(){
    $('#selectItemOnPO').empty();
    for (const item of items) {
        $('#selectItemOnPO').append(`<option>Select a Item</option>`);
        $('#selectItemOnPO').append(`<option>${item.getCode()}</option>`);
    }
}

$('#selectItemOnPO').change(function (e){
    let item = searchItem(e.target.value);
    console.log(item);
    $('#itemNameOnPO').text(item.getName());
    $('#unitPriceOnPO').text(item.getPrice());
    $('#qtyOnHand').text(item.getQty());
})
