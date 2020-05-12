function attempt(available, allowed, preferred) {
    let atemp = [];  //вихідний масив
    let temp = [];    //масив тимчасових данних
    isAllowedAll = false;
    isPreferredAll = false;

    allowed.forEach((el) => { // шукаємо any серед елементів allow
        if (el === "any") {
            isAllowedAll = true;    //якщо знайшли то змінюємо індикатор
        }
    });

    preferred.forEach((el) => {// шукаємо any серед елементів prefer
        if (el === "any") {
            isPreferredAll = true;   //якщо знайшли то змінюємо індикатор
        }
    });

    if (!isAllowedAll) {    // якщо isAllowAll false
        available.forEach((el) => {
            if (allowed.includes(el)) temp.push(el); //всі елементи що є в aval i allow складаємо в темп
        });
    } else {
        temp = available.slice();    //якщо alow any тоді копіюємо масив в темп
    }

    if (!isPreferredAll) {   //якщо isPreferAll false
        temp.forEach((el) => {
            if (preferred.includes(el)) atemp.push(el); //всі що є в temp i prefer складаємо в atemp
        });
    } else {
        atemp = temp.slice(); //яні prefer any тоді копіюємо масив в атемп
    }

    if (!atemp[0]) {      // якщо атемп пустий
        for(let i=temp.length-1;i>=0; i--){
            for(let j=0; j<preferred.length; j++){
                if(temp[i]<preferred[j])
                    return [temp[i]] //повертаємо елемент з темп що менший за елемент з prefer
            }

        }

    }

    if (!atemp[0]) {  // якщо атемп досі пустий
        for(let i=temp.length-1;i>=0; i--){
            for(let j=0; j<preferred.length; j++){
                if(temp[i]>preferred[j])
                    return [temp[i]]
            }

        }
    }

    return atemp;
}

/**/console.log(attempt([240, 360, 720], [360, 720], [1080])); //720  в прикладі запиту помилка, оскільки в умові сказано повернути найближче доступне і це 720, а не 360
console.log(attempt([240, 720], [360, 720], [1080])); //720
console.log(attempt([240], [360, 720], [1080])); //[]
console.log(attempt([240, 360, 720], [240, 360, 720, 1080], [240, 360])); //240 360
/**/ console.log(attempt([240, 720], [240, 360, 720, 1080], [240, 360])); //240 , в прикладі запиту помилка, повинно повернути тільки значення 240
console.log(attempt([240, 720], [240, 360, 1080], [240, 360])); //240
console.log(attempt([720], [240, 360, 1080], [240, 360])); //[]
console.log(attempt([240, 360], [240, 360], [720, 1080])); //360
console.log(attempt([240, 360, 720], [360, "any"], [360, 720])); //360 720
console.log(attempt([240, 360, 720], [240, 360, 720], ["any", 720])); //240 360 720
console.log(attempt([240, 360, 720], [360, 1080], ["any", 720])); //360
console.log(attempt([240, 360, 720], [1080], ["any", 720])); //[]
