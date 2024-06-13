export default function Formulario({botao, eventoTeclado, cadastrarProduto, obj, cancelar, remover, atualizar}) {
    return(
        <form>
            <input type='text' value={obj.nomeProduto} onChange={eventoTeclado} name="nomeProduto" placeholder="Nome do Produto" className="form-control"/>
            <input type='text' value={obj.marcaProduto} onChange={eventoTeclado} name="marcaProduto" placeholder="Marca do Produto" className="form-control"/>
            <input type='text' value={obj.qtdProduto} onChange={eventoTeclado} name="qtdProduto" placeholder="Quantidade de Produtos" className="form-control"/>

            {
                botao
                ?
                <input type='button' value='Cadastrar Produto' onClick={cadastrarProduto} className="btn btn-primary"/>
                :
                <div>
                    <input type='button' onClick={atualizar} value='Alterar Produto' className="btn btn-warning"/>
                    <input type='button' onClick={remover} value='Remover Produto' className="btn btn-danger"/>
                    <input type='button' onClick={cancelar} value='Cancelar' className="btn btn-secondary"/>
                </div>
            }

        </form>
    )
}