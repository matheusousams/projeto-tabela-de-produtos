package br.com.api.produtos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.model.ProdutoModel;
import br.com.api.produtos.model.RespostaModel;
import br.com.api.produtos.repository.ProdutoRespository;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRespository produtoRespository;

    @Autowired
    private RespostaModel respostaModel;

    public Iterable<ProdutoModel> listarProdutos() {
        return produtoRespository.findAll();
    }

    public ResponseEntity<?> cadastrarAtualizarProdutos(ProdutoModel produtoModel, String action) {

        if (produtoModel.getNomeProduto().equals("")) {
            respostaModel.setMensagem("Nome do produto é obrigatório!");
            return new ResponseEntity<RespostaModel>(respostaModel, HttpStatus.BAD_REQUEST);
        } else if (produtoModel.getMarcaProduto().equals("")) {
            respostaModel.setMensagem("Nome da marca é obrigatório!");
            return new ResponseEntity<RespostaModel>(respostaModel, HttpStatus.BAD_REQUEST);
        } else if (produtoModel.getQtdProduto().equals("")) {
            respostaModel.setMensagem("Quantidade de Produtos é obrigatória!");
            return new ResponseEntity<RespostaModel>(respostaModel, HttpStatus.BAD_REQUEST);
        } else {
            if (action.equals("cadastrarProdutos")) {
                return new ResponseEntity<ProdutoModel>(produtoRespository.save(produtoModel), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<ProdutoModel>(produtoRespository.save(produtoModel), HttpStatus.OK);
            }
        }

    }

    public ResponseEntity<RespostaModel> removerProdutos(long id) {
        produtoRespository.deleteById(id);

        respostaModel.setMensagem("Produto removido com sucesso");

        return new ResponseEntity<RespostaModel>(respostaModel, HttpStatus.OK);
    }

}
