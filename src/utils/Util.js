import { constants } from './constants';

const day = new Date().getDate();
const month = new Date().getMonth();

export function randomGeneratorForArray(arr) {
    let num = Math.round((day+4) / month * 39163).toString();

    return + (num[2] + num[3]) % arr.length;
}

export function generateText(answer, matchMap, category) {
    try {
        let answerArr = answer[category].split(",").map(item => item.trim());
        let matchArr = matchMap[category];
        let newArr = [];
        for(const x of answerArr) {
            if(matchArr.includes(x)) {
                newArr.push(x);
            } else {
                newArr.push("?");
            }
        }
        return newArr.sort().reverse();
    } catch {
        return "";
    }
}

export function arrayToList(arr) {
    let str = ""
    for(const x in arr) {
        str+=arr[x]+", ";
    }
    return str.substring(0, str.length-2);
}

export function objToCategories(obj) {
    let o = {};
    for(let cat of constants.categories) {
        o[cat.category] = obj[cat.category]
    }
    return o;
}

export function generateDefaultCategoriesObject() {
    let obj = {};
    for(let cat of constants.categories) {
        let empty;
        if(cat._type === String) {
            empty = "";
        } else if(cat._type === Array) {
            empty = [];
        } else {
            empty = "";
        }
        obj[cat.category] = empty;
    }
    return obj;
}