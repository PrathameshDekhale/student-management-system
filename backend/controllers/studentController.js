const prisma = require("../prismaClient");

exports.createStudent = async(req, res) => {
    try {
        const { name, email, age } = req.body;

        const student = await prisma.student.create({
            data: {
                name,
                email,
                age: Number(age)
            }
        });

        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudents = async(req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const totalRecords = await prisma.student.count();

        const students = await prisma.student.findMany({
            skip,
            take: limit,
            include: {
                marks: true
            }
        });

        res.json({
            students,
            totalRecords,
            currentPage: page,
            totalPages: Math.ceil(totalRecords / limit)
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getStudentById = async(req, res) => {
    try {
        const student = await prisma.student.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
                marks: true
            }
        });

        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStudent = async(req, res) => {
    try {
        const { name, email, age } = req.body;

        const student = await prisma.student.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name,
                email,
                age: Number(age)
            }
        });

        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteStudent = async(req, res) => {
    try {
        await prisma.student.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};