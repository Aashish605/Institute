import { Testimonial } from '../Model/index.js'

export const postTestimonial = async (req, res) => {
    let { name, role, company, avatar, content, rating } = req.body;
    try {
        const testimonial = await Testimonial.create({ name, role, company, avatar, content, rating });
        return res.status(201).json(testimonial);
    } catch (error) {
        console.error("Error saving testimonial", error)
        return res.status(500).json({ msg: "Error saving testimonial" })
    }
}

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll({ order: [['createdAt', 'DESC']] });
        return res.json(testimonials);
    } catch (error) {
        console.error("Error getting testimonials", error)
        return res.status(500).json({ msg: "Error getting testimonials" })
    }
}

export const getTestimonialById = async (req, res) => {
    try {
        const data = await Testimonial.findByPk(req.params.id);
        if (!data) return res.status(404).json({ msg: "Not found" });
        return res.json(data);
    } catch (error) {
        console.error("Error getting testimonial", error)
        return res.status(500).json({ msg: "Error getting testimonial" })
    }
}

export const updateTestimonial = async (req, res) => {
    let { Id, name, role, company, avatar, content, rating } = req.body;
    try {
        const existing = await Testimonial.findByPk(Id);
        if (!existing) return res.status(404).json({ msg: "Testimonial not found" });
        existing.name = name;
        existing.role = role || null;
        existing.company = company || null;
        existing.avatar = avatar || null;
        existing.content = content;
        existing.rating = rating || 5;
        await existing.save();
        return res.json(existing);
    } catch (error) {
        console.error("Error updating testimonial", error)
        return res.status(500).json({ msg: "Error updating testimonial" })
    }
}

export const deleteTestimonial = async (req, res) => {
    try {
        const removed = await Testimonial.destroy({ where: { id: req.body.id } });
        if (!removed) return res.status(404).json({ msg: "Testimonial not found" });
        return res.json({ msg: "Testimonial deleted" })
    } catch (error) {
        console.error("Error deleting testimonial", error)
        return res.status(500).json({ msg: "Error deleting testimonial" })
    }
}
