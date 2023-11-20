export default class priceDao {
    /**
     * 雇员名字
     */
    name:string;
    /**
     * 单价
     */
    unitPrice:number;
    /**
     * 数量
     */
    quantity:number;
    /**
     * 所在服务器
     */
    server:string;
    /**
     * 是否是hq
     */
    isHq:boolean;

    /**
     * 上架时间
     */
    dateIssued:number;

    constructor(name:string, unitPrice:number,quantity:number,dateIssued:number,server:string,isHq:boolean = false) {
        this.name = name;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.dateIssued = dateIssued;
        this.server = server;
        this.isHq = isHq;
    }

    getName():string {
        return this.name;
    }
    getUnitPrice():string {
        return this.unitPrice.toString().replace(/\B(?=(\d{3})+\b)/g,',');
    }
    getQuantity():number {
        return this.quantity;
    }
    getDateIssued():string {
        let date = new Date(this.dateIssued * 1000);
        let day = '00';
        let month = '00';
        let hours = '00';
        let minutes = '00';
        let seconds = '00';
        if (date.getDate() < 10) {
            day = '0' + date.getDate();
        } else {
            day = date.getDate().toString();
        }

        if (date.getMonth()+1 < 10) {
            month = '0' + date.getMonth()+1
        }else {
            month = (date.getMonth()+1).toString();
        }
        if (date.getHours() < 10) {
            hours = '0' + date.getHours();
        }else {
            hours = (date.getHours()).toString();
        }

        if (date.getMinutes() < 10) {
            minutes ='0' + date.getMinutes();
        }else {
            minutes = date.getMinutes().toString();
        }

        if (date.getSeconds() < 10) {
            seconds ='0'+  date.getSeconds();
        }else {
            seconds = date.getSeconds().toString();
        }

        return month + '/' + day + ' '+ hours + ':' + minutes + ':' + seconds
    }
    getServer():string {
        return this.server;
    }
    getIsHq():boolean {
        return this.isHq;
    }

}