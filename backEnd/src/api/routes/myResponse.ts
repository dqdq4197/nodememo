export default (success: boolean, message: string, data?: any) => {
  return { success, message, data: data ? null : data };
};
