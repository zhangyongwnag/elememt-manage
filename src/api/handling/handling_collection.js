import httpCli from '../request'
import * as config from '../../config'
import * as common from '../../common'

// 获取数据子集列表
export function getDataCollection(data) {
   return httpCli.post(config.URL_GET_SUBSETS_LIST,data)
}

// 获取单个子集数据范围
export function getDataCollectionScope(data) {
  return httpCli.post(config.URL_GET_SUBSET_TABLES_LIST,data)
}

// 操作数据前校验
export function checkCollectionScope(data) {
  return httpCli.get(config.URL_CHECK_SUBSETS + data)
}
