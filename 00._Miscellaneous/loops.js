//loop methods: They are all methods that help loop over a list
//foreach, map, filter, find, sort, reduce

//Difference between foreach and map. map creates a new list, foreach iterates over list.

//why use map and functional programming. We don't want to not have variables outside functions, but rather inside and map creates a new list.

const trolls = [
    { name: 'anonymous', trollLevel: 9 },
    { name: 'kroelleboelle', trollLevel: 22 },
    { name: 'kroelleline', trollLevel: 27 },
];

//Task add 5 troll level to all the trolls.

//trolls.map((element, index, array) => console.log());

//Remember to return the full object.
//After this map, trolls is garbage now, there is an side effect that updates the trollLevel in trolls also. So after a map of a list, always use the new list.
const upgradedTrolls = trolls.map(troll => {
    troll.trollLevel += 5;
    return troll;
});

// does the same as above, here is multiple expressions, but the last one is the one returned.
//const upgradedTrolls = trolls.map(troll => ((troll.trollLevel += 5), troll));

//Another kind of syntax
//Here we return an javascript object by encapsuling the the object with ()
const doubleUpgradedTrolls = trolls.map(troll => ({
    name: troll.name,
    trollLevel: (troll.trollLevel += 5),
}));

//console.log(upgradedTrolls);
//console.log(doubleUpgradedTrolls);

//task 2: Create a list of trolls where the troll level is an odd number

const oddNumberTrollLevelTrolls = trolls.filter(troll => troll.trollLevel % 2 === 1);

console.log(oddNumberTrollLevelTrolls);
