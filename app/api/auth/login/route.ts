import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      return NextResponse.json({ error: "用户名或密码错误" }, { status: 401 });
    }
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: "用户名或密码错误" }, { status: 401 });
    }
    return NextResponse.json({ id: admin.id, username: admin.username, name: admin.name });
  } catch {
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}