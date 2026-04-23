import { prisma } from "@/lib/db";

export async function GET() {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json(contacts);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const contact = await prisma.contact.update({
    where: { id: body.id },
    data: { status: body.status },
  });
  return Response.json(contact);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  await prisma.contact.delete({ where: { id: searchParams.get("id")! } });
  return Response.json({ success: true });
}