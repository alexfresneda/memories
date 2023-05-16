import { getProviders, signIn } from "next-auth/react";

export default function signin({ providers }) {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <img className="mb-8 w-24" src="/logo.png" alt="memories logo" />
      <div className="">
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="flex flex-col items-center">
            <h1 className="mb-8 text-2xl font-bold">Welcome to lifebits</h1>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="rounded-full bg-black px-5 py-2 text-white hover:bg-opacity-90 dark:bg-white dark:text-black
            "
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
