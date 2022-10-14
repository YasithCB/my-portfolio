
/*add sample data*/
{
    let order = {
        orderId: 'OD001',
        cusId: 'C001',
        cusName: 'Yasith',
        cusAddress: 'Opanayaka',
        itemCode: 'I001',
        itemName: 'Soap',
        qty: 2,
        unitPrice: 200,
        subTotal: 400,
        discount: 20,
        total: 380
    };
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
        order.orderId = $('#editOrderId').val();
        order.cusId = $('#editCusIdOnOrder').val();
        order.cusName = $('#editCusNameOnOrder').val();
        order.cusAddress = $('#editCusAddressOnOrder').val();
        order.itemCode = $('#editItemCodeOnOrder').val();
        order.itemName = $('#editItemNameOnOrder').val();
        order.qty = qty;
        order.unitPrice = unitPrice;
        order.subTotal = subTotal;
        order.discount = discount;
        order.total = subTotal - discount;

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
        let row = `<tr><th scope="row">${order.orderId}</th><td>${order.cusId}</td><td>${order.cusName}</td><td>${order.cusAddress}</td></td><td>${order.itemCode}</td><td>${order.itemName}</td><td>${order.qty}</td><td>${order.unitPrice}</td><td>${order.subtotal}</td><td>${order.discount}</td><td>${order.total}</td></tr>`
        $('#tblOrders').append(row);
    }
}

function searchOrder (id) {
    for (let order of orders) {
        if (order.orderId === id) {
            return order;
        }
    }
    return -1;
}