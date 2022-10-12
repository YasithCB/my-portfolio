

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