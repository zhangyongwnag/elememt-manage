import store from '../store'

/**
 * @date 2020/01/15
 * @description 全局自定义过滤器
 * @params value
 * @return filter
 */

class Rule {
    constructor (value) {
        let newValue = ''
        Object.defineProperty(this, 'rule', {
            value: newValue,
            writable: false, // 不允许修改
            configurable: false, // 不允许删除
        })
    }
}

// 根据maskType获取maskValue
export function filterMaskType (value) {
    let result = new Rule(value)
    if (Object.prototype.toString.call(result) === '[object Object]') {
        return result.mask || '暂无'
    }
}

// 根据约束ID获取约束类型
export function fieldType (value) {
    switch (value) {
        case 0:
            return '暂无'
        case 2:
            return '主键约束'
        case 3:
            return '唯一约束'
        case 4:
            return '外键约束'
    }
}
