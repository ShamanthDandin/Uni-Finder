import { config } from 'dotenv'
config()
import express, { Request, Response } from 'express'
import dbinit from './database'
import Universities from './database/models/University'
import cors from 'cors'
import OpenAI from 'openai'

const app = express()
const openai = new OpenAI({ apiKey: process.env.GPT_KEY })

app.use(express.json())
app.use(cors())

app.post('/api/universities', async (req: Request, res: Response) => {
    const country = req.headers.country
    const course = req.headers.course
    const price = req.headers.fees != 'null' ? Number(req.headers.fees) : 'null';
    let status = Number(req.headers.status)

    if (status === 0) {
        let responsePayload: any[] = []
        const ids: any[] = []
        try {
            if (country) {
                const unis = await Universities.find({ country }).lean().exec()
                for (const uni of unis) {
                    if (!ids.includes(uni._id)) {
                        ids.push(uni._id)
                        responsePayload.push(uni)
                    }
                }
            }

            if (course) {
                const unisWithCourse = await Universities.find({ "courses.name": { $eq: course } }).lean().exec()
                for (const uni of unisWithCourse) {
                    if (!ids.includes(uni._id)) {
                        responsePayload.push(uni)
                        ids.push(uni._id)
                    }
                }
            }

            if (price) {
                const unisWithPrice = await Universities.find({ "courses.fees": { $eq: price } }).lean().exec()
                for (const uni of unisWithPrice) {
                    if (!ids.includes(uni._id)) {
                        responsePayload.push(uni)
                        ids.push(uni._id)
                    }
                }
            }

            for (const uni of responsePayload) {
                let percent = 0
                if (country === uni.country) percent += 1
                if (course && uni.courses.some((c: any) => c.name === course)) percent += 1
                if (course && price && uni.courses.some((c: any) => c.price === price)) percent += 1

                uni.percent = percent
            }

            responsePayload.sort((a, b) => b.percent - a.percent)
            res.status(200).send(responsePayload)
        } catch (err) {
            console.log(err)
        }
    }

    else {
        const unis = await Universities.find({ country }).lean().exec()
        return res.status(200).send(unis)
    }
})

app.post('/api/completion', async (req: Request, res: Response) => {
    const payload = req.headers.data as string
    if (!payload) return res.sendStatus(400)

    const completion = await openai.chat.completions.create({
        messages: [
            { role: 'user', content: "hi" },
            // { role: 'user', content: "In the above statement, find what is the name of the country" },
            // { role: 'user', content: "In the above statement, find what is the name of the course" }
        ],
        model: 'gpt-3.5-turbo',
    });
    console.log(completion)

    return res.status(200).send(completion)
})

// app.get('/test', async (req: Request, res: Response) => {
//     const reader = xlsx.readFile(`${__dirname}/ireland.xlsx`)
//     const data: any = xlsx.utils.sheet_to_json(reader.Sheets[reader.SheetNames[0]])

//     for (const uni of data) {
//         const existing = await Universities.findOne({ name: uni.name }).lean().exec()
//         if (existing) {
//             const payload: CourseInterface = {
//                 name: uni.course_name,
//                 url: uni.course_url,
//                 subject: uni.subject,
//                 duration: uni.duration,
//                 intake: uni.intake,
//             }

//             await Universities.findOneAndUpdate({ name: uni.name }, { courses: { $push: payload } }, { upsert: true })
//         }
//         else {
//             await Universities.create({
//                 name: uni.name,
//                 url: uni.university_url,
//                 country: uni.country,
//                 location: uni.location,
//                 acaReq: uni.aca_req,
//                 ietls: uni.ietls,
//                 stayBack: uni.stay_back,
//                 category: uni.Category,
//                 courses: [{
//                     name: uni.course_name,
//                     url: uni.course_url,
//                     subject: uni.subject,
//                     duration: uni.duration,
//                     intake: uni.intake,
//                 }]
//             })
//         }
//     }

//     console.log('done')
//     res.sendStatus(200)
// })

app.get('/api/unilist', async (req: Request, res: Response) => {
    const unis = await Universities.find({ country: "United Kingdom" }).lean().exec()
    // @ts-ignore
    const data = unis.map(uni => ({ university: uni.name, courseName: uni.courses[0].name, fees: Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000, score: Math.floor(Math.random() * (10 - 5 + 1) + 5) }))
    res.status(200).send(data)
})

app.get('/api/compare', async (req: Request, res: Response) => {
    // @ts-ignore
    const ids = req.headers.ids!.split(',')
    const responsePayload: any = {}
    for (let i = 0; i < ids.length; i++) {
        let uni
        try {
            uni = await Universities.findById(ids[i]).lean().exec()
        } catch (err) {
            console.log(err)
        }
        responsePayload[`u${i}`] = uni
    }

    res.status(200).send(responsePayload)
})


const init = async () => {
    await dbinit()
    app.listen(process.env.SERVER_PORT, () => console.log(`Express app listening on port ${process.env.SERVER_PORT}`))
}

init().catch(err => console.log(err))