export const Loading = ({ isLoading }: { isLoading: boolean }) =>
  isLoading ? (
    <div className="flex justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-pink-500 rounded-full border-t-transparent"></div>
    </div>
  ) : null;
