import httpCli from '../request'
import * as config from '../../config'
import * as common from '../../common'

// 获取用户权限
export function getRoleList(){
    return httpCli.get(config.URL_GET_USER_ROLES)
}

// 获取用户组
export function getRoleGroups () {
    return httpCli.get(config.URL_GET_USER_ROLES_GROUPS)
}

// 获取单个用户
export function getUser () {
    return httpCli.get(config.URL_GET_USER_SINGLE)
}

// 获取系统权限
export function getLimits () {
    return httpCli.get(config.URL_GET_SYS_MODULES)
}
