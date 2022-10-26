
function Customer(cusId,cusName,cusAddress,cusSalary){
    let id = cusId;
    let name= cusName;
    let address= cusAddress;
    let salary= cusSalary;

    this.getId= function (){
        return id;
    }
    this.getName= function (){
        return name;
    }
    this.getAddress= function (){
        return address;
    }
    this.getSalary= function (){
        return salary;
    }

    this.setId= function (v){
        id= v;
    }
    this.setName= function (v){
        name= v;
    }
    this.setAddress= function (v){
        address= v;
    }
    this.setSalary= function (v){
        salary= v;
    }

}