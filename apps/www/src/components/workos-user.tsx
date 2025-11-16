import { useAuth } from '@workos-inc/authkit-react'

export default function SignInButton({ large }: { large?: boolean }) {
  const { user, isLoading, signIn, signOut } = useAuth()

  const buttonClasses = `${
    large ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
  } bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed`

  if (user) {
    return (
      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-2'>
          {user.profilePictureUrl && (
            <img
              alt={`Avatar of ${user.firstName} ${user.lastName}`}
              className='w-10 h-10 rounded-full'
              src={user.profilePictureUrl}
            />
          )}
          {user.firstName} {user.lastName}
        </div>
        <button
          className={buttonClasses}
          onClick={() => signOut()}
          type='button'
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <button
      className={buttonClasses}
      disabled={isLoading}
      onClick={() => {
        signIn()
      }}
      type='button'
    >
      Sign In {large && 'with AuthKit'}
    </button>
  )
}
