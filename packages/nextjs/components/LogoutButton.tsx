import Link from 'next/link'

export function LogoutButton({ user }: { user: string }) {
  return (
    <div className="bg-pink-100 rounded-full font-semibold text-sm text-pink-400 pl-5">
      {user}
      <Link href="/home">
        <button className="btn btn-outline rounded-full bg-white ml-3">Logout</button>
      </Link>
    </div>
  )
}
