import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const hasDbUrl = !!process.env.DATABASE_URL;
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, hasDbUrl, db: "ok" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, hasDbUrl, error: e.message }, { status: 500 });
  }
}

