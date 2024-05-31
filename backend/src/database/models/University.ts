import { Schema, model } from "mongoose";

export interface UniversityInterface {
    name?: string
    url?: string
    country?: string
    location?: string
    acaReq?: string
    ietls?: string
    acaTestReq?: string
    worldRank?: string
    stayBack?: string
    category?: string
    courses?: Array<CourseInterface>
}

export interface CourseInterface {
    name?: string
    url?: string
    subject?: string
    studyLevel?: string
    duration?: string
    intake?: string
    fees?: string
}

const courseSchema = new Schema<CourseInterface>({
    name: { type: String, required: false },
    url: { type: String, required: false },
    subject: { type: String, required: false },
    studyLevel: { type: String, required: false },
    duration: { type: String, required: false },
    intake: { type: String, required: false },
    fees: { type: String, required: false },
})

const universitySchema = new Schema<UniversityInterface>({
    name: { type: String, required: false, unique: true, index: true },
    url: { type: String, required: false },
    country: { type: String, required: false },
    location: { type: String, required: false },
    acaReq: { type: String, required: false },
    ietls: { type: String, required: false },
    acaTestReq: { type: String, required: false },
    worldRank: { type: String, required: false },
    stayBack: { type: String, required: false },
    category: { type: String, required: false },
    courses: [courseSchema]
    // courses: [{
    //     name: String,
    //     url: String,
    //     subject: String,
    //     studyLevel: String,
    //     duration: String,
    //     intake: String,
    //     fees: Number
    // }]
})

const Universities = model<UniversityInterface>('universities', universitySchema)
export default Universities