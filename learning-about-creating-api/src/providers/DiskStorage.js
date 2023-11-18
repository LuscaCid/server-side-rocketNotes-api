const fs = require('fs')
const path = require('path')
const uploadConfig = require('../configs/upload')


class DiskStorage {
  async saveFile(file){
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER , file)
    )
    return file //so para retornar as informacoes do proprio arquivo
  }
  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }
    await fs.promises.unlink(filePath)
  }
}
module.exports = DiskStorage

/**
 * fs.promises.rename (no primeiro parametro eh a pasta origem )
 * fs.promises.rename (no segundo parametro eh a pasta destino )
 * esta funcao serve para levar um arquivo de uma pasta para outra
 * 
 * 
 */