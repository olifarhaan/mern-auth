import uploadImageToDatabase from "./uploadImageToFirebase.js"

export async function generateQR(url) {
  const { toBuffer: QRCodeToBuffer } = await import("qrcode")

  const qrCodeBuffer = await QRCodeToBuffer(url, {
    width: 500,
    height: 500,
    color: {
      dark: "#000000", // Set the color for dark modules (foreground)
      light: "#ffffff", // Set the color for light modules (background)
    },
  })

  try {
    const fileUrl = await uploadImageToDatabase(qrCodeBuffer)
    return fileUrl
  } catch (error) {
    console.error(error.message)
  }
}
