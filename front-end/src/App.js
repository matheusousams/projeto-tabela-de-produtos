import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

export default function App() {

  const produto = {
    idProduto: 0,
    nomeProduto: '',
    marcaProduto: '',
    qtdProduto: ''
  }
  
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  useEffect(()=>{
    fetch("http://localhost:8080/listarProdutos")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  const cadastrarProduto = () => {
    fetch("http://localhost:8080/cadastrarProdutos", {
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      if(retorno_convertido.mensagem !== undefined) {
        alert(retorno_convertido.mensagem);
      } else {
        setProdutos([...produtos, retorno_convertido]);
        alert('Produto cadastrado com sucesso!');
        limparFormulario();
      }
    })
  }

  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  const selecionaProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  const deletarProduto = () => {
    fetch("http://localhost:8080/removerProdutos/" + objProduto.idProduto, {
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      alert(retorno_convertido.mensagem);

      let vetorTemporario = [...produtos];

      let indice = vetorTemporario.findIndex(() => {
        return produto.idProduto === objProduto.idProduto;
      });

      vetorTemporario.splice(indice, 1);

      setProdutos(vetorTemporario);

      limparFormulario();

    })
  }

  const atualizarProduto = () => {
    fetch("http://localhost:8080/atualizarProdutos", {
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      if(retorno_convertido.mensagem !== undefined) {
        alert(retorno_convertido.mensagem);
      } else {
        alert('Produto atualizado com sucesso!');

        let vetorTemporario = [...produtos];

        let indice = vetorTemporario.findIndex((p) => {
          return p.idProduto === objProduto.idProduto;
        });

        vetorTemporario[indice] = objProduto;

        setProdutos(vetorTemporario);

        limparFormulario();
      }
    })
  }


  return (
    <div className='div'>
      <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <h1 className='titulo'>Estoque de Celulares</h1>
      </nav>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrarProduto={cadastrarProduto} obj={objProduto} cancelar={limparFormulario} remover={deletarProduto} atualizar={atualizarProduto}/>
      <Tabela vetor={produtos} selecionar={selecionaProduto}/>
    </div>

  )
}