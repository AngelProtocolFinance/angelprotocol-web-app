class Resp {
  json(x: object, status = 200) {
    return new Response(JSON.stringify(x), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
  status(status: number): Response {
    return new Response(null, { status });
  }
  txt(x: string, status = 200): Response {
    return new Response(x, {
      status,
      headers: { "Content-Type": "text/plain" },
    });
  }
  err(status: number, x: string): Response {
    return this.txt(x, status);
  }
}

export const resp = new Resp();
