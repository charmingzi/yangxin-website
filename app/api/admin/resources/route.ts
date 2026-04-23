import { prisma } from "@/lib/db";

export async function GET() {
  const resources = await prisma.resource.findMany({ orderBy: [{ sort: "asc" }, { createdAt: "desc" }] });
  return Response.json(resources);
}

export async function POST(req: Request) {
  const body = await req.json();
  const r = await prisma.resource.create({
    data: {
      name: body.name,
      category: body.category || "节目时段广告",
      channel: body.channel,
      program: body.program,
      timeSlot: body.timeSlot,
      description: body.description,
      price: body.price,
      note: body.note,
      isHot: body.isHot || false,
      sort: body.sort || 0,
    },
  });
  return Response.json(r);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const r = await prisma.resource.update({
    where: { id: body.id },
    data: {
      name: body.name,
      category: body.category,
      channel: body.channel,
      program: body.program,
      timeSlot: body.timeSlot,
      description: body.description,
      price: body.price,
      note: body.note,
      isHot: body.isHot,
      sort: body.sort,
    },
  });
  return Response.json(r);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  await prisma.resource.delete({ where: { id: searchParams.get("id")! } });
  return Response.json({ success: true });
}
