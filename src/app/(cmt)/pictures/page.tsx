"use client"

import React, { useCallback, useState, useEffect } from 'react'

import { useDropzone } from 'react-dropzone'
import Cropper from 'react-easy-crop'
import { ImSpinner3 } from 'react-icons/im'

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
import { BrothersCombobox, ComboboxItem } from './brother-combobox'

import { PublicBrotherData } from '@/components/types/brother'

import { getDoc } from 'firebase/firestore'

type ProfilePictureProps = {
  url: string
}

export default function ProfilePicture({ url }: ProfilePictureProps) {
  const [img, setImg] = useState<File | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number, y: number, width: number, height: number } | null>(null)

  const [isLoading,  setIsLoading] = useState(false)

  const [brothers, setBrothers] = useState<ComboboxItem[]>([])
  const [selectedBrother, setSelectedBrother] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const brothersDoc = doc(db, 'public', 'brothers')
      const brothersSnapshot = await getDoc(brothersDoc)
      const brothersData: PublicBrotherData = brothersSnapshot.data() as PublicBrotherData
      const brothersList = brothersData.displayOrder.map((userId: any) => {
        const data = brothersData.brotherList[userId]
        const brother: ComboboxItem = {
          value: userId,
          label: `${data.firstName} ${data.lastName}`,
        }

        return brother
      })

      const sortedBrothers = brothersList.slice().sort((a, b) => a.label.localeCompare(b.label));
      setBrothers(sortedBrothers);
    }

    fetchData()
  }, [])

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    let img = acceptedFiles[0]
    setImg(img)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const uploadProfilePicture = async () => {
    if (!img || !croppedAreaPixels) return

    setIsLoading(true)

    try {
      const croppedImage = await getCroppedImg(URL.createObjectURL(img), croppedAreaPixels)

      const storageRef = ref(storage, `profile-pictures/${selectedBrother}.jpg`)
      const uploadTask = uploadBytesResumable(storageRef, croppedImage)

      uploadTask.on('state_changed', () => { }, (error) => {
        console.error(error)
        toast({ title: 'Error', description: 'Unable to upload profile picture' })
        setIsLoading(false)
      }, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        const userDoc = doc(db, 'users', selectedBrother)
        await setDoc(userDoc, { profilePicture: downloadURL }, { merge: true })
        toast({ title: 'Success', description: 'Profile picture updated' })
        
        setIsLoading(false)
      })
    } catch (error) {
      console.error(error)
      toast({ title: 'Error', description: 'Something went wrong' })
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-6/12'>
        <BrothersCombobox brothers={brothers} selectedBrother={setSelectedBrother} />

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

        <Button disabled={isLoading} type="submit" onClick={uploadProfilePicture}>
          {isLoading && <ImSpinner3 className="mr-2 h-4 w-4 animate-spin" />}
          Save changes
        </Button>
        </div>
    </div>
  )
}
