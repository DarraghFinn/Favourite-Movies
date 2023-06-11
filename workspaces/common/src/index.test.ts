import { ADD_BUTTON, APP_TITLE, SEARCH_PLACEHOLDER } from ".";

describe("common test", () => {
  it("should be a match", () => {
    expect(APP_TITLE).toBe("Scribbr's favourite movies");
    expect(SEARCH_PLACEHOLDER).toBe("Add your favourite movie");
    expect(ADD_BUTTON).toBe("Add to List");
  });
});
