async function firstAsync() {
    let promise = new Promise((res, rej) => {
        setTimeout(() => res("Now it's done!"), 10000)
    });

    // wait until the promise returns us a value
    let result = await promise; 
    console.log("maybe we are waiting idk")
    console.log(result);
    console.log("awaiting promise?")
    };
firstAsync();