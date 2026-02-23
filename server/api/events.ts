import { v2 as cloudinary } from 'cloudinary'
import connectDB from '../utils/mongodb'
import Event from '../database/event.model'
import { readMultipartFormData } from 'h3'

export default defineEventHandler(async (event) => {
  
  // =========================
  // POST → Create Event
  // =========================
  if (event.method === 'POST') {
    try {
      await connectDB()

      const formData = await readMultipartFormData(event)

      if (!formData) {
        throw createError({ statusCode: 400, statusMessage: 'Form data is required' })
      }

      // Convert fields to object
      const data: Record<string, any> = {}
      let file: any

      for (const item of formData) {
        if (item.type === 'file' && item.name === 'image') {
          file = item
        } else if (item.name && item.data) {
          data[item.name] = item.data.toString()
        }
      }

      if (!file) {
        throw createError({ statusCode: 400, statusMessage: 'Image file is required' })
      }

      // Parse JSON fields
      let tags, agenda
      try {
        tags = JSON.parse(data.tags)
        agenda = JSON.parse(data.agenda)
      } catch {
        throw createError({ statusCode: 400,statusMessage: 'Invalid JSON format for tags or agenda'})
      }

      // Upload to Cloudinary
      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: 'image', folder: 'dev-events' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(file.data)
      })

      // Save to DB
      const createdEvent = await Event.create({
        ...data,
        tags,
        agenda,
        image: uploadResult.secure_url
      })

      return { message: 'Event created successfully',event: createdEvent }
    } catch (e) {
      
      if (isError(e)) throw e

      // only wrap unknown errors:
      throw createError({
        statusCode: 500,
        statusMessage: 'Event Creation Failed',
        data: e instanceof Error ? e.message : 'Unknown error'
      })
    }
  }

  // =========================
  // GET → Fetch Events
  // =========================
  if (event.method === 'GET') {
    try {
      await connectDB()

      const events = await Event.find().sort({ createdAt: -1 })

      return { message: 'Events Fetched Successfully',events }
    } catch (e) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Event fetching failed',
        data: e
      })
    }
  }
})
