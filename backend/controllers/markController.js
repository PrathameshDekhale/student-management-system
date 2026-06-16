const prisma = require("../prismaClient");

exports.createMark = async(req, res) => {
    try {
        const { subject, score, studentId } = req.body;

        const mark = await prisma.mark.create({
            data: {
                subject,
                score: Number(score),
                studentId: Number(studentId),
            },
        });

        res.status(201).json(mark);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMarks = async(req, res) => {
    try {
        const marks = await prisma.mark.findMany({
            include: {
                student: true,
            },
        });

        res.json(marks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMark = async(req, res) => {
    try {
        await prisma.mark.delete({
            where: {
                id: Number(req.params.id),
            },
        });

        res.json({ message: "Mark deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};