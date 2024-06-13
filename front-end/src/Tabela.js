export default function Tabela({vetor, selecionar}) {
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Marca</th>
                    <th>Quantidade</th>
                    <th>Selecionar</th>
                </tr>
            </thead>

            <tbody>
                {
                    vetor.map((obj, indice) => (
                        <tr key={(indice)}>
                            <td>{indice+1}</td>
                            <td>{obj.nomeProduto}</td>
                            <td>{obj.marcaProduto}</td>
                            <td>{obj.qtdProduto}</td>
                            <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}