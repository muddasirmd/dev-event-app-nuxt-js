import { v2 as cloudinary } from 'cloudinary'
import connectDB from '../../../utils/mongodb'
// import connectDB from '../utils/mongodb'
import Event from '../../../database/event.model'
import { readMultipartFormData } from 'h3'

export default defineEventHandler(async (event) => {


    try {
        await connectDB()

        const query = getQuery(event)

        console.log(query)

        return {message: 'Get Called '}
        // const events = await Event.find().sort({ createdAt: -1 })

        // return { message: 'Events Fetched Successfully',events}
    } catch (e) {
        throw createError({
        statusCode: 500,
        statusMessage: 'Event fetching failed',
        data: e
        })
    }
  
})
