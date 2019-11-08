import axios from "axios"

let a = 2;
console.log(a);

axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
});
