import { Contact } from '../Model/index.js'

export const postContact = async (req, res) => {
    let {fullName,email,phone,subject,message} = req.body;
    try {
        await Contact.create({ fullName, email, phone, subject, message, userId: req.user?.id || null });
    } catch (error) {
        console.error("Error during saving the data",error)
        return res.status(500).json({msg:"Error saving data"})
    }
}