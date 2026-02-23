import { v2 as cloudinary } from 'cloudinary'
import connectDB from '../../../utils/mongodb'
import Event from '../../../database/event.model'
import { readMultipartFormData } from 'h3'

export default defineEventHandler(async (event) => {

    try {
        await connectDB()
        
        const { slug } = event.context?.params

        if(!slug || typeof slug !== 'string' || slug.trim() == ''){
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid or missing slug parameter',
            })
        }

        // Sanitize slug (remove any potential malicious input)
        const sanitizedSlug = slug.trim().toLowerCase();

        // // Query events by slug
        const eventDetail = await Event.findOne({ slug: sanitizedSlug });

        // Handle event not found
        if(!eventDetail){
            throw createError({
                statusCode: 404,
                statusMessage: `Event with slug '${slug}' not found`
            })
        }

        // Return successful response with events data
        return { message: 'Event fetched successfully', eventDetail}

    } catch (e) {

        throw e
    }
  
})
