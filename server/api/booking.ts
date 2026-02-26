import connectDB from '../utils/mongodb'
import { Booking } from '../database'


export default defineEventHandler(async (booking) => {

try {

    const body = await readBody(booking)
    // { eventId, slug, email }: { eventId: string, slug: string, email: string}
    const { eventId, slug, email } = body
    
    await connectDB()

    // Save to DB
    const createdEvent = await Booking.create({ eventId, slug, email })

    return { message: 'Booking created successfully', success: true }
} catch (e) {
    
    if (isError(e)) throw e

    // only wrap unknown errors:
    throw createError({
    statusCode: 500,
    statusMessage: 'Book creation failed',
    data: e instanceof Error ? e.message : 'Unknown error'
    })
}

})
