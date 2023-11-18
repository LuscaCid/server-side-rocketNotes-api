/**
 * configuracoes importantes que serao usadas no upload
 */
const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
const TMP_FOLDER = path.resolve(__dirname , '..','..','..', 'tmp')
const UPLOADS_FOLDER= path.resolve(TMP_FOLDER, 'uploads')

const MULTER = {
  storage : multer.diskStorage({
    destination : TMP_FOLDER,
    filename(request, file, callback){
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}` 
      return callback(null, fileName)
    }
  })
}
module.exports = {
  TMP_FOLDER, 
  UPLOADS_FOLDER,
  MULTER
}
/**
 * comentando para aprender melhor sobre o upload
 * inicialmente eu instalei o multer, mais uma lib
 * para salvar arquivos dentro de um storage,
 * ou seja, dentro de uma pasta do meu projeto,
 *  que quando ele for ser hospedado, ele vai iniciar
 * esta pasta e ela vai receber de forma temporaria
 * as fotos/imagens enviadas pelo cliente para que
 * o titulo, o filname seja tratado fazendo com que
 * nenhuma imagem fique com o mesmo nome q outra para
 * nao haver sobreposicao e nenhum arquivo ser pedido
 * entao dentro do multer tem uma funcao chamada 
 * diskStorage que eu passo pra ela o destinatario
 * onde o arquivo será salvo e tambem passo o novo
 * nome deste arquivo combinando com o crypto, uma 
 * otima forma de gerar um hash code para fazer ser
 * impossivel ou praticamente impossivel ter dois 
 * arquivos com o mesmo nome dentro da pasta
 * uploads
 * 
 * e por fim da configuracao eu devo retornar uma 
 * callback q vai receber como parametros o filename,
 * 
 */