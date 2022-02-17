import { Request } from "@/utils/axios";

class api {
    /* api接口模块 */
    public static about = {
        // 直接在index.ts中设置不需要Base模块
        currentCity: () => Request.get('/cityjson'),
    }
}
export {
    api
}