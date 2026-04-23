import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const contact = await prisma.contact.create({
    data: {
      name: body.name,
      company: body.company,
      phone: body.phone,
      email: body.email,
      message: body.message,
    },
  });
  return Response.json(contact);
}