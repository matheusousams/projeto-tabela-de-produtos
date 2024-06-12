package br.com.api.produtos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.produtos.model.ProdutoModel;
import br.com.api.produtos.service.ProdutoService;

@RestController
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/")
    public String rota() {
        return "API de produtos funcionando!";
    }

    @GetMapping("/listarProdutos")
    public Iterable<ProdutoModel> listarProdutos() {
        return produtoService.listarProdutos();
    }

    @PostMapping("/cadastrarProdutos")
    public ResponseEntity<?> cadastrarProdutos(@RequestBody ProdutoModel produtoModel) {
        return produtoService.cadastrarAtualizarProdutos(produtoModel, "cadastrarProdutos");
    }

    @PutMapping("/atualizarProdutos")
    public ResponseEntity<?> atualizarProdutos(@RequestBody ProdutoModel produtoModel) {
        return produtoService.cadastrarAtualizarProdutos(produtoModel, "atualizarProdutos");
    }

    @DeleteMapping("/removerProdutos/{idProduto}")
    public ResponseEntity<?> removerProdutos(@PathVariable long idProduto) {
        return produtoService.removerProdutos(idProduto);
    }

}