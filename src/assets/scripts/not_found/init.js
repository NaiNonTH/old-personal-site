const pathname = location.pathname.split("/");

let string = /^(\w*)(\.html)$/i.exec(pathname.at(-1))[1];
let sum = 0;

for (i = 0; i < string.length; i++) {
    sum += string.charCodeAt(i);
}

let strsum = sum.toString().split("");

while (strsum.length > 1) {
    sum = 0;
    for (i = 0; i < strsum.length; i++) {
        sum += +strsum[i]
    }
    strsum = sum.toString().split("");
}