import * as qiniu from 'qiniu-js'
import api from "./api";

class QiniuService {
    //从后端获取UpToken
    getUpToken() {
        return api.get("/leetroll-app/qiniu/token")
            .then(resp => {
                    return resp
                },
                err => {
                    return Promise.reject(err)
                })
    }
}

const qiniuService =  new QiniuService()

export const upload = (file ) => {
    const key = 'item/preview/' + file.name;
    const observer = {
        next(res){
            console.log("next")
        },
        error(err){
            console.log("error")
        },
        complete(res){
            console.log("complete")
        }
    }

    const config = {
        useCdnDomain: true,
        region: qiniu.region.as0
    };

    const putExtra = {
    };

    return qiniuService.getUpToken().then(resp => {
        const observable = qiniu.upload(file, key, resp.UpToken, putExtra, config)
        const subscription = observable.subscribe(observer)
        // subscription.unsubscribe() // 上传取消

        //上传成功返回图片外链url
        return resp.Domain + "/" + key
    });

}