// Importanto a biblioteca 'inquirer', módulo 'select'
const { select, input, checkbox } = require('@inquirer/prompts')

let metas = [];

const cadastrarMeta = async () => {
    console.log('Digite "sair" para voltar ao menu')

    // Recebendo a meta do usuário
    const meta = await input({
        message: 'Digite a meta: ',
        instructions: false
    })

    // Verificando se deseja sair ou se a meta é vazia
    if(meta == "sair") {
        console.log('Retornando ao menu...')
        return
    } else if (meta.length == 0) {
        console.log('A meta não pode ser vazia\n');
        return cadastrarMeta();
    }

    // Adicionando a meta à lista de metas
    metas.push({
        value: meta, checked: false
    })
}

const listarMetas = async () => {
    // Exibindo as metas cadastradas
    const respostas = await checkbox({
        message: 'Use as setas para mudar de meta; \nEspaço para marcar ou desmarcar; \nEnter para finalizar essa etapa',
        choices: [...metas],
        instructions: false
    })

    // Marcando as metas como não concluídas para poder desmarcar as desejadas
    metas.forEach((m) => {
        m.checked = false
    })

    // Verificando se existe alguma meta cadastrada
    if(respostas.length == 0) {
        console.log('Nenhuma meta selecionada')
        return
    }

    /*
    Marcando as metas selecionadas como concluídas
    Essa parte irá verificar todas as que estão marcadas como concluídas e torna-las concluídas novamente, verificando uma por uma.
    */
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcada(s) como concluída(s)')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log('Nenhuma meta realizada :(')
        return
    }

    await select({
        message: 'Metas realizadas:',
        choices: [...realizadas],
        instructions: false
    })
}

const start = async () => {
    while(true) {
        // Recebendo a opção do usuário
        const opcao = await select({
            message: 'Menu',
            choices: [
                {
                    name: 'Cadastrar meta',
                    value: 'cadastrar'
                },
                {
                    name: 'Listar metas',
                    value: 'listar'
                },
                {
                    name: 'Metas realizadas',
                    value: 'realizadas'
                },
                {
                    name: 'Sair',
                    value: 'sair'
                }
            ]
        })

        // Verificando a opção escolhida
        switch(opcao) {
            case 'cadastrar':
                await cadastrarMeta();
                break;
            case 'listar':
                await listarMetas();
                break;
            case 'realizadas':
                await metasRealizadas();
                break;
            case 'sair':
                console.log('Até logo!');
                return
        }
    }
}

start()