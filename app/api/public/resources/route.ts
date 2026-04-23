import { prisma } from "@/lib/db";

export async function GET() {
  const resources = await prisma.resource.findMany({ orderBy: [{ sort: "asc" }, { createdAt: "desc" }] });
  return Response.json(resources);
}