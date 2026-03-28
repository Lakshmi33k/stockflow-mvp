import Link from "next/link";


export default function Home() {
  return (
    <div className="p-5">
      <h1>StockFlow MVP</h1>

      <div style={{ marginTop: "20px" }}>
        <Link href="/login">Go to Login</Link>
      </div>

      <div style={{ marginTop: "10px" }}>
        <Link href="/signup">Go to Signup</Link>
      </div>
    </div>
  );
}