import { prisma } from "@/lib/db";

export async function GET() {
  const news = await prisma.news.findMany({ orderBy: [{ sort: "desc" }, { createdAt: "desc" }] });
  return Response.json(news);
}

export async function POST(req: Request) {
  const body = await req.json();
  const news = await prisma.news.create({
    data: { title: body.title, content: body.content, cover: body.cover, source: body.source, type: body.type || "industry", sort: body.sort || 0 },
  });
  return Response.json(news);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const news = await prisma.news.update({
    where: { id: body.id },
    data: { title: body.title, content: body.content, cover: body.cover, source: body.source, type: body.type, sort: body.sort || 0 },
  });
  return Response.json(news);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  await prisma.news.delete({ where: { id: searchParams.get("id")! } });
  return Response.json({ success: true });
}