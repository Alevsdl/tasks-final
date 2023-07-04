import { PrismaClient, empleados, tareas } from '@prisma/client';

const prisma = new PrismaClient();

interface HomePageProps {
  empleados: empleados[];
  tareas: tareas[];
}

export async function getServerSideProps() {
  try {
    const empleados = await prisma.empleados.findMany();
    const tareas = await prisma.tareas.findMany();

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
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-pink-600">Lista de Empleados:</h1>
      <table className="w-full bg-white border border-pink-200">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-pink-100 text-left text-xs font-semibold text-pink-600 uppercase">Nombre</th>
            <th className="py-2 px-4 bg-pink-100 text-left text-xs font-semibold text-pink-600 uppercase">Puesto</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id_empleado}>
              <td className="py-2 px-4 whitespace-nowrap">{empleado.nombre}</td>
              <td className="py-2 px-4 whitespace-nowrap">{empleado.puesto}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-3xl font-bold mt-8 mb-4 text-pink-600">Lista de Tareas:</h1>
      <table className="w-full bg-white border border-pink-200">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-pink-100 text-left text-xs font-semibold text-pink-600 uppercase">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea) => (
            <tr key={tarea.id_tarea}>
              <td className="py-2 px-4 whitespace-nowrap">{tarea.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-center text-pink-300">Verónica Santos 1537419</p>
    </div>


  );
}
