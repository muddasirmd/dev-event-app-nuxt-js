import connectDB from '../../utils/mongodb'
import Event from '../../database/event.model'

export default defineEventHandler(async (event) => {
  const { slug } = getQuery(event); // get slug from query params

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Slug is required" });
  }

  try{

    await connectDB();

    const eventDetail = await Event.findOne({slug});

    return await Event.find({ _id: { $ne: eventDetail._id }, tags: {$in: eventDetail.tags} }).lean();
  
  }
  catch {
    return []
  }
  

});