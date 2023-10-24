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
    console.log(img)
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
            Make changes to your profile Picture here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
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
          <Button type="submit" onClick={uploadProfilePicture}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ProfilePicture }
