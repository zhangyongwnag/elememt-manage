// 脱敏操作前检验
import httpCli from "../request";
import * as config from "../../config";

export function checkHandlingTask(data) {
  return httpCli.get(config.URL_CHECK_MASK + data)
}
