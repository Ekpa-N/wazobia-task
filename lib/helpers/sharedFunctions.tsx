function imageToString(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
  
      reader.onloadend = () => {
        resolve(reader.result)
      }
  
      reader.onerror = () => {
        reject(new Error("Error reading file"));
      }

      reader.readAsDataURL(file);
    })
  }

  
  export {imageToString}