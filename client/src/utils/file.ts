export async function readFileToBinary(file: Blob): Promise<string> {
  const reader = new FileReader()

  return new Promise(resolve => {
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        resolve('')
      }
    })
    reader.readAsDataURL(file)
  })
}
