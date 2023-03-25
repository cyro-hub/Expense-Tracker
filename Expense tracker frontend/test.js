const arr = [
    { name: "name1", value: 6 },
    { name: "name2", value: 2 },
    { name: "name4", value: 3 },
    { name: "name3", value: 51 },
    { name: "name4", value: 1},
    { name: "name2", value: 76 },
    { name: "name1", value: 6 },
    { name: "name5", value: 63 },
    { name: "name1", value: 6},
    { name: "name8", value: 9 },
    { name: "name2", value: 11 },
]

let arr1 = [];

for (let i = 0; i < arr.length; i++){
    let temp = arr[i].name;
    for (let j = 0; j < arr.length; i++){
        if (arr1[j]?.name == temp) {
            arr1[j].value += arr[i].value;
            break;
        }
        arr1.push(arr[i])
        console.log(arr1)
    }
}

console.log(arr1)


const obj1 = [{
    fullMonth: 'january',
    inAmount:600
},{
    fullMonth :'Febuary',
    inAmount:600
    }]

const obj2 = [{
    fullMonth: 'january',
    outAmount:600
},{
    fullMonth :'Febuary',
    outAmount:600
}]