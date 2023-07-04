import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const empleados = await prisma.empleado.findMany();
            res.status(200).json(empleados);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los empleados' });
        }
    } else {
        res.status(404).json({ error: 'Método no permitido' });
    }
}
