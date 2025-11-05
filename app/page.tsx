import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
        <h2>hello</h2>
      </div>
    </ProtectedRoute>
  );
}
