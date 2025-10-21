import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; // <-- exactly four ..

type Body = { sessionId: string; winnerId: number; opponentId?: number };

export async function POST(req: Request) {
  const { sessionId, winnerId, opponentId } = (await req.json()) as Body;

  if (!sessionId || !winnerId) {
    return NextResponse.json({ ok: false, error: "Missing sessionId or winnerId" }, { status: 400 });
  }

  const state = await prisma.rankState.findUnique({ where: { sessionId } });
  if (!state) return NextResponse.json({ ok: false, error: "No rank state" }, { status: 400 });

  if (opponentId) {
    await prisma.comparison.create({
      data: { sessionId, teamAId: winnerId, teamBId: opponentId, winnerId },
    });
  }

  const list = [...state.orderedList];
  if (!list.includes(winnerId)) {
    const idx = Math.max(0, Math.floor(list.length / 2));
    list.splice(idx, 0, winnerId);
  }

  await prisma.rankState.update({
    where: { sessionId },
    data: { orderedList: list, comparisonsCount: state.comparisonsCount + 1 },
  });

  return NextResponse.json({ ok: true });
}
