const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
let hash = bcrypt.hashSync('lala', salt);
console.log(hash);


// hash = bcrypt.hashSync('poopface', salt);
// console.log(hash);

const didMatch = bcrypt.compareSync('pantsface', '$2b$10$QUJ346ylCYC7rIS2cbqEq.l4o.HCL6r.pZokcF6Tivha/UTXDi.JK');

// if (didMatch) {
//     console.log('YAY!');
// } else {
//     console.log('💩💩💩!')
// }