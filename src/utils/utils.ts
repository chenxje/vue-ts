function changeNum(arg1: string | number = '', arg2: string | number = '', isAdd = true): number {
    function changeInteger(arg: string | number, r: number, maxR: number): number {
        if (r != maxR) {
            let addZero = ''
            for (let i = 0; i < maxR - r; i++) {
                addZero += '0'
            }
            arg = Number(arg.toString().replace('.', '') + addZero)
        } else {
            arg = getNum(arg)
        }
        return arg
    }
    const r1 = getDecimalLength(arg1)
    const r2 = getDecimalLength(arg2)
    const maxR = Math.max(r1, r2)
    arg1 = changeInteger(arg1, r1, maxR)
    arg2 = changeInteger(arg2, r2, maxR)
    const m = Math.pow(10, maxR)
    if (isAdd) {
        return (arg1 + arg2) / m
    } else {
        return (arg1 - arg2) / m
    }
}

function getDecimalLength(arg: string | number = ''): number {
    try {
        return arg.toString().split(".")[1].length
    } catch (e) {
        return 0
    }
}

function getNum(arg: string | number = ''): number {
    return Number(arg.toString().replace(".", ""))
}

/**
 * 数字相加
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function accAdd(arg1: string | number, arg2: string | number): number {
    return changeNum(arg1, arg2)
}

/**
 * 数字相减
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function accSub(arg1: string | number, arg2: string | number): number {
    return changeNum(arg1, arg2, false)
}

/**
 * 数字相乘
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function accMul(arg1: string | number, arg2: string | number): number {
    let m = 0;
    m = accAdd(m, getDecimalLength(arg1))
    m = accAdd(m, getDecimalLength(arg2))
    return getNum(arg1) * getNum(arg2) / Math.pow(10, m)
}

/**
 * 数字相除
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function accDiv(arg1: string | number, arg2: string | number): number {
    const t1: number = getDecimalLength(arg1)
    const t2: number = getDecimalLength(arg2)
    if (t1 - t2 > 0) {
        return (getNum(arg1) / getNum(arg2)) / Math.pow(10, t1 - t2)
    } else {
        return (getNum(arg1) / getNum(arg2)) * Math.pow(10, t2 - t1)
    }
}

export function getDate(date: Date, format = 'yyyy-MM-dd') {
    const year: string = '' + date.getFullYear()
    const month: string = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1)
    const day: string = date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate()
    const hour: string = date.getHours() < 10 ? '0' + date.getHours() : '' + date.getHours()
    const minite: string = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes()
    const second: string = date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds()
    return format
        .replace(/yyyy/g, year)
        .replace(/MM/g, month)
        .replace(/dd/g, day)
        .replace(/hh/g, hour)
        .replace(/mm/g, minite)
        .replace(/ss/g, second)
}
