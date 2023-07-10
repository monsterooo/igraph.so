import { useFetch } from '@/hooks/useFetch';

export function SignIn() {
  const { handleGoogle, loading, error } = useFetch(
    `${process.env.NEXT_PUBLIC_BACKEDN_URL}/users/login`
  );

  const handleToSignin = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_ENV_GOOGLE_CLIENT_ID as string,
        callback: handleGoogle,
      });

      window.google.accounts.id.renderButton(document.getElementById("loginDiv") as HTMLElement, {
        // type: "standard",
        theme: "filled_black",
        size: "small",
        text: "signin_with",
        shape: "pill",
      } as GsiButtonConfiguration);
    }
  }

  return (
    <div>
      {process.env.NEXT_PUBLIC_BACKEDN_URL}
      <div onClick={handleToSignin}>React Env</div>
      <div id="loginDiv">loginDiv</div>
    </div>
  )
}