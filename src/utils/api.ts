import { Request } from "@/utils/axios";

const baseUser = '/vue-study/user/'

class api {
    /* api接口模块 */
    public static about = {
        // 直接在index.ts中设置不需要Base模块
        currentCity: () => Request.get('/cityjson'),
    }

    public static user = {
        getAllUsers: () => Request.get(baseUser + 'infos'),
        createUser: (params: any) => Request.post(baseUser + 'info', params, {
            contentType: 'application/json;charset=UTF-8'
        }),
        updateEnabled: (params: any) => Request.post(baseUser + 'update', params, {
            contentType: 'application/json;charset=UTF-8'
        }),
    }
}
export {
    api
}
