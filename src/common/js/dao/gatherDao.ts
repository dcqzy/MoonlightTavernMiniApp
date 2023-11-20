class gatherDao {
    name: string[] // 采集点名字
    startTime: number // 采集点开始时间1 ET时间
    endTime: number // 才几点结束时间1 ET时间
    location: string // 采集点位置
    coordinate:Map<string,number>
    isAppear: boolean // 是否显示
    defaultDuration: number // 默认持续时间 单位毫秒
    duration:number // 真实持续时间 单位毫秒
    defaultCdTime:number // 默认间隔时间
     // cdTime:number // 真实间隔时间 单位毫秒
    imageUrl:string // 地图url地址
    job:string // 职业
    level:number // 等级
    time:number // 总倒计时时间

    // 构造方法
    constructor (name:string[] = [],job:string,level:number, startTime:number, endTime:number, location:string = '',coordinate:Map<string,number>, isAppear:boolean = false, imageUrl:string) {
        this.name = name;
        this.job = job;
        this.level = level;
        
        this.endTime = endTime;
        this.location = location;
        this.coordinate = coordinate;
        this.isAppear = isAppear;
        this.duration = 0;
        // this.cdTime = 0;
        this.imageUrl = imageUrl;
        this.time = 0;

        // if (this.startTime.length != 0 && this.endTime.length != 0) {
        //     if ( endTime[0] == 0) {
        //         // 计算默认持续时间
        //         this.defaultDuration = ((24 - startTime[0]) * 60 * 60  * 1000) ;
        //         // 计算间隔时间
        //         this.defaultCdTime = ((24 - startTime[1]) * 60 * 60 * 1000)
        //     } else {
        //         this.defaultDuration = ((endTime[0] - startTime[0]) * 60 * 60 * 1000);
        //         this.defaultCdTime = ((endTime[0] - startTime[1]) * 60 * 60 * 1000)
        //     }
        // } else {
        //     this.defaultDuration = 0;
        //     this.defaultCdTime = 0;
        // }

        // 先进行判断 传进来的时间是否大于12
        if (startTime >= 12) {
            this.startTime = startTime - 12;
        } else {
            this.startTime = startTime;
        }

        if (endTime >= 12) {
            this.endTime = endTime - 12;
        } else {
            this.endTime = endTime;
        }

        // 计算默认持续时间
        if (this.endTime == 0 && this.startTime > this.endTime) {
            this.defaultDuration = Math.abs((12 - this.startTime) * 60 * 60 * 1000);
        } else {
            this.defaultDuration = Math.abs((this.endTime - this.startTime) * 60 * 60 * 1000);
        }

        
        
        // 计算默认间隔时间
        this.defaultCdTime =Math.abs((this.endTime == 0?12:this.endTime - this.startTime - 12) * 60 * 60 * 1000); 
        

    }
    
    // Get方法
    getName():string[] {
        return this.name;
    }
    getStartTime():number {
        return this.startTime;
    }
    getEndTime():number {
        return this.endTime;
    }
    getLocation():string {
        return this.location;
    }
    getCoordinate():Map<string,number> {
        return this.coordinate;
    }
    getIsAppear():boolean {
        return this.isAppear;
    }
    getDuration():number {
        return this.duration;
    }
    // 获取采集点默认持续时间
    getDefaultDuration():number {
        return this.defaultDuration;
    }

    getImageUrl():string {
        return this.imageUrl;
    }
    getJob():string {
        return this.job
    }
    getLevel():number {
        return this.level
    }
    getDefaultCdTime():number{
        return this.defaultCdTime
    }
    getTime():number {
        return this.time;
    }

    // Set方法
    setName(name:string[]) {
        this.name = name;
    }
    setStartTime(startTime: number) {
        this.startTime = startTime;
    }
    setEndTime(endTime: number) {
        this.endTime = endTime;
    }
    setLocation(location:string) {
        this.location = location
    }
    setCoordinate(coordinate:Map<string,number>) {
        this.coordinate = coordinate;
    }
    setIsAppear(isAppear:boolean) {
        this.isAppear = isAppear;
    }
    setDuration(time:number) {
        this.duration = time;
    }
    setImageUrl(url:string) {
        this.imageUrl = url
    }
    setJob(job:string) {
        this.job = job;
    }
    setLevel(level:number) {
        this.level = level
    }
    setDefaultCdTime(time:number){
        this.defaultCdTime= time;
    }
    // setCdTime(time:number){
    //     this.cdTime = time;
    // }
    setTime(time:number) {
        this.time = time;
    }
}

export default gatherDao;

