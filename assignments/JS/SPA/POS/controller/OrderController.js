
/*add sample data*/
{
    let order = new Order(
        'OD001',
        'C001',
        'Yasith',
        'Opanayaka',
        'I001',
        'Soap',
        2,
        200,
        400,
        20,
        380
    );
    orders.push(order);

    refreshTblOrder();
    orderRowTrigger();
}
/*add sample data*/

function orderRowTrigger() {
    $('#tblOrders>tr').click(function (){
        /*open edit cart model*/
        $('#EditOrder').click();
        selectedRowOrderId = $(this).children().eq(0).text();

        $('#editOrderId').val( selectedRowOrderId);
        $('#editCusIdOnOrder').val ($(this).children().eq(1).text());
        $('#editCusNameOnOrder').val( $(this).children().eq(2).text());
        $('#editCusAddressOnOrder').val( $(this).children().eq(3).text());
        $('#editItemCodeOnOrder').val( $(this).children().eq(4).text());
        $('#editItemNameOnOrder').val( $(this).children().eq(5).text());
        $('#editItemQtyOnOrder').val( $(this).children().eq(6).text());
        $('#editUnitPriceOnOrder').val( $(this).children().eq(7).text());
        $('#editSubTotalOnOrder').val( $(this).children().eq(8).text());
        $('#editDiscountOnOrder').val( $(this).children().eq(9).text());
        $('#editTotalOnOrder').val( $(this).children().eq(10).text());
    });
}

/*edit order func*/
$('#btnEditOrder').click(function () {
    if (confirm('Are you sure to Edit this Order details?')) {
        let order = searchOrder(selectedRowOrderId);
        let qty = parseFloat($('#editItemQtyOnOrder').val());
        let unitPrice = parseFloat($('#editUnitPriceOnOrder').val());
        let discount = parseFloat($('#editDiscountOnOrder').val())
        let subTotal =  qty * unitPrice;

        /*edit*/
        order.setoId($('#editOrderId').val());
        order.setcId($('#editCusIdOnOrder').val());
        order.setcName($('#editCusNameOnOrder').val());
        order.setcAddress($('#editCusAddressOnOrder').val());
        order.setiCode($('#editItemCodeOnOrder').val());
        order.setiName($('#editItemNameOnOrder').val());
        order.setiQty(qty);
        order.setiPrice(unitPrice);
        order.setSubTotal(subTotal);
        order.setDiscount(discount);
        order.setTotal(subTotal - discount);

        $('#btnCloseEditOrderModal').click();
        refreshTblOrder();
        console.log(orders)
        orderRowTrigger();
    }
});
/*edit order func*/

function refreshTblOrder(){
    $('#tblOrders').empty();

    for (let order of orders) {
        let row = `<tr><th scope="row">${order.getoId()}</th><td>${order.getcId()}</td><td>${order.getcName()}</td><td>${order.getcAddress()}</td></td><td>${order.getiCode()}</td><td>${order.getiName()}</td><td>${order.getiQty()}</td><td>${order.getiPrice()}</td><td>${order.getSubTotal()}</td><td>${order.getDiscount()}</td><td>${order.getTotal()}</td></tr>`
        $('#tblOrders').append(row);
    }
}

function searchOrder (id) {
    for (let order of orders) {
        if (order.getoId() === id) {
            return order;
        }
    }
    return -1;
}