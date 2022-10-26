
function Item(iCode,iName,iPrice,iQty){
    let code = iCode;
    let name= iName;
    let price= iPrice;
    let qty= iQty;

    this.getCode= function (){
        return code;
    }
    this.getName= function (){
        return name;
    }
    this.getPrice= function (){
        return price;
    }
    this.getQty= function (){
        return qty;
    }

    this.setCode= function (v){
        code= v;
    }
    this.setName= function (v){
        name= v;
    }
    this.setPrice= function (v){
        price= v;
    }
    this.setQty= function (v){
        qty= v;
    }

}