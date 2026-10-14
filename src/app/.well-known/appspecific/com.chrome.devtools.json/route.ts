export const dynamic = "force-dynamic";

/** Optional Chrome DevTools workspace discovery, available only locally. */
export function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  return Response.json({
    workspace: {
      root: process.cwd(),
      uuid: "a152cda0-0fe4-48e1-95b3-290bef732489",
    },
  }, { headers: { "Cache-Control": "no-store" } });
}
