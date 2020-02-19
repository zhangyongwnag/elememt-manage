/*
api 接口的统一出口
 */

import DBSource from './DBSource'
import DataBase from './db-instance'
import FileModal from './file-template'
import FileSource from './file-source'
import DumpFile from './dump'

// 导出接口
export default {
    DataBase,
    DBSource,
    FileModal,
    FileSource,
    DumpFile
}
