export const devComment = (message: string) => {
  if (process.env.NODE_ENV === "development") {
    console.log("DEV😊 " + message);
  }
};
