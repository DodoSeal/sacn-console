window.sacn.send({});

const button = document.getElementById('test');

button.addEventListener('click', (event) =>{
    window.sacn.send({
        1:100,
        2:20,
        3:30
    });
});