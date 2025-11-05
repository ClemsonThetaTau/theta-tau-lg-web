'use client'

import React, { useState, useEffect } from 'react'

interface Officer {
  id: string
  positionName: string
  type: 'ec' | 'chair'
  user: any
  isActive: boolean
}

export default function OfficersManager() {
  const [ecOfficers, setEcOfficers] = useState<Officer[]>([])
  const [chairs, setChairs] = useState<Officer[]>([])
  const [loading, setLoading] = useState(true)
  const [draggedItem, setDraggedItem] = useState<{ officer: Officer; type: 'ec' | 'chair' } | null>(null)

  useEffect(() => {
    fetchOfficers()
  }, [])

  const fetchOfficers = async () => {
    try {
      const response = await fetch('/api/officers?where[isActive][equals]=true&limit=100')
      const data = await response.json()
      
      const ec = data.docs.filter((o: Officer) => o.type === 'ec').sort((a: any, b: any) => a.displayOrder - b.displayOrder)
      const chairsList = data.docs.filter((o: Officer) => o.type === 'chair').sort((a: any, b: any) => a.displayOrder - b.displayOrder)
      
      setEcOfficers(ec)
      setChairs(chairsList)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching officers:', error)
      setLoading(false)
    }
  }

  const handleDragStart = (officer: Officer, type: 'ec' | 'chair') => {
    setDraggedItem({ officer, type })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (targetIndex: number, targetType: 'ec' | 'chair') => {
    if (!draggedItem) return

    const sourceType = draggedItem.type
    const sourceList = sourceType === 'ec' ? [...ecOfficers] : [...chairs]
    const targetList = targetType === 'ec' ? [...ecOfficers] : [...chairs]

    // Remove from source
    const sourceIndex = sourceList.findIndex(o => o.id === draggedItem.officer.id)
    if (sourceIndex > -1) {
      sourceList.splice(sourceIndex, 1)
    }

    // Add to target
    targetList.splice(targetIndex, 0, draggedItem.officer)

    // Update state
    if (sourceType === 'ec' && targetType === 'ec') {
      setEcOfficers(targetList)
    } else if (sourceType === 'chair' && targetType === 'chair') {
      setChairs(targetList)
    } else if (sourceType === 'ec' && targetType === 'chair') {
      setEcOfficers(sourceList)
      setChairs(targetList)
    } else if (sourceType === 'chair' && targetType === 'ec') {
      setChairs(sourceList)
      setEcOfficers(targetList)
    }

    // Update display order in database
    await updateDisplayOrders(targetList, targetType)
    if (sourceType !== targetType) {
      await updateDisplayOrders(sourceList, sourceType)
    }

    setDraggedItem(null)
  }

  const updateDisplayOrders = async (list: Officer[], type: 'ec' | 'chair') => {
    try {
      for (let i = 0; i < list.length; i++) {
        await fetch(`/api/officers/${list[i].id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            displayOrder: i,
            type: type,
          }),
        })
      }
    } catch (error) {
      console.error('Error updating display orders:', error)
    }
  }

  const OfficerCard = ({ officer, index, type }: { officer: Officer; index: number; type: 'ec' | 'chair' }) => {
    const userName = typeof officer.user === 'object' 
      ? `${officer.user.firstName} ${officer.user.lastName}`
      : 'Unknown User'

    return (
      <div
        draggable
        onDragStart={() => handleDragStart(officer, type)}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(index, type)}
        className="p-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{officer.positionName}</h3>
            <p className="text-sm text-gray-600">{userName}</p>
          </div>
          <div className="text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 5h6M9 12h6M9 19h6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Officer Order</h1>
        <p className="text-gray-600">Drag and drop to reorder officers. Changes save automatically.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Executive Committee</h2>
          <div
            className="min-h-[200px] p-4 bg-gray-50 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={() => draggedItem && handleDrop(ecOfficers.length, 'ec')}
          >
            {ecOfficers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No EC officers yet. Create some!</p>
            ) : (
              ecOfficers.map((officer, index) => (
                <OfficerCard key={officer.id} officer={officer} index={index} type="ec" />
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Chair Positions</h2>
          <div
            className="min-h-[200px] p-4 bg-gray-50 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={() => draggedItem && handleDrop(chairs.length, 'chair')}
          >
            {chairs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No chairs yet. Create some!</p>
            ) : (
              chairs.map((officer, index) => (
                <OfficerCard key={officer.id} officer={officer} index={index} type="chair" />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Create new officers using the Officers collection, then come back here to arrange their order.
        </p>
      </div>
    </div>
  )
}

