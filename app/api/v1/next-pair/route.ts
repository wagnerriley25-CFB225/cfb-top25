// app/api/v1/next-pair/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let sessionId = searchParams.get("sessionId");

  // Create a session + rank state if none provided
  if (!sessionId || sessionId === "undefined") {
    const id = randomUUID();
    await prisma.session.create({ data: { id, candidateCnt: 50 } });
    await prisma.rankState.create({ data: { sessionId: id, orderedList: [] } });
    sessionId = id;
  }

  // Get teams and return two random ones
  const teams = await prisma.team.findMany({ where: { active: true } });
  if (teams.length < 2) {
    return NextResponse.json({ error: "Not enough teams" }, { status: 400 });
  }

  const shuffled = teams.sort(() => 0.5 - Math.random());
  const a = shuffled[0];
  const b = shuffled[1];

  return NextResponse.json({
    sessionId,
    pair: { a, b },        // <-- object with a & b (what your quiz expects)
    progress: "ongoing",
  });
}
