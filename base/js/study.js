// 1. async
async function fetchUser() {
    // do network request in 10 secs....
    return 'userName';
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2. await ✨
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
    await delay(2000);
    return '🍎';
}

async function getBanana() {
    await delay(1000);
    return '🍌';
}

async function pickFruits() {
    const applePromise = getApple();
    const bananaPromise = getBanana();
    const apple = await applePromise;
    const banana = await bananaPromise;
    return `${apple} + ${banana}`;
}

pickFruits().then(console.log);

// 3. useful APIs ✨
function pickAllFruits() {
    return Promise.all([getApple(), getBanana()]).then(fruits =>
        fruits.join(' + ')
    );
}

pickAllFruits().then(console.log);

function pickOnlyOne() {
    return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);


/**
 * STUDY
 **/

const mike = {
    name: "Mike"
}
const tom = {
    name: "Tom"
}

function showThisName() {
    console.log(this.name)
}

function update(birthYear, occupation) {
    this.birthYear = birthYear;
    this.occupation = occupation;
}

// showThisName(); //window.name과 같음
showThisName.call(mike); //mike
showThisName.call(tom); //tom

update.call(mike, 1999, 'singer'); // call(this 로 사용될 매개변수, ...parameters);





//ProtoType -> hasOwnProperty ?

const notProperty = {
    name: "noProperty"
}

const property = {
    name: "isProperty",
    makeProto() {
      console.log(`make!! ${this.name}`);
    }
}

// notProperty.makeProto(); //없음
property.makeProto();

notProperty.__proto__ = property; //프로토타입 적용

notProperty.makeProto(); //있음