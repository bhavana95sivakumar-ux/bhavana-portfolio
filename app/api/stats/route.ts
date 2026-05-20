import { FALLBACK_STATS, JOURNALS_REVIEWED, SCHOLAR_USER_ID } from "@/lib/stats-config";

export const revalidate = 86400;

const SCHOLAR_URL = `https://scholar.google.com/citations?user=${SCHOLAR_USER_ID}&hl=en&pagesize=100`;

export async function GET() {
  try {
    const res = await fetch(SCHOLAR_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return Response.json({ ...FALLBACK_STATS, stale: true }, { status: 200 });
    }

    const html = await res.text();
    const tdMatches = [...html.matchAll(/<td class="gsc_rsb_std">(\d+)<\/td>/g)].map((m) =>
      Number(m[1])
    );
    const citations = tdMatches[0] ?? FALLBACK_STATS.citations;
    const hIndex = tdMatches[2] ?? FALLBACK_STATS.hIndex;
    const i10Index = tdMatches[4] ?? FALLBACK_STATS.i10Index;
    const publications = (html.match(/class="gsc_a_tr"/g) || []).length || FALLBACK_STATS.publications;

    return Response.json({
      publications,
      citations,
      hIndex,
      i10Index,
      journalsReviewed: JOURNALS_REVIEWED,
    });
  } catch {
    return Response.json({ ...FALLBACK_STATS, stale: true }, { status: 200 });
  }
}
