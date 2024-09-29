import React, { useCallback, useState } from 'react'

import { useDropzone } from 'react-dropzone'
import Cropper from 'react-easy-crop'
import { ImSpinner3 } from 'react-icons/im'

import heic2any from 'heic2any'

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
import { toast } from '@/components/ui/use-toast'
import { getCroppedImg } from '@/lib/crop-image'

import { storage, db, auth } from '@/firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

type ProfilePictureProps = {
  url: string
}

const ProfilePicture = ({ url }: ProfilePictureProps) => {
  const [img, setImg] = useState<File | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number, y: number, width: number, height: number } | null>(null)

  const [isLoading,  setIsLoading] = useState(false)

  const [open, setOpen] = useState(false)

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const supportedFileTypes = ['heic', 'png', 'jpg', 'jpeg']

    let img = acceptedFiles[0]
    const fileExtension = img.name.split('.').pop()?.toLowerCase()

    console.log("FILE EXTENSION", fileExtension)

    if (!fileExtension || !supportedFileTypes.includes(fileExtension)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a HEIC, PNG, JPG, or JPEG file',
      })
      return
    }

    const isHeic = img.name.split('.').pop()?.toLowerCase() === 'heic'

    if (isHeic) {
      try {
        const arrayBuffer = await img.arrayBuffer()
        const blob = new Blob([arrayBuffer], { type: img.type })
        // Convert HEIC to JPEG
        const convertedBlob = await heic2any({
          blob: blob,
          toType: 'image/jpeg',
        })

        if (Array.isArray(convertedBlob)) {
          // Handle case where convertedBlob is an array
          img = new File(
            [convertedBlob[0]],
            img.name.replace('.heic', '.jpg'),
            { type: 'image/jpeg' }
          )
        } else {
          // Handle case where convertedBlob is a single Blob
          img = new File([convertedBlob], img.name.replace('.heic', '.jpg'), {
            type: 'image/jpeg',
          })
        }
        
        setImg(img)
      } catch (error) {
        console.error('Error getting the blob from file: ', error)
      }
    } else {
      setImg(img)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const uploadProfilePicture = async () => {
    if (!img || !croppedAreaPixels) return

    setIsLoading(true)

    try {
      const croppedImage = await getCroppedImg(URL.createObjectURL(img), croppedAreaPixels)

      const user = auth.currentUser

      if (!user) {
        throw new Error('User is not authenticated')
      }

      const storageRef = ref(storage, `profile-pictures/${user.uid}.jpg`)
      const uploadTask = uploadBytesResumable(storageRef, croppedImage)

      uploadTask.on('state_changed', () => { }, (error) => {
        console.error(error)
        toast({ title: 'Error', description: 'Unable to upload profile picture' })
        setIsLoading(false)
      }, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        const userDoc = doc(db, 'users', user.uid)
        await setDoc(userDoc, { profilePicture: downloadURL }, { merge: true })
        toast({ title: 'Success', description: 'Profile picture updated' })
        
        setOpen(false)
        setIsLoading(false)
      })
    } catch (error) {
      console.error(error)
      toast({ title: 'Error', description: 'Something went wrong' })
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Change Profile Picture</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Profile Picture</DialogTitle>
          <DialogDescription>Select and crop your new profile picture.</DialogDescription>
        </DialogHeader>

        <div className="relative w-full h-48 bg-gray-200">
          {img && (
            <Cropper
              image={URL.createObjectURL(img)}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
        </div>

        <div {...getRootProps()} className="mt-4 border-dotted border-2 border-gray-400 p-4 text-center">
          <input {...getInputProps()} />
          {!isDragActive && <p>Drag & drop an image file here, or click to select a file.</p>}
        </div>

        <DialogFooter>
          <Button disabled={isLoading} type="submit" onClick={uploadProfilePicture}>
            {isLoading && <ImSpinner3 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ProfilePicture }
