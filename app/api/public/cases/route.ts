import { prisma } from "@/lib/db";

export async function GET() {
  const cases = await prisma.case.findMany({ orderBy: [{ sort: "asc" }, { createdAt: "desc" }] });
  return Response.json(cases);
}