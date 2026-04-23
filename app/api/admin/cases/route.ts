import { prisma } from "@/lib/db";

export async function GET() {
  const cases = await prisma.case.findMany({ orderBy: [{ sort: "asc" }, { createdAt: "desc" }] });
  return Response.json(cases);
}

export async function POST(req: Request) {
  const body = await req.json();
  // tags: if string that looks like JSON array, store as-is; if array, stringify it
  let tagsValue: string | null = null;
  if (body.tags) {
    if (typeof body.tags === "string") {
      // Already a string - could be '["a","b"]' or 'a, b'
      const trimmed = body.tags.trim();
      if (trimmed.startsWith("[")) {
        tagsValue = trimmed; // already JSON array string
      } else {
        tagsValue = JSON.stringify(trimmed.split(",").map((s: string) => s.trim()).filter(Boolean));
      }
    } else if (Array.isArray(body.tags)) {
      tagsValue = JSON.stringify(body.tags);
    }
  }
  const c = await prisma.case.create({
    data: {
      title: body.title,
      category: body.category || "其他",
      tags: tagsValue,
      channel: body.channel || null,
      year: body.year || null,
      description: body.description,
      cover: body.cover,
      videoUrl: body.videoUrl,
      content: body.content,
      color: body.color || "#1B5FBE",
      sort: body.sort || 0,
    },
  });
  return Response.json(c);
}

export async function PUT(req: Request) {
  const body = await req.json();
  let tagsValue: string | null = null;
  if (body.tags) {
    if (typeof body.tags === "string") {
      const trimmed = body.tags.trim();
      if (trimmed.startsWith("[")) {
        tagsValue = trimmed;
      } else {
        tagsValue = JSON.stringify(trimmed.split(",").map((s: string) => s.trim()).filter(Boolean));
      }
    } else if (Array.isArray(body.tags)) {
      tagsValue = JSON.stringify(body.tags);
    }
  }
  const c = await prisma.case.update({
    where: { id: body.id },
    data: {
      title: body.title,
      category: body.category,
      tags: tagsValue,
      channel: body.channel,
      year: body.year,
      description: body.description,
      cover: body.cover,
      videoUrl: body.videoUrl,
      content: body.content,
      color: body.color,
      sort: body.sort,
    },
  });
  return Response.json(c);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  await prisma.case.delete({ where: { id: searchParams.get("id")! } });
  return Response.json({ success: true });
}
