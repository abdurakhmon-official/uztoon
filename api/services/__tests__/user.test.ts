describe("user handler", () => {
  it("should do something when something happens", () => {
    expect(1).toBe(1);
  });

  it("should create a new user", async () => {
    const req = {
      body: {
        username: "hello",
        password: "hello123",
      },
    };
    const res = {
      json({ success, token }: { success: boolean; token: string }) {
        expect(success).toBe(true);
        expect(token).toBeTruthy();
      },
    };
    // await create(req, res, () => {});
  });
});
