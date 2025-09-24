function rand(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function installMockApi() {
  const originalFetch = window.fetch;

  // input may be string | Request | URL
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    let url: string;
    if (typeof input === 'string') url = input;
    else if (input instanceof Request) url = input.url;
    else if (input instanceof URL) url = input.href;
    else url = String(input);

    await new Promise(r => setTimeout(r, 400 + Math.random() * 600));

    if (url.endsWith('/api/line')) {
      const points = Array.from({ length: 20 }).map((_, i) => ({ x: i, y: Math.floor(Math.random() * 80) + 10 }));
      return new Response(JSON.stringify(points), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if (url.endsWith('/api/table')) {
      const rows = Array.from({ length: 12 }).map((_, i) => ({ id: i + 1, name: `User ${i + 1}`, score: Math.floor(Math.random() * 90) + 10 }));
      return new Response(JSON.stringify(rows), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if (url.endsWith('/api/list')) {
      const items = Array.from({ length: 8 }).map((_, i) => ({ id: i + 1, text: `Item ${i + 1}` }));
      return new Response(JSON.stringify(items), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return originalFetch(input as RequestInfo, init);
  };
}
