export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  const apiURL = new URL(`${process.env.NEXT_PUBLIC_API_URL}/data-elements`);
  if (limit) {
    apiURL.searchParams.append("limit", limit);
  }
  if (offset) {
    apiURL.searchParams.append("offset", offset);
  }
  const res = await fetch(apiURL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    },
  });
  const data = await res.json();

  return Response.json({ ...data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data-elements/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json({ ...data });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/data-elements/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
      },
    }
  );
  const data = await res.json();
  return Response.json(data);
}
