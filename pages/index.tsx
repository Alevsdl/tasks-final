import { PrismaClient, empleado, tarea } from '@prisma/client';

const prisma = new PrismaClient();

interface HomePageProps {
  empleados: empleado[];
  tareas: tarea[];
}

export async function getServerSideProps() {
  try {
    const empleados = await prisma.empleado.findMany();
    const tareas = await prisma.tarea.findMany();

    return {
      props: {
        empleados,
        tareas,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        empleados: [],
        tareas: [],
      },
    };
  }
}

export default function HomePage({ empleados, tareas }: HomePageProps) {
  return (
    <div>
      <h1>Lista de Empleados:</h1>
      <ul>
        {empleados.map((empleado) => (
          <li key={empleado.id_empleado}>
            {empleado.nombre} - {empleado.puesto}
          </li>
        ))}
      </ul>

      <h1>Lista de Tareas:</h1>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id_tarea}>
            {tarea.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}
