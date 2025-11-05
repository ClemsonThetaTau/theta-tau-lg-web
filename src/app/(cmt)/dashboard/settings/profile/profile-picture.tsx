import React, { useCallback, useState } from 'react'

import { useDropzone } from 'react-dropzone'
import Cropper from 'react-easy-crop'
import { ImSpinner3 } from 'react-icons/im'

import heic2any from 'heic2any'

import { Button } from '@/components/ui/data-entry/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/overlay/dialog'
import { toast } from '@/components/ui/feedback/use-toast'
import { getCroppedImg } from '@/lib/crop-image'

import { useAuth } from '@/lib/auth-context'

type ProfilePictureProps = {
  url: string
}

const ProfilePicture = ({ url }: ProfilePictureProps) => {
  const { user } = useAuth()
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
    if (!img || !croppedAreaPixels || !user) return

    setIsLoading(true)

    try {
      const croppedImage = await getCroppedImg(URL.createObjectURL(img), croppedAreaPixels)

      // Upload to Payload media collection
      const formData = new FormData()
      formData.append('file', croppedImage, `profile-${user.id}.jpg`)
      formData.append('alt', `${user.firstName} ${user.lastName} profile picture`)

      const uploadResponse = await fetch('/api/media', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image')
      }

      const uploadResult = await uploadResponse.json()
      const mediaId = uploadResult.doc.id

      // Update user with new profile picture
      await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ profilePicture: mediaId }),
      })

      toast({ title: 'Success', description: 'Profile picture updated' })
      setOpen(false)
      setIsLoading(false)
      
      // Reload page to show new image
      window.location.reload()
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
