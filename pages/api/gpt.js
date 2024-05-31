import OpenAI from 'openai';


export default async function handler(req, res) {
    // const APIKEY = "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"
    if(req.method != 'POST') return
    const APIKEY = "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"
    const openai = new OpenAI({
        apiKey: APIKEY 
    });
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": `'${req.headers.query}' From the above problem statement, return the following parameters in JSON format if found in the above string only: city, country, course, marks & fee_structure. If it is not found, set the value as null.` }],
    });
    console.log(chatCompletion.choices[0].message);
    res.status(200).json({ 'res': JSON.parse(chatCompletion.choices[0].message.content)})

}
