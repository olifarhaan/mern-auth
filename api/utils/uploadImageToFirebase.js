import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { app } from "./firebase.js"

const uploadImageToDatabase = (uploadImage) => {
  return new Promise(async (resolve, reject) => {
    const storage = getStorage(app)
    try {
      const fileName =
        new Date().getTime() + Math.random().toString(36).slice(-8) + ".png"
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, uploadImage)

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error)
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(downloadURL)
          } catch (error) {
            reject(error)
          }
        }
      )
    } catch (error) {
      reject(error)
    }
  })
}

export default uploadImageToDatabase
