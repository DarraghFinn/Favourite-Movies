export const fakeFetchSuccessResponse = (response: any) => {
  jest
    .spyOn(global, "fetch")
    .mockImplementation(
      jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve({ response }) })
      ) as jest.Mock
    );
};

export const fakeFetchErrorResponse = (response: any) => {
  jest
    .spyOn(global, "fetch")
    .mockImplementation(
      jest.fn(() => Promise.reject({ response })) as jest.Mock
    );
};
