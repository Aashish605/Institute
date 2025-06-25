import Contact from '../Model/Contact.model.js'

export const postContact = async (req, res) => {
    let {fullName,email,phone,subject,message} = req.body;
    try {
        const data = new Contact({
            fullName,
            email,
            phone,
            subject,
            message
        })
        await data.save();
    } catch (error) {
        console.error("Error during saving the data",error)
        return res.status(500).json({msg:"Error saving data"})
    }
}