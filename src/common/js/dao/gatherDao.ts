class gatherDao {
    id:number;
    name: string[] // 采集点名字
    startTime: number[] // 采集点开始时间1 ET时间
    endTime: number[] // 才几点结束时间1 ET时间
    location: string // 采集点位置
    coordinate:Map<string,number>
    isAppear: boolean // 是否显示
    duration:Date // 真实持续时间 单位毫秒
    imageUrl:string // 地图url地址
    job:string // 职业
    level:number // 等级
    time:number // 总倒计时时间
    version:number // 版本
    isCollect:boolean // 收藏


    // 构造方法
    constructor (id:number,name:string[] = [],job:string,level:number, startTime:number[], endTime:number[], location:string = '',coordinate:Map<string,number>, isAppear:boolean = false, imageUrl:string, version:number) {
        this.id =id;
        this.name = name;
        this.job = job;
        this.level = level;
        this.startTime =startTime;
        this.endTime = endTime;
        this.location = location;
        this.coordinate = coordinate;
        this.isAppear = isAppear;
        this.duration = undefined!;
        this.imageUrl = imageUrl;
        this.time = 0;
        this.version = version;
        this.isCollect = false;
    }
    
    // Get方法
    getId():number {
        return this.id;
    }

    getName():string[] {
        return this.name;
    }
    getStartTime():number[] {
        return this.startTime;
    }
    getEndTime():number[] {
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
    getDuration():Date {
        return this.duration;
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

    getTime():number {
        return this.time;
    }

    getVersion():number {
        return this.version;
    }

    getIsCollect():boolean {
        return this.isCollect;
    }

    // Set方法
    setId(id:number) {
        this.id =id;
    }

    setName(name:string[]) {
        this.name = name;
    }
    setStartTime(startTime: number[]) {
        this.startTime = startTime;
    }
    setEndTime(endTime: number[]) {
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
    setDuration(date?:Date) {
        this.duration = date!;
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
    setTime(time:number) {
        this.time = time;
    }
    setVersion(version:number) {
        this.version = version;
    }
    setIsCollect(isCollect:boolean) {
        this.isCollect = isCollect;
    }
}

export default gatherDao;

