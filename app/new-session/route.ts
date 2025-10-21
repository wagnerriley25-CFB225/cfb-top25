import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const id = randomUUID();

  await prisma.session.create({ data: { id, candidateCnt: 50 } });
  await prisma.rankState.create({ data: { sessionId: id, orderedList: [] } });

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return NextResponse.redirect(new URL(`/quiz/${id}`, base));
}
