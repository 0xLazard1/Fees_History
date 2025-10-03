"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ApiCall } from '@/api/api'

function Page() {
  // États pour stocker les valeurs du formulaire
  const [network, setNetwork] = useState("bsc")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Fonction appelée au clic sur Submit
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const data = await ApiCall(network, address)
      console.log("Résultat de l'API:", data)
      setResult(data)
      setDialogOpen(true) // Ouvrir le dialog avec les résultats
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen'>
      <div className='max-w-xl px-6 py-8 mx-auto'>
        <div className='bg-white rounded-lg shadow-lg p-8 border border-slate-200'>
          <div className='space-y-6'>
            <div>
              <h2 className='text-2xl font-semibold text-slate-800 mb-4'>Select Network</h2>
              <RadioGroup
                defaultValue="bsc"
                className='flex gap-4'
                onValueChange={(value) => setNetwork(value)}
              >
                <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50 transition-colors">
                  <RadioGroupItem value="bsc" id="bsc" />
                  <Label htmlFor="bsc" className='cursor-pointer font-medium text-slate-700'>BSC</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50 transition-colors">
                  <RadioGroupItem value="eth" id="eth" />
                  <Label htmlFor="eth" className='cursor-pointer font-medium text-slate-700'>Ethereum</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50 transition-colors">
                  <RadioGroupItem value="base" id="base" />
                  <Label htmlFor="base" className='cursor-pointer font-medium text-slate-700'>Base</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50 transition-colors">
                  <RadioGroupItem value="hype" id="hype" />
                  <Label htmlFor="hype" className='cursor-pointer font-medium text-slate-700'>Hype</Label>
                </div>
              </RadioGroup>
            </div>

            <div className='space-y-2'>
              <Label htmlFor="address" className='text-sm font-medium text-slate-700'>Wallet Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="0x..."
                className='font-mono'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <Button
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5'
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog pour afficher les résultats */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Wallet Statistics</DialogTitle>
            <DialogDescription>
              Résultats pour l'adresse sur {network.toUpperCase()}
            </DialogDescription>
          </DialogHeader>
          {result && (
            <div className='space-y-4 mt-4'>
              <div className='flex justify-between items-center p-3 bg-slate-50 rounded-lg'>
                <span className='text-sm font-medium text-slate-600'>Nombre de transactions</span>
                <span className='text-lg font-semibold text-slate-900'>{result.nombre_tx}</span>
              </div>
              <div className='flex justify-between items-center p-3 bg-slate-50 rounded-lg'>
                <span className='text-sm font-medium text-slate-600'>Value</span>
                <span className='text-lg font-semibold text-slate-900'>{result.value}</span>
              </div>
              <div className='flex justify-between items-center p-3 bg-slate-50 rounded-lg'>
                <span className='text-sm font-medium text-slate-600'>Temps</span>
                <span className='text-lg font-semibold text-slate-900'>{result.time}</span>
              </div>
              <div className='flex justify-between items-center p-3 bg-slate-50 rounded-lg'>
                <span className='text-sm font-medium text-slate-600'>Fees</span>
                <span className='text-lg font-semibold text-slate-900'>{result.fees}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Page
