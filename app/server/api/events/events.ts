import { v2 as cloudinary } from 'cloudinary';
import connectDB from "@/server/utils/mongodb";
import Event from "~/server/database/event.model";

export async function POST(req: NextRequest) {

    try{
        await connectDB();

        const formaData = await req.formData();

        let event;

        try{
            // Parse Data
            event = Object.fromEntries(formaData.entries());
        } catch(e){
            return NextResponse.json({message: 'Invalid JSON data format'}, {status: 400})
        }

        // Image Upload to Cloudinary
        const file = formaData.get('image') as File;

        if(!file){
            return NextResponse.json({message: 'Image file is required'}, {status: 400})
        }

        let tags = JSON.parse(formaData.get('tags') as string);
        let agenda = JSON.parse(formaData.get('agenda') as string)

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'dev-events'}, (error, result) => {
                if (error) return reject(error);

                resolve(result);
            }).end(buffer);
        });
        
        event.image = (uploadResult as {secure_url: string}).secure_url;
        
        const createdEvent = await Event.create({
            ...event,
            tags: tags,
            agenda: agenda
        });
        
        return { message: 'Event created successfully', event: createdEvent }
    } 
    catch(e){
        console.log(e);

        throw createError({
            statusCode: 500,
            statusMessage: 'Event Creation Failed',
            data: e instanceof Error ? e.message : 'Unknown'
        })
    }
}

export async function GET() {
    try{
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 });

        return { message: 'Events Fetched Successfully', events }
    }
    catch(e) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Event fetching failed',
            data: e
        })
    }
}