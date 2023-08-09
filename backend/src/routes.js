
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const login = require('../src/methods/login/index.js')

const carimboIdCarimbo = require('../src/methods/carimbo/GET/id-carimbo/index.js')
const cascata = require('../src/methods/cascata/GET/index.js')
const cascataPatch = require('../src/methods/cascata/PATCH/index.js')
const cascataPost = require('../src/methods/cascata/POST/index.js');
const cascataDelete = require('../src/methods/cascata-faixa/DELETE/index.js');
const cascataIdCascata = require('../src/methods/cascata/GET/idcascata/index.js');
const cascataDescricao = require('../src/methods/cascata/GET/descricao/index.js');
const cascataFaixaIdCascata = require('../src/methods/cascata-faixa/GET/idcascata/index.js');
const cascataFaixaPatch = require('../src/methods/cascata-faixa/PATCH/index.js');
const cascataFaixaPost = require('../src/methods/cascata-faixa/POST/index.js');
const categoria = require('../src/methods/categoria/GET/index.js');
const cidade = require('../src/methods/cidade/GET/index.js');
const clienteContatoInsert = require('../src/methods/cliente-contato/POST/index.js');
const clienteContatoIdCliente = require('../src/methods/cliente-contato/GET/id-cliente/index.js');
const clienteEnderecoIdCliente = require('../src/methods/cliente-endereco/GET/id-cliente/index.js');
const clienteEspecialIdCliente = require('../src/methods/cliente-especial/GET/id-cliente/index.js');
const clienteFiscalIdCliente = require('../src/methods/cliente-fiscal/GET/id-cliente/index.js');
const clientePerfil = require('../src/methods/cliente-perfil/index.js');
const clientePerfilPost = require('../src/methods/cliente-perfil/cliente-perfil-post/index.js');
const clienteTipo = require('./methods/cliente-tipo/GET/index.js');
const clienteVendedorIdCliente = require('../src/methods/cliente-vendedor/idcliente/index.js');
const clienteVendedorDelete = require('./methods/cliente-vendedor/DELETE/index.js');
const clientevendedorpatch = require('../src/methods/cliente-vendedor/PATCH/index.js');
const clienteVendedorPost = require('../src/methods/cliente-vendedor/cliente-vendedor-post/index.js');
const clientevisitapost = require('../src/methods/cliente-visita/cliente-visita-post/index.js');
const clientevisitadelete = require('../src/methods/cliente-visita/cliente-visita-delete/index.js');
const clientevisitaidclientevendedor = require('../src/methods/cliente-visita/idclientevendedor/index.js');
const cnpjcpf = require('../src/methods/cliente/cnpjcpf/index.js');
const coderp = require('../src/methods/cliente/coderp/index.js');
const destinacao = require('../src/methods/destinacao/GET/index.js');
const fLocalVenda = require('../src/methods/f-local-venda/GET/index.js');
const fabricante = require('../src/methods/fabricante/GET/index.js');
const familia = require('../src/methods/familia/GET/index.js');
const gOfertaEstrutura = require('../src/methods/g-oferta-estrutura/GET/index.js');
const gLocalEmail = require('../src/methods/g-local-email/GET/index.js');
const grandegrupo = require('../src/methods/grande-grupo/GET/index.js');
const grupo = require('../src/methods/grupo/GET/index.js');
const grupoEconomico = require('../src/methods/grupo-economico/index.js');
const idcliente = require('../src/methods/cliente/idcliente/index.js');
const linhaProduto = require('../src/methods/linha-produto/GET/index.js');
const localConfig = require('../src/methods/local-config/GET/index.js');
const localEmail = require('../src/methods/local-email/GET/index.js');
const localEmailPatch = require('../src/methods/local-email/PATCH/index.js');
const localEmailPost = require('../src/methods/local-email/POST/index.js'); 
const localEmailDelete = require('../src/methods/local-email/DELETE/index.js'); 
const localVenda = require('../src/methods/local-venda/GET/index.js');
const localVendaPost = require('../src/methods/local-venda/POST/index.js');
const localVendaPatch = require('../src/methods/local-venda/PATCH/index.js');
const marca = require('../src/methods/marca/GET/index.js');
const menu = require('../src/methods/menu/index.js');
const naturezaJuridica = require('../src/methods/natureza-juridica/GET/index.js');
const oferta = require('../src/methods/oferta/GET/index.js');
const ofertaEstruturaPost = require('../src/methods/oferta-estrutura/POST/index.js');
const ofertaEstruturaDelete = require('../src/methods/oferta-estrutura/DELETE/index.js');
const ofertaPatch = require('../src/methods/oferta/PATCH/index.js');
const ofertaPost = require('../src/methods/oferta/POST/index.js');
const pesquisa = require('../src/methods/cliente/pesquisa/index.js');
const produto = require('../src/methods/produto/GET/index.js');
const precoRegra = require('../src/methods/preco-regra/index.js');
const rede = require('../src/methods/rede/index.js');
const regiaoVenda = require('../src/methods/regiao-venda/index.js');
const situacaoFiscal = require('../src/methods/situacao-fiscal/GET/index.js');
const subgrupo = require('../src/methods/sub-grupo/GET/index.js');
const tipoEmail = require('../src/methods/tipo-email/GET/index.js');
const tipoFrete = require('../src/methods/tipo-frete/index.js');
const tipoPedido = require('../src/methods/tipo-pedido/index.js');
const transportador = require('../src/methods/transportador/index.js');
const volume = require('../src/methods/volume/GET/index.js');
const volumeIdVolume = require('../src/methods/volume/GET/idvolume/index.js');
const volumeFaixaIdVolume = require('../src/methods/volume-faixa/GET/idvolume/index.js');
const vclientevendedorcombo = require('../src/methods/v-cliente-vendedor-combo/index.js');
const vclientevendedorlinha = require('../src/methods/v-cliente-vendedor-linha/index.js');

//import controllers
const UserController = require('./controllers/UserController');

let keyToken = process.env.KEY_TOKEN

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, keyToken, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }

router.get('/carimbo/idcarimbo=:idcarimbo', authenticateJWT, carimboIdCarimbo);

router.get('/cascata', authenticateJWT, cascata);

router.patch('/cascata', authenticateJWT, cascataPatch);

router.post('/cascata', authenticateJWT, cascataPost);

router.get('/cascata/descricao=:descricao', authenticateJWT, cascataDescricao);

router.get('/cascata/idcascata=:idcascata', authenticateJWT, cascataIdCascata);

router.delete('/cascata-faixa', authenticateJWT, cascataDelete);

router.get('/cascata-faixa/idcascata=:idcascata', authenticateJWT, cascataFaixaIdCascata);

router.patch('/cascata-faixa', authenticateJWT, cascataFaixaPatch);

router.post('/cascata-faixa', authenticateJWT, cascataFaixaPost);

router.get('/categoria', authenticateJWT, categoria);

router.get('/cidade', authenticateJWT, cidade);

router.get('/cliente/idcliente=:id', authenticateJWT, idcliente);

router.get('/cliente/coderp=:coderp', authenticateJWT, coderp);

router.get('/cliente/cnpjcpf=:cnpjcpf', authenticateJWT, cnpjcpf);

router.get('/cliente/pesquisa=:pesquisa', authenticateJWT, pesquisa)

router.get('/cliente-contato/idcliente=:idcliente', authenticateJWT, clienteContatoIdCliente)

router.post('/cliente-contato', authenticateJWT, clienteContatoInsert)

router.get('/cliente-endereco/idcliente=:idcliente', authenticateJWT, clienteEnderecoIdCliente)

router.get('/cliente-especial/idcliente=:idcliente', authenticateJWT, clienteEspecialIdCliente)

router.get('/cliente-fiscal/idcliente=:idcliente', authenticateJWT, clienteFiscalIdCliente)

router.get('/cliente-perfil/idcliente=:idcliente', authenticateJWT, clientePerfil)

router.post('/cliente-perfil', authenticateJWT, clientePerfilPost)

router.get('/cliente-tipo', authenticateJWT, clienteTipo)

router.post('/cliente-vendedor', authenticateJWT, clienteVendedorPost)

router.delete('/cliente-vendedor', authenticateJWT, clienteVendedorDelete)

router.patch('/cliente-vendedor', authenticateJWT, clientevendedorpatch)

router.get('/cliente-vendedor/idcliente=:id', authenticateJWT, clienteVendedorIdCliente)

router.post('/cliente-visita', authenticateJWT, clientevisitapost);

router.delete('/cliente-visita', authenticateJWT, clientevisitadelete);

router.get('/cliente-visita/idclientevendedor=:idclientevendedor', authenticateJWT, clientevisitaidclientevendedor);

router.get('/destinacao', authenticateJWT, destinacao);

router.get('/fabricante', authenticateJWT, fabricante);

router.get('/f-local-venda', authenticateJWT, fLocalVenda);

router.get('/familia', authenticateJWT, familia);

router.get('/g-oferta-estrutura', authenticateJWT, gOfertaEstrutura);

router.get('/g-local-email', authenticateJWT, gLocalEmail);

router.get('/grande-grupo', authenticateJWT, grandegrupo);

router.get('/grupo', authenticateJWT, grupo);

router.get('/grupo-economico', authenticateJWT, grupoEconomico);

router.get('/linha-produto', authenticateJWT, linhaProduto);

router.get('/local-config', authenticateJWT, localConfig);

router.get('/local-email', authenticateJWT, localEmail);

router.post('/local-email', authenticateJWT, localEmailPost);

router.delete('/local-email', authenticateJWT, localEmailDelete);

router.patch('/local-email', authenticateJWT, localEmailPatch);

router.get('/local-venda', authenticateJWT, localVenda);

router.post('/local-venda', authenticateJWT, localVendaPost);

router.patch('/local-venda', authenticateJWT, localVendaPatch);

router.post('/login', login);

router.get('/marca', authenticateJWT, marca);
  
router.get('/menu/idusuario=:idusuario', authenticateJWT, menu);

router.get('/natureza-juridica', authenticateJWT, naturezaJuridica);

router.get('/oferta', authenticateJWT, oferta);

router.patch('/oferta', authenticateJWT, ofertaPatch);

router.post('/oferta', authenticateJWT, ofertaPost);

router.post('/oferta-estrutura', authenticateJWT, ofertaEstruturaPost);

router.delete('/oferta-estrutura', authenticateJWT, ofertaEstruturaDelete);

router.get('/preco-regra', authenticateJWT, precoRegra);

router.get('/produto', authenticateJWT, produto);

router.get('/rede', authenticateJWT, rede);

router.get('/regiao-venda', authenticateJWT, regiaoVenda);

router.get('/situacao-fiscal', authenticateJWT, situacaoFiscal);

router.get('/sub-grupo', authenticateJWT, subgrupo);

router.get('/tipo-email', authenticateJWT, tipoEmail);

router.get('/tipo-frete', authenticateJWT, tipoFrete);

router.get('/tipo-pedido', authenticateJWT, tipoPedido);

router.get('/transportador', authenticateJWT, transportador);

router.get('/volume', authenticateJWT, volume);

router.get('/volume/idvolume=:idvolume', authenticateJWT, volumeIdVolume);

router.get('/volume-faixa/idvolume=:idvolume', authenticateJWT, volumeFaixaIdVolume);

router.get('/v-cliente-vendedor-combo', authenticateJWT, vclientevendedorcombo);

router.get('/v-cliente-vendedor-linha/idcliente=:idcliente', authenticateJWT, vclientevendedorlinha);




module.exports = router