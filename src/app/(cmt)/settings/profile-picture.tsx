import React, { useCallback, useState } from 'react'
import Image from 'next/image'

import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { toast } from '@/components/ui/use-toast'

import { storage, db, auth } from '@/firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

type ProfilePictureProps = {
  url: string
}

const ProfilePicture = ({ url }: ProfilePictureProps) => {
  const [img, setImg] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    let img = acceptedFiles[0]
    setImg(img)
  }, [])
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg'],
    },
  })

  const uploadProfilePicture = () => {
    const uid = auth.currentUser?.uid

    if (!uid) {
      return
    }

    const fileType = img?.type.split('/')[1] // Get the file type
    const storageRef = ref(storage, `profile-pictures/${uid}.${fileType}`)

    if (!img) return

    // 'profilePicture' is a Blob or File object representing the file you want to upload.
    const uploadTask = uploadBytesResumable(storageRef, img)

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error)
      },
      () => {
        // Handle successful uploads on complete
        const downloadURL = getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            const userData = { profilePicture: downloadURL }

            const userRef = doc(db, 'users', uid)

            setDoc(userRef, userData, { merge: true })
              .then(() => {
                toast({
                  title: 'Updating Profile Picture:',
                  description: 'Profile updated successfully',
                })
              })
              .catch((error) => {
                console.error('Error updating profile', error)
                toast({
                  title: 'Updating Profile Picture:',
                  description: 'Error updating profile',
                })
              })
          }
        )
      }
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile Picture</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile Picture</DialogTitle>
          <DialogDescription>
            Make changes to your profile Picture here. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {img && <img src={URL.createObjectURL(img)} />}
        <div className="h-16 grid gap-4 bg-gray-200 border-dotted border-2 border-gray-40">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="h-full">
              {isDragAccept && <p>Drop</p>}
              {isDragReject && <p>Please Choose an Image File</p>}
              {!isDragActive && <p>Drop an image file here</p>}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={uploadProfilePicture}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ProfilePicture }
