export const downloadImage = (imgSrc, imgName) => {
  const link = document.createElement("a")
  link.href = imgSrc
  link.download= imgName
  document.body.appendChild(link)
  link.click()
  console.log(link)

  document.body.removeChild(link)
  return true
}
