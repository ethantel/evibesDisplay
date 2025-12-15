'use client'

import { useEffect, useState } from 'react'
import { getUrl } from 'aws-amplify/storage'

export function BrandChart() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch the signed URL for the image in S3
        const url = await getUrl({
          path: 'public/chart.png',
        })

        // The getUrl function returns an object with a url property
        if (typeof url === 'string') {
          setImageUrl(url)
        } else {
          setImageUrl(url.url.toString())
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load image'
        setError(errorMessage)
        console.error('Error fetching S3 image:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImage()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center bg-slate-100 py-12 dark:bg-slate-800">
        <div className="text-center">
          <div className="mb-2 inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Loading chart...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
        <p className="text-sm text-red-800 dark:text-red-300">
          <strong>Error loading image:</strong> {error}
        </p>
      </div>
    )
  }

  if (!imageUrl) {
    return (
      <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
        <p className="text-sm text-yellow-800 dark:text-yellow-300">
          No image URL could be generated.
        </p>
      </div>
    )
  }

  return (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt="Brand Chart"
        className="w-full rounded-lg shadow-md"
      />
      <figcaption className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
        Brand Chart from AWS S3
      </figcaption>
    </figure>
  )
}
