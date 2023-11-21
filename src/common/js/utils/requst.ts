const url_all = {
    'DEV': 'http://192.168.31.202:8080/api/v1', // 开发环境
    'PORD': ''
}

let BASEURL = url_all['DEV']

export const request = (options = {}) => {
    return new Promise( (resolve,reject)=>{
        hanleResquest(options,resolve,reject);
    })
}

function hanleResquest(options:any, resolve:any, reject:any) {
    uni.request({
        url: BASEURL + options.url,
        method:options.method,
        data: options.data,
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        sslVerify: true,
        success: ({ data, statusCode, header }) => {
            return resolve(data);
        },
        fail: (error) => {
            console.log('fail',error);
            return reject(error);
        }
    })
}