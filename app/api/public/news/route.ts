import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    prisma.news.findMany({ orderBy: { createdAt: "desc" }, skip, take: limit }),
    prisma.news.count(),
  ]);
  return Response.json({ items, total, page, totalPages: Math.ceil(total / limit) });
}