import { Contact } from '../Model/index.js'

export const postContact = async (req, res) => {
    let {fullName,email,phone,subject,message} = req.body;
    try {
        const contact = await Contact.create({ fullName, email, phone, subject, message, userId: req.user?.id || null });
        return res.status(201).json(contact);
    } catch (error) {
        console.error("Error during saving the data",error)
        return res.status(500).json({msg:"Error saving data"})
    }
}

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
        return res.json(contacts);
    } catch (error) {
        console.error("Error during getting contacts", error)
        return res.status(500).json({ msg: "Error getting contacts" })
    }
}