
function Order(oIdv,cIdv,cNamev,cAddressv,iCodev,iNamev,iQtyv,iPricev,subTotalv,discountv,totalv){
    let oId = oIdv;
    let cId= cIdv;
    let cName= cNamev;
    let cAddress= cAddressv;
    let iCode= iCodev;
    let iName= iNamev;
    let iQty= iQtyv;
    let iPrice= iPricev;
    let subTotal= subTotalv;
    let discount= discountv;

    let total= totalv;

    this.getoId= function (){
        return oId;
    }
    this.getcId= function (){
        return cId;
    }
    this.getcName= function (){
        return cName;
    }
    this.getcAddress= function (){
        return cAddress;
    }
    this.getiCode= function (){
        return iCode;
    }
    this.getiName= function (){
        return iName;
    }
    this.getiQty= function (){
        return iQty;
    }
    this.getiPrice= function (){
        return iPrice;
    }
    this.getSubTotal= function (){
        return subTotal;
    }
    this.getDiscount= function (){
        return discount;
    }
    this.getTotal= function (){
        return total;
    }

    this.setoId= function (v){
        oId= v;
    }
    this.setcId= function (v){
        cId= v;
    }
    this.setcName= function (v){
        cName= v;
    }
    this.setcAddress= function (v){
        cAddress= v;
    }
    this.setiCode= function (v){
        iCode= v;
    }
    this.setiName= function (v){
        iName= v;
    }
    this.setiQty= function (v){
        iQty= v;
    }
    this.setiPrice= function (v){
        iPrice= v;
    }
    this.setSubTotal= function (v){
        subTotal= v;
    }
    this.setDiscount= function (v){
        discount= v;
    }
    this.setTotal= function (v){
        total= v;
    }

}