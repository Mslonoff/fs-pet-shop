// // var { exit } = require('node:process');
// // var fs = require('fs');
// // const selection = process.argv[2];

// // if (!selection){
// //     console.error('Usage: node fs.js [read | create | update | destroy]')
// //     exit(1);
// // }

// // function read() {
// //     fs.readFile('../pets.json', 'utf-8', function(error, data) {
// //         if(error){
// //             console.log(error);
// //             exit(1);
// //         }
// //         let pets = JSON.parse(data);
// //         const index = process.argv[3];
// //         if(!index) {
// //             console.log(pets);
// //         } else if (index < 0 || index >= pets.length || !Number.isInteger(Number(index))) {
// //             console.error('Usage: node fs.js read INDEX')
// //             exit(1);
// //         } else if (index < pets.length) {
// //             console.log(pets[index])
// //         }
// //     })
// // }

// // function create() {
// //     const age = process.argv[3];
// //     const kind = process.argv[4];
// //     const name = process.argv[5];
// // }

// // make a function that can read from pets.js
// // it should use fs to query pets.js should output the same output as in the pets.json file
// // should be able to console log and get the data that you want

// const { exit } = require('process');
// var fs = require('fs');

// var arguments = process.argv;

// if (arguments.length < 3) {
//     console.error('[Usage: node fs.js [read | create | update | destroy]');
//     exit(1);
// }

// if (arguments.includes('read')) {

//     var indexOfRead = arguments.indexOf('read');
//     var indexOfNext = (arguments.indexOf('read') + 1);
    
//     if (arguments[indexOfNext] !== undefined) {
//         console.log(arguments[indexOfNext]);
//     }

//     fs.readFile('../pets.json', 'utf8', (error, data) => {
//         if(error) {
//             console.log(error)
//         } else {
//             console.log(JSON.parse(data)[arguments[indexOfNext]])
//         }
//     });
// }

const { exit, argv } = require('process');
const fs = require('fs');

if(!argv[2]) {
    console.error("Usage: node: fs.js [read | create | update | destroy]")
    exit(1);
}

if (argv[2] == 'read') {
    // console.log(argv);
    fs.readFile('../pets.json', 'utf-8', function (error, data) {
        if(error) {
            console.error(error);
        } else {
            if (!argv[3]) {
                console.log(JSON.parse(data));
            } else {
                if(JSON.parse(data)[argv[3]] === undefined) {
                    console.error("Usage: node: fs.js read INDEX");
                    exit(1);
                } else {
                    console.log(JSON.parse(data)[argv[3]]);
                }
            }
        }
    })
} else if (argv[2] == 'create') {
    if(!argv[3] || !argv[4] || !argv[5]) {
        console.error("Usage: node fs.js create AGE KIND NAME")
        exit(1);
    } else {
        fs.writeFileSync('../pets.json', 'some words I have', {flag: 'a'})
            // if(error) {
            //     console.log(error)
            // } else {
            //     console.log('it worked!')
        }
    }

