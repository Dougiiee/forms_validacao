const form = document.querySelector('form');
const geladinhos = document.querySelector('#geladinhos');
const checkboxes = document.querySelectorAll('input[type=checkbox]')


const sendForm = async(bodyObject) => {
    try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/posts/', {
            method: 'POST',
            body: JSON.stringify(bodyObject),
            headers: {
            'Content-type': 'application/json',
            },
        });
        if(!resposta.ok){
            throw new Error('Ops! Algo deu errado no POST');
        }
    } catch(err) {
        throw err;
    }
}


form.addEventListener('submit', async (evento) => {
    const atLeastOneCheckboxMarked = Array.from(checkboxes).some(item => item.checked);
    evento.preventDefault();
    if(atLeastOneCheckboxMarked){

        const formData = new FormData(form);
        const body = Object.fromEntries(formData.entries());
        body.geladinhos = formData.getAll('geladinhos');
        console.log(body);
    
        try{
            await sendForm(body);
            document.body.innerHTML = '<h1> Formulario Submetido com Sucesso!</h1>';
        }catch (err) {
            document.body.innerHTML = '<h1> Ops! Algo deu errado ao submeter o formulario!</h1>';

        }

    

    } else {
        const feedback = document.createElement('p');
        feedback.innerText = 'Preencha ao menos 1 opção acima!'
        feedback.style.color = 'red';

        geladinhos.appendChild(feedback);
    }
})




